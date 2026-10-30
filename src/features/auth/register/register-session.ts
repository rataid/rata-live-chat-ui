// Registration data kept between the register form, the email link and the
// OTP step. localStorage, not sessionStorage: the email link usually opens
// in a new tab. Cleared once the account is activated.
const REGISTER_PHONE_KEY = 'register.phone'
const REGISTER_EMAIL_KEY = 'register.email'
const REGISTER_EMAIL_SENT_KEY = 'register.emailSent'
const REGISTER_EMAIL_RESEND_AT_KEY = 'register.emailResendAt'
const REGISTER_OTP_RESEND_AT_KEY = 'register.otpResendAt'

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

export function setRegisterEmailResendAt(retryAfterSeconds: number) {
  setItem(
    REGISTER_EMAIL_RESEND_AT_KEY,
    String(Date.now() + retryAfterSeconds * 1000)
  )
}

export function getRegisterEmailCooldown() {
  const resendAt = Number(getItem(REGISTER_EMAIL_RESEND_AT_KEY))

  if (!resendAt) return null

  return Math.max(0, Math.ceil((resendAt - Date.now()) / 1000))
}

export function setRegisterOtpResendAt(retryAfterSeconds: number) {
  setItem(
    REGISTER_OTP_RESEND_AT_KEY,
    String(Date.now() + retryAfterSeconds * 1000)
  )
}

export function getRegisterOtpCooldown() {
  const resendAt = Number(getItem(REGISTER_OTP_RESEND_AT_KEY))

  if (!resendAt) return null

  return Math.max(0, Math.ceil((resendAt - Date.now()) / 1000))
}

// After the account is activated
export function clearRegisterSession() {
  try {
    ;[
      REGISTER_PHONE_KEY,
      REGISTER_EMAIL_KEY,
      REGISTER_EMAIL_SENT_KEY,
      REGISTER_EMAIL_RESEND_AT_KEY,
      REGISTER_OTP_RESEND_AT_KEY,
    ].forEach((key) => localStorage.removeItem(key))
  } catch {}
}
