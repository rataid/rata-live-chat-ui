const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const ts = require('typescript')

function setup({ permission = 'granted', muted = false, configured = true } = {}) {
  let token = 'header.' + Buffer.from(JSON.stringify({ sub: 'patient-1', jti: 'session-1' })).toString('base64url') + '.signature'
  let subscription = null
  const requests = []
  const workerMessages = []
  let unsubscribed = 0
  const registration = {
    active: { postMessage: (message) => workerMessages.push(message) },
    pushManager: {
      getSubscription: async () => subscription,
      subscribe: async (options) => {
        assert.equal(options.userVisibleOnly, true)
        subscription = {
          options,
          endpoint: 'https://fcm.googleapis.com/test',
          toJSON: () => ({ keys: { auth: 'auth', p256dh: 'public' } }),
          unsubscribe: async () => { unsubscribed++; subscription = null; return true },
        }
        return subscription
      },
    },
  }
  const api = {
    get: async () => ({ data: { enabled: configured, publicKey: configured ? Buffer.alloc(65, 1).toString('base64url') : null } }),
    post: async (path, body) => { requests.push({ path, body }); return {} },
  }
  const navigator = { serviceWorker: { register: async () => registration, ready: Promise.resolve(registration), getRegistration: async () => registration } }
  const exports = {}
  const code = ts.transpileModule(fs.readFileSync('src/features/livechat/push/push-client.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText
  new Function('exports', 'require', 'window', 'navigator', 'Notification', 'localStorage', code)(
    exports,
    (name) => name.includes('axiosInstance') ? { default: api } : { getToken: () => token },
    { isSecureContext: true, PushManager: function () {} }, navigator,
    { permission }, { getItem: () => muted ? '1' : '0' },
  )
  return { ...exports, requests, workerMessages, logout: () => { token = null }, get unsubscribed() { return unsubscribed } }
}

test('registers an authenticated device and removes it before browser unsubscribe', async () => {
  const client = setup()
  await client.syncWebPush()
  assert.equal(client.isWebPushSubscribed(), true)
  assert.equal(client.requests[0].path, '/livechat/push/subscribe')
  assert.equal(client.requests[0].body.accountId, undefined)
  await client.disableWebPush()
  assert.equal(client.isWebPushSubscribed(), false)
  assert.equal(client.requests[1].path, '/livechat/push/unsubscribe')
  assert.equal(client.unsubscribed, 1)
  assert.deepEqual(client.workerMessages.map((item) => item.enabled), [true, false])
})

test('does not subscribe while muted, permission is denied, or logged out', async () => {
  for (const options of [{ muted: true }, { permission: 'denied' }]) {
    const client = setup(options)
    await client.syncWebPush()
    assert.equal(client.requests.length, 0)
  }
  const client = setup()
  client.logout()
  await client.syncWebPush()
  assert.equal(client.requests.length, 0)
})

test('does not report a subscription as ready when the backend is not configured', async () => {
  const client = setup({ configured: false })
  await assert.rejects(client.syncWebPush(), /belum dikonfigurasi/)
  assert.equal(client.isWebPushSubscribed(), false)
})
