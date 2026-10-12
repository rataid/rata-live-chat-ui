const REGISTER_PHONE_KEY = 'register.phone'
const REGISTER_EMAIL_KEY = 'register.email'
const REGISTER_EMAIL_SENT_KEY = 'register.emailSent'

export function setRegisterPhone(phone: string) {
  try {
    sessionStorage.setItem(REGISTER_PHONE_KEY, phone)
  } catch {}
}

export function getRegisterPhone() {
  try {
    return sessionStorage.getItem(REGISTER_PHONE_KEY)
  } catch {
    return null
  }
}

export function clearRegisterPhone() {
  try {
    sessionStorage.removeItem(REGISTER_PHONE_KEY)
  } catch {}
}

export function setRegisterEmail(email: string) {
  try {
    sessionStorage.setItem(REGISTER_EMAIL_KEY, email)
  } catch {}
}

export function getRegisterEmail() {
  try {
    return sessionStorage.getItem(REGISTER_EMAIL_KEY)
  } catch {
    return null
  }
}

export function setRegisterEmailSent() {
  try {
    sessionStorage.setItem(REGISTER_EMAIL_SENT_KEY, '1')
  } catch {}
}

export function isRegisterEmailSent() {
  try {
    return sessionStorage.getItem(REGISTER_EMAIL_SENT_KEY) === '1'
  } catch {
    return false
  }
}
