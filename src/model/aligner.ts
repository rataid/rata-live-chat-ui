import { isValid } from 'date-fns'
import { z } from 'zod'

export const alignerTrackerSettingsSchema = z
  .object({
    currentSet: z.coerce.number().int().min(0, 'Must be at least 0'),
    totalSets: z.coerce.number().int().min(1, 'Must be at least 1'),
    daysPerSet: z.coerce.number().int().min(1, 'Must be at least 1 day'),
    // yyyy-MM-dd from the date picker (shown as dd/mm/yyyy)
    startDate: z
      .string()
      .min(1, 'Required')
      .refine((value) => isValid(new Date(value)), {
        message: 'Invalid date format (dd/mm/yyyy)',
      })
      .refine((value) => new Date(value) <= new Date(), {
        message: 'Cannot be in the future',
      }),
  })
  .refine((data) => data.currentSet <= data.totalSets, {
    message: 'Cannot be more than the total sets',
    path: ['currentSet'],
  })

export type AlignerTrackerSettingsValues = z.infer<
  typeof alignerTrackerSettingsSchema
>

export type AlignerPlan = {
  id: string
  currentSet: number
  totalSets: number
  durationDays: number
  // yyyy-MM-dd
  startedOn: string
  changeDueOn: string
  // 1-based day within the current set
  dayIndex: number
  daysLeft: number
  completionPercent: number
}

export type WearToday = {
  active: boolean
  activeStartedAt: string | null
  removedSec: number
  allowanceSec: number
  remainingSec: number
  onTrack: boolean
  removalPercent: number
}

export type AlignerHistoryItem = {
  setNumber: number
  // YYYY-MM-DD
  changedOn: string
}

export type SaveAlignerPlanPayload = {
  currentSet: number
  totalSets: number
  durationDays: number
  // YYYY-MM-DD
  startedOn: string
}
