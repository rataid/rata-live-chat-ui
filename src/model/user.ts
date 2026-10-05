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

export interface User {
  id: number
  employee_id: string
  name: string
  position: string
  organization: string
  email: string
  approval_line: number
  approval_line_employee_id?: string | null
  grade: string
  is_active: boolean
  created_at: string
  created_by?: null | string
  updated_at: string
  updated_by: string
  division: EmployeeDivision
}

export interface EmployeeDivision {
  id: string
  code: string
  name: string
}
