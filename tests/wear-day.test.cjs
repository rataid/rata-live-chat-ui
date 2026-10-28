const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const ts = require('typescript')
const exportsForTest = {}
const code = ts.transpileModule(fs.readFileSync('src/api/aligner/wear-day.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText
new Function('exports', code)(exportsForTest)

test('switches days at midnight WIB regardless of browser timezone', () => {
  const before = Date.parse('2026-10-27T23:59:59+07:00')
  const after = Date.parse('2026-10-28T00:00:00+07:00')
  assert.equal(exportsForTest.wearDay(before), '2026-10-27')
  assert.equal(exportsForTest.wearDay(after), '2026-10-28')
  assert.equal(exportsForTest.msUntilNextWearDay(before), 1000)
  assert.equal(exportsForTest.msUntilNextWearDay(after), 86400000)
})
