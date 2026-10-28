const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')

function setup({ blocked = false } = {}) {
  const values = new Map()
  const location = { pathname: '/login' }
  const sessionStorage = {
    getItem: (key) => {
      if (blocked) throw new Error('Storage blocked')
      return values.get(key) ?? null
    },
    setItem: (key, value) => {
      if (blocked) throw new Error('Storage blocked')
      values.set(key, value)
    },
  }
  // Existing users can still have the legacy permanent dismissal flag.
  const localStorage = {
    getItem: (key) =>
      key === 'livechat.notification.promptDismissed' ? '1' : null,
  }
  const code = ts.transpileModule(
    fs.readFileSync(
      path.join(
        __dirname,
        '../src/features/livechat/notification-preference.ts'
      ),
      'utf8'
    ),
    { compilerOptions: { module: ts.ModuleKind.CommonJS } }
  ).outputText
  const exports = {}
  new Function(
    'require',
    'exports',
    'window',
    'localStorage',
    'sessionStorage',
    code
  )(() => ({}), exports, { location }, localStorage, sessionStorage)
  return { ...exports, location, values }
}

test('legacy permanent dismissal does not suppress the notification prompt', () => {
  const preferences = setup()
  assert.equal(preferences.isNotificationPromptDismissed(), false)
})

test('postponing the login prompt does not suppress the livechat prompt', () => {
  const preferences = setup()
  preferences.dismissNotificationPrompt()
  assert.equal(preferences.isNotificationPromptDismissed(), true)
  preferences.location.pathname = '/livechat'
  assert.equal(preferences.isNotificationPromptDismissed(), false)
  preferences.dismissNotificationPrompt()
  assert.equal(preferences.isNotificationPromptDismissed(), true)
})

test('a new tab session can show the prompt again', () => {
  const first = setup()
  first.dismissNotificationPrompt()
  assert.equal(first.isNotificationPromptDismissed(), true)
  assert.equal(setup().isNotificationPromptDismissed(), false)
})

test('trailing slashes do not create separate dismissal preferences', () => {
  const preferences = setup()
  preferences.dismissNotificationPrompt()
  preferences.location.pathname = '/login/'
  assert.equal(preferences.isNotificationPromptDismissed(), true)
})

test('blocked storage does not crash or permanently hide the prompt', () => {
  const preferences = setup({ blocked: true })
  assert.doesNotThrow(() => preferences.dismissNotificationPrompt())
  assert.equal(preferences.isNotificationPromptDismissed(), false)
})

test('choosing later explicitly on login suppresses the automatic chatroom prompt', () => {
  const preferences = setup()
  preferences.recordNotificationChoice()
  preferences.location.pathname = '/livechat'
  assert.equal(preferences.isNotificationPromptDismissed(), true)
})

test('without an explicit choice the chatroom may prompt, and new sessions reset the choice', () => {
  const preferences = setup()
  preferences.location.pathname = '/livechat'
  assert.equal(preferences.isNotificationPromptDismissed(), false)
  preferences.recordNotificationChoice()
  assert.equal(setup().isNotificationPromptDismissed(), false)
})

test('Home can prompt after the login choice but respects its own dismissal', () => {
  const preferences = setup()
  preferences.recordNotificationChoice()
  preferences.location.pathname = '/home'
  assert.equal(preferences.isNotificationPromptDismissed(), true)
  assert.equal(preferences.isNotificationPromptDismissed(true), false)
  preferences.dismissNotificationPrompt()
  assert.equal(preferences.isNotificationPromptDismissed(true), true)
})
