// Registration data kept between the register form, the email link and the
// OTP step. localStorage, not sessionStorage: the email link usually opens
// in a new tab. Cleared once the account is activated.
const REGISTER_PHONE_KEY = 'register.phone'
const REGISTER_EMAIL_KEY = 'register.email'
const REGISTER_EMAIL_SENT_KEY = 'register.emailSent'

function setItem(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {}
}

function getItem(key: string) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export function setRegisterPhone(phone: string) {
  setItem(REGISTER_PHONE_KEY, phone)
}

export function getRegisterPhone() {
  return getItem(REGISTER_PHONE_KEY)
}

export function setRegisterEmail(email: string) {
  setItem(REGISTER_EMAIL_KEY, email)
}

export function getRegisterEmail() {
  return getItem(REGISTER_EMAIL_KEY)
}

export function setRegisterEmailSent() {
  setItem(REGISTER_EMAIL_SENT_KEY, '1')
}

export function isRegisterEmailSent() {
  return getItem(REGISTER_EMAIL_SENT_KEY) === '1'
}

// After the account is activated
export function clearRegisterSession() {
  try {
    ;[REGISTER_PHONE_KEY, REGISTER_EMAIL_KEY, REGISTER_EMAIL_SENT_KEY].forEach(
      (key) => localStorage.removeItem(key)
    )
  } catch {}
}
