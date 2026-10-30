import { format, isValid } from 'date-fns'
import { z } from 'zod'

// Number inputs: empty or non-numeric becomes NaN after coerce
const wholeNumber = z.coerce
  .number({ invalid_type_error: 'Wajib diisi dengan angka' })
  .int('Harus berupa bilangan bulat')

export const alignerTrackerSettingsSchema = z
  .object({
    currentSet: wholeNumber.min(1, 'Minimal set 1'),
    totalSets: wholeNumber.min(1, 'Minimal 1 set'),
    daysPerSet: wholeNumber.min(1, 'Minimal 1 hari'),
    // yyyy-MM-dd from the date picker (shown as dd/mm/yyyy)
    startDate: z
      .string()
      .min(1, 'Tanggal mulai wajib diisi')
      .refine((value) => isValid(new Date(value)), {
        message: 'Format tanggal tidak valid (dd/mm/yyyy)',
      })
      // Compare calendar days: new Date('yyyy-MM-dd') is UTC midnight, which
      // would turn today into the future before 07:00 WIB
      .refine((value) => value <= format(new Date(), 'yyyy-MM-dd'), {
        message: 'Tanggal tidak boleh melebihi hari ini',
      }),
  })
  .refine((data) => data.totalSets >= data.currentSet, {
    message: 'Tidak boleh kurang dari set Aligner sekarang',
    path: ['totalSets'],
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
