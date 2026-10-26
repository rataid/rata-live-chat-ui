import { z } from 'zod'

const PHONE_REGEX = /^(\+62|62|0)8\d{7,11}$/

const isEmailOrPhone = (value: string) =>
  z.string().email().safeParse(value).success || PHONE_REGEX.test(value)

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
    phone: z.string().min(8, { message: 'Nomor telepon tidak valid' }),
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
