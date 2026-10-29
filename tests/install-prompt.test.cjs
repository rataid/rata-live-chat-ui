const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const ts = require('typescript')

test('captures installation before home mounts and clears the prompt when installed', () => {
  const listeners = new Map()
  const events = []
  const window = {
    addEventListener: (name, callback) => listeners.set(name, callback),
    dispatchEvent: (event) => events.push(event.type),
  }
  const exports = {}
  const code = ts.transpileModule(fs.readFileSync('src/features/home/install-prompt.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText
  new Function('exports', 'window', code)(exports, window)
  const now = 1_800_000_000_000
  const week = 7 * 24 * 60 * 60 * 1000
  assert.equal(exports.isInstallReminderDue(0, now), true)
  assert.equal(exports.isInstallReminderDue(now, now), false)
  assert.equal(exports.isInstallReminderDue(now - week + 1, now), false)
  assert.equal(exports.isInstallReminderDue(now - week, now), true)
  let prevented = false
  const prompt = { preventDefault: () => { prevented = true } }
  listeners.get('beforeinstallprompt')(prompt)
  assert.equal(prevented, true)
  assert.equal(exports.getInstallPrompt(), prompt)
  listeners.get('appinstalled')()
  assert.equal(exports.getInstallPrompt(), null)
  assert.deepEqual(events, ['smilehub-install-ready', 'smilehub-install-ready'])
})
