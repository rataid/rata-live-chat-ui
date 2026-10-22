const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')

function load(relative, mocks) {
  const file = path.join(__dirname, '..', relative)
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
    },
  }).outputText
  const exports = {}
  new Function('require', 'exports', code)((id) => {
    if (id in mocks) return mocks[id]
    throw new Error(`Unexpected import: ${id}`)
  }, exports)
  return exports
}

const token = (jti, exp, sub = 'patient-1') => JSON.stringify({ jti, exp, sub })
function sessionStore(current) {
  let stored = current
  const writes = []
  const { saveSessionToken } = load('src/libs/session.ts', {
    'react-jwt': { decodeToken: JSON.parse },
    '@/components/auth/helpers': {
      getToken: () => stored,
      isTokenValid: (value) => JSON.parse(value).exp > 100,
      setToken: (value) => {
        stored = value
        writes.push(value)
      },
    },
  })
  return {
    saveSessionToken,
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
