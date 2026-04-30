import { z } from 'zod'

import { email, password } from './shared/validations'

export const loginSchema = z.object({
  email,
  password,
})

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
