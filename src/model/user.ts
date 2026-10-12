import { z } from 'zod'

const PHONE_REGEX = /^(\+62|62|0)8\d{7,11}$/

const isEmailOrPhone = (value: string) =>
  z.string().email().safeParse(value).success || PHONE_REGEX.test(value)

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email or phone number is required' })
    .refine(isEmailOrPhone, {
      message: 'Email or phone number is invalid',
    }),
  password: z.string().min(1, { message: 'Password is required' }),
})

export const verifyOtpSchema = z.object({
  phone: z.string().min(8),
  otp: z.string().regex(/^\d{6}$/, { message: 'OTP must be 6 digits' }),
})

const newPasswordFields = {
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  password_confirmation: z
    .string()
    .min(1, { message: 'Confirm password is required' }),
}

const passwordsMatch = (data: {
  password: string
  password_confirmation: string
}) => data.password === data.password_confirmation

const passwordsMatchError = {
  message: 'Passwords do not match',
  path: ['password_confirmation'],
}

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, { message: 'Full name is required' }),
    email: z.string().email({ message: 'Email is invalid' }),
    phone: z.string().min(8, { message: 'Phone number is invalid' }),
    ...newPasswordFields,
  })
  .refine(passwordsMatch, passwordsMatchError)

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Email is invalid' }),
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
