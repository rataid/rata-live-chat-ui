export interface InstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

let pending: InstallPromptEvent | null = null

// Capture before routing/login completes so the Home button can use it later.
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault()
  pending = event as InstallPromptEvent
  window.dispatchEvent(new Event('smilehub-install-ready'))
})
window.addEventListener('appinstalled', () => {
  pending = null
  window.dispatchEvent(new Event('smilehub-install-ready'))
})

export const getInstallPrompt = () => pending
export const clearInstallPrompt = () => {
  pending = null
}

export function isInstallReminderDue(lastShown: number, now = Date.now()) {
  return !Number.isFinite(lastShown) || lastShown <= 0 || now - lastShown >= 7 * 24 * 60 * 60 * 1000
}
