self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clients) => {
        const open = clients.find((client) => 'focus' in client)
        if (open) return open.focus()
        if (self.clients.openWindow) return self.clients.openWindow('/home')
      })
  )
})