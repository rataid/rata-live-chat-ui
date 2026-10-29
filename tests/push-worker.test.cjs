const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')

function worker({ enabled = true } = {}) {
  const handlers = {}
  const notifications = []
  const opened = []
  const values = new Map([['enabled', enabled]])
  const indexedDB = {
    open() {
      const request = {}
      queueMicrotask(() => {
        request.result = {
          close() {},
          transaction() {
            const transaction = {
              objectStore() {
                return {
                  get(key) { const result = { result: values.get(key) }; queueMicrotask(() => transaction.oncomplete()); return result },
                  put(value, key) { values.set(key, value); const result = {}; queueMicrotask(() => transaction.oncomplete()); return result },
                }
              },
            }
            return transaction
          },
        }
        request.onsuccess()
      })
      return request
    },
  }
  const self = {
    location: { origin: 'https://smilehub.example.com' },
    addEventListener: (name, callback) => { handlers[name] = callback },
    registration: { showNotification: async (...args) => { notifications.push(args) } },
    clients: { matchAll: async () => [], openWindow: async (url) => opened.push(url) },
  }
  vm.runInNewContext(fs.readFileSync('public/livechat-notification-sw.js', 'utf8'), { self, indexedDB, URL, Response, fetch })
  const dispatch = async (name, data = {}) => {
    let work
    handlers[name]({ ...data, waitUntil: (promise) => { work = promise } })
    await work
  }
  return { dispatch, notifications, opened }
}

test('shows the clinic and message while closed and ignores untrusted destination URLs', async () => {
  const workerInstance = worker()
  await workerInstance.dispatch('push', { data: { json: () => ({ title: 'Klinik TANAM Pakubuwono', tag: 'livechat-message-1', body: 'Halo Jainal', url: 'https://attacker.example.com' }) } })
  assert.equal(workerInstance.notifications.length, 1)
  assert.equal(workerInstance.notifications[0][1].tag, 'livechat-message-1')
  assert.equal(workerInstance.notifications[0][0], 'Klinik TANAM Pakubuwono')
  assert.equal(workerInstance.notifications[0][1].body, 'Halo Jainal')
  await workerInstance.dispatch('notificationclick', { notification: { close() {} } })
  assert.deepEqual(workerInstance.opened, ['https://smilehub.example.com/livechat'])
})

test('does not show queued pushes after notification disable or logout', async () => {
  const workerInstance = worker({ enabled: false })
  await workerInstance.dispatch('push')
  assert.equal(workerInstance.notifications.length, 0)
})
