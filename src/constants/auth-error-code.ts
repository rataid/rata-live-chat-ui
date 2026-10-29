// `code` in the backend's error responses (livechat auth, OTP)
export enum AuthErrorCode {
  // Register: the phone number doesn't match any customer (404)
  CUSTOMER_NOT_FOUND = 'CUSTOMER_NOT_FOUND',
  // Register: the account is already active (409)
  ALREADY_ACTIVATED = 'ALREADY_ACTIVATED',
  // /otp/request REGISTER: no pending registration, or its email isn't verified
  REGISTRATION_NOT_PENDING = 'REGISTRATION_NOT_PENDING',
  // OTP verified but the email isn't (shouldn't happen with the gate in place)
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
  // 5 wrong passwords in 15 minutes
  LOGIN_RATE_LIMITED = 'LOGIN_RATE_LIMITED',
  // Account not active yet / email not verified
  ACCOUNT_INACTIVE = 'ACCOUNT_INACTIVE',
  // Email link invalid or expired (legacy path, account already exists)
  VERIFY_TOKEN_INVALID = 'VERIFY_TOKEN_INVALID',
  // Pending registration expired (1 hour) before the email link was opened
  REGISTRATION_EXPIRED = 'REGISTRATION_EXPIRED',
  // Email verified, but sending the WhatsApp OTP failed
  OTP_SEND_FAILED = 'OTP_SEND_FAILED',
  // Forgot password: email not registered
  EMAIL_NOT_REGISTERED = 'EMAIL_NOT_REGISTERED',
  // Reset password token invalid or expired
  RESET_TOKEN_INVALID = 'RESET_TOKEN_INVALID',
}
