import { isValidPhoneNumber } from 'libphonenumber-js/mobile'
import { z } from 'zod'

// Any country: "+1415…" / "6281…" (country code), or "0812…" (Indonesia)
const isPhone = (value: string) =>
  isValidPhoneNumber(value, 'ID') || isValidPhoneNumber(`+${value}`)

const isEmailOrPhone = (value: string) =>
  z.string().email().safeParse(value).success || isPhone(value)

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email atau nomor telepon wajib diisi' })
    .refine(isEmailOrPhone, {
      message: 'Email atau nomor telepon tidak valid',
    }),
  password: z.string().min(1, { message: 'Kata sandi wajib diisi' }),
})

export const verifyOtpSchema = z.object({
  phone: z.string().min(8),
  otp: z.string().regex(/^\d{6}$/, { message: 'OTP harus berupa 6 digit' }),
})

const newPasswordFields = {
  password: z
    .string()
    .min(8, { message: 'Kata sandi harus minimal 8 karakter' }),
  password_confirmation: z
    .string()
    .min(1, { message: 'Konfirmasi kata sandi wajib diisi' }),
}

const passwordsMatch = (data: {
  password: string
  password_confirmation: string
}) => data.password === data.password_confirmation

const passwordsMatchError = {
  message: 'Kata sandi dan konfirmasi kata sandi tidak cocok',
  path: ['password_confirmation'],
}

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, { message: 'Nama Lengkap wajib diisi' }),
    email: z.string().email({ message: 'Email tidak valid' }),
    // Same library as the backend; InputPhone gives digits with the country
    // code (6281…), so "+" is added before checking
    phone: z
      .string()
      .min(1, { message: 'Nomor telepon wajib diisi' })
      .refine((value) => isValidPhoneNumber(`+${value}`), {
        message: 'Nomor telepon tidak valid',
      }),
    ...newPasswordFields,
  })
  .refine(passwordsMatch, passwordsMatchError)

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Email tidak valid' }),
})

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    ...newPasswordFields,
  })
  .refine(passwordsMatch, passwordsMatchError)

// API payloads
export type RegisterPayload = {
  name: string
  email: string
  phone: string
  password: string
}

export type RegisterResponse = {
  retryAfterSeconds: number
}

export type ResendVerificationEmailResponse = {
  retryAfterSeconds: number
}

export type VerifyEmailResponse = {
  retryAfterSeconds: number
}

export type RequestOtpResponse = {
  retryAfterSeconds: number
}

export type ResetPasswordPayload = {
  token: string
  password: string
}

export type OtpChannel = 'WA'
export type OtpPurpose = 'REGISTER'

export type RequestOtpPayload = {
  target: string
  channel: OtpChannel
  purpose: OtpPurpose
}

export type VerifyOtpPayload = RequestOtpPayload & {
  // 6 digit code the user received
  code: string
}
