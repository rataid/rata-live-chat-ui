const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')

function load(relative, mocks) {
  const file = path.join(__dirname, '..', relative)
  const code = ts.transpileModule(
    fs
      .readFileSync(file, 'utf8')
      .replaceAll(
        'import.meta.env.VITE_API_ENDPOINT',
        JSON.stringify('http://localhost:5000')
      ),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
      },
    }
  ).outputText
  const exports = {}
  new Function('require', 'exports', code)((id) => {
    if (id in mocks) return mocks[id]
    throw new Error(`Unexpected import: ${id}`)
  }, exports)
  return exports
}

const token = (jti, exp, sub = 'patient-1') => JSON.stringify({ jti, exp, sub })
function sessionStore(
  current,
  post = async () => {
    throw new Error('Unexpected refresh')
  }
) {
  let stored = current
  const writes = []
  const { saveSessionToken, refreshAccessToken, endSession } = load(
    'src/libs/session.ts',
    {
      axios: {
        default: {
          create: () => ({ post }),
          isAxiosError: (error) => error?.isAxiosError === true,
        },
      },
      'react-jwt': {
        decodeToken: (value) => (value ? JSON.parse(value) : null),
      },
      '@/components/auth/helpers': {
        getToken: () => stored,
        removeToken: () => {
          stored = null
        },
        isTokenValid: (value) => JSON.parse(value).exp > 100,
        setToken: (value) => {
          stored = value
          writes.push(value)
        },
      },
    }
  )
  return {
    saveSessionToken,
    refreshAccessToken,
    endSession,
    writes,
    get: () => stored,
    logout: () => {
      stored = null
    },
  }
}

test('stores a renewed token for the same patient session', () => {
  const store = sessionStore(token('session-1', 200))
  store.saveSessionToken(token('session-1', 300))
  assert.equal(JSON.parse(store.get()).exp, 300)
})

test('a delayed response cannot shorten the latest expiry', () => {
  const store = sessionStore(token('session-1', 300))
  store.saveSessionToken(token('session-1', 200))
  assert.equal(store.writes.length, 0)
})

test('a response from another login or patient cannot replace the current token', () => {
  const store = sessionStore(token('session-1', 200))
  store.saveSessionToken(token('session-2', 300))
  store.saveSessionToken(token('session-1', 300, 'patient-2'))
  assert.equal(store.writes.length, 0)
})

test('an in-flight response cannot restore a logged-out session', () => {
  const store = sessionStore(token('session-1', 200))
  store.logout()
  store.saveSessionToken(token('session-1', 300))
  assert.equal(store.get(), null)
})

test('does not store expired tokens', () => {
  const store = sessionStore(token('session-1', 200))
  store.saveSessionToken(token('session-1', 99))
  assert.equal(store.writes.length, 0)
})

test('foreground activity is throttled and no unattended heartbeat is scheduled', async () => {
  const originalWindow = global.window
  const originalDocument = global.document
  const originalNow = Date.now
  const events = new Map()
  const docEvents = new Map()
  let now = 100_000
  Date.now = () => now
  global.window = {
    location: { pathname: '/livechat' },
    addEventListener: (name, fn) => events.set(name, fn),
    removeEventListener: (name) => events.delete(name),
  }
  global.document = {
    visibilityState: 'visible',
    addEventListener: (name, fn) => docEvents.set(name, fn),
    removeEventListener: (name) => docEvents.delete(name),
  }
  let effect
  let requests = 0
  const { SessionActivity } = load(
    'src/components/portal-layout/session-activity.tsx',
    {
      axios: { isAxiosError: () => false },
      '@nui/ui/toast': { showToast: () => {} },
      react: {
        useEffect: (fn) => {
          effect = fn
        },
      },
      'react-router-dom': { useNavigate: () => () => {} },
      '@/api/axiosInstance': {
        default: {
          post: async () => {
            requests += 1
          },
        },
      },
      '@/components/auth/helpers': {
        getToken: () => 'token',
        isTokenValid: () => true,
        removeToken: () => {},
      },
    }
  )
  try {
    SessionActivity()
    const cleanup = effect()
    await new Promise(setImmediate)
    assert.equal(requests, 1)
    events.get('pointerdown')({ isTrusted: true })
    assert.equal(requests, 1)
    now += 60_001
    events.get('keydown')({ isTrusted: false })
    assert.equal(requests, 1)
    global.document.visibilityState = 'hidden'
    events.get('pointerdown')({ isTrusted: true })
    assert.equal(requests, 1)
    global.document.visibilityState = 'visible'
    events.get('pointerdown')({ isTrusted: true })
    await new Promise(setImmediate)
    assert.equal(requests, 2)
    // No events means no calls, even if days have elapsed.
    now += 31 * 86400000
    await new Promise(setImmediate)
    assert.equal(requests, 2)
    cleanup()
    assert.equal(events.size, 0)
    assert.equal(docEvents.size, 0)
  } finally {
    global.window = originalWindow
    global.document = originalDocument
    Date.now = originalNow
  }
})

test('parallel 401s share one refresh request and persist the replacement access token', async () => {
  let calls = 0
  let complete
  const store = sessionStore(token('session-1', 99), async () => {
    calls += 1
    return new Promise((resolve) => {
      complete = resolve
    })
  })
  const first = store.refreshAccessToken(true)
  const second = store.refreshAccessToken(true)
  complete({ data: { accessToken: token('session-1', 300) } })
  assert.equal(await first, token('session-1', 300))
  assert.equal(await second, token('session-1', 300))
  assert.equal(calls, 1)
  assert.equal(store.get(), token('session-1', 300))
})

test('a refresh response cannot restore a session after logout', async () => {
  let complete
  const store = sessionStore(
    token('session-1', 99),
    () =>
      new Promise((resolve) => {
        complete = resolve
      })
  )
  const pending = store.refreshAccessToken(true)
  store.logout()
  complete({ data: { accessToken: token('session-1', 300) } })
  await assert.rejects(pending, /session changed/)
  assert.equal(store.get(), null)
})

test('network failures during refresh preserve the current login for retry', async () => {
  const store = sessionStore(token('session-1', 99), async () => {
    throw new Error('offline')
  })
  await assert.rejects(store.refreshAccessToken(), /offline/)
  assert.equal(store.get(), token('session-1', 99))
})

test('refresh rejection clears the expired session and dispatches the sign-in event', async () => {
  const original = global.window
  const events = []
  global.window = { dispatchEvent: (event) => events.push(event.type) }
  try {
    const store = sessionStore(token('session-1', 99), async () => {
      throw { isAxiosError: true, response: { status: 401 } }
    })
    await assert.rejects(store.refreshAccessToken())
    assert.equal(store.get(), null)
    assert.deepEqual(events, ['livechat-session-expired'])
  } finally {
    global.window = original
  }
})

test('logout waits for an in-flight rotation before revoking its cookie', async () => {
  const calls = []
  let complete
  const store = sessionStore(token('session-1', 99), async (path) => {
    calls.push(path)
    if (path === '/refresh')
      return new Promise((resolve) => {
        complete = resolve
      })
    return { data: { success: true } }
  })
  const pending = store.refreshAccessToken()
  const logout = store.endSession()
  complete({ data: { accessToken: token('session-1', 300) } })
  await assert.rejects(pending)
  await logout
  assert.deepEqual(calls, ['/refresh', '/logout'])
  assert.equal(store.get(), null)
})

test('API retries a protected 401 once, without intercepting login failures', async () => {
  let rejected
  let refreshes = 0
  const requests = []
  const client = {
    interceptors: {
      request: { use: () => {} },
      response: {
        use: (_success, error) => {
          rejected = error
        },
      },
    },
    request: async (config) => {
      requests.push(config)
      return { status: 200 }
    },
  }
  load('src/api/axiosInstance.ts', {
    axios: { default: { create: () => client } },
    '@/components/auth': { getToken: () => 'old-access' },
    '@/libs/session': {
      refreshAccessToken: async () => {
        refreshes += 1
        return 'new-access'
      },
    },
  })
  const config = {
    url: '/livechat/messages',
    headers: { Authorization: 'Bearer old-access' },
  }
  await rejected({ response: { status: 401 }, config })
  assert.equal(requests.length, 1)
  assert.equal(config.headers.Authorization, 'Bearer new-access')
  await assert.rejects(rejected({ response: { status: 401 }, config }))
  await assert.rejects(
    rejected({
      response: { status: 401 },
      config: {
        url: '/livechat/login',
        headers: { Authorization: 'Bearer old-access' },
      },
    })
  )
  assert.equal(refreshes, 1)
})
