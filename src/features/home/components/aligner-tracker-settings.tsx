import { zodResolver } from '@hookform/resolvers/zod'
import { isValid } from 'date-fns'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { DatePicker, FormControl, FormLabel, Input } from '@nui/form'
import Button from '@nui/ui/button'
import {
  DIALOG_PORTAL_ID,
  DialogBody,
  DialogClose,
  DialogFooter,
  DialogHeader,
  useDialog,
} from '@nui/ui/dialog'

const settingsSchema = z
  .object({
    currentSet: z.coerce.number().int().min(1, 'Must be at least 1'),
    totalSets: z.coerce.number().int().min(1, 'Must be at least 1'),
    daysPerSet: z.coerce
      .number()
      .int()
      .min(1, 'Must be at least 1 day')
      .max(60, 'Must be 60 days or less'),
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

export type AlignerTrackerSettingsValues = z.infer<typeof settingsSchema>

type AlignerTrackerSettingsProps = {
  defaultValues: AlignerTrackerSettingsValues
  onSave: (values: AlignerTrackerSettingsValues) => void
}

// Content of the "Setup Tracker Aligner" popup, opened with openDialog()
export function AlignerTrackerSettings({
  defaultValues,
  onSave,
}: AlignerTrackerSettingsProps) {
  const { closeDialog } = useDialog()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AlignerTrackerSettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues,
  })

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => {
        onSave(values)
        closeDialog()
      })}
    >
      <DialogHeader>
        Setup Tracker Aligner
        <DialogClose />
      </DialogHeader>
      <DialogBody>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormControl required error={errors.currentSet}>
            <FormLabel>Set currently in use</FormLabel>
            <Controller
              name="currentSet"
              control={control}
              render={({ field }) => (
                <Input type="number" min={1} inputMode="numeric" {...field} />
              )}
            />
          </FormControl>
          <FormControl required error={errors.totalSets}>
            <FormLabel>Total sets</FormLabel>
            <Controller
              name="totalSets"
              control={control}
              render={({ field }) => (
                <Input type="number" min={1} inputMode="numeric" {...field} />
              )}
            />
          </FormControl>
          <FormControl required error={errors.daysPerSet}>
            <FormLabel>Duration per set (days)</FormLabel>
            <Controller
              name="daysPerSet"
              control={control}
              render={({ field }) => (
                <Input type="number" min={1} inputMode="numeric" {...field} />
              )}
            />
          </FormControl>
          <FormControl required error={errors.startDate}>
            <FormLabel>Start using this set</FormLabel>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  placeholder="dd/mm/yyyy"
                  portalId={DIALOG_PORTAL_ID}
                  disabledDays={{ after: new Date() }}
                  {...field}
                />
              )}
            />
          </FormControl>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="secondaryGray"
          fontWeight="medium"
          onClick={closeDialog}
        >
          Close
        </Button>
        <Button type="submit" fontWeight="medium">
          Save
        </Button>
      </DialogFooter>
    </form>
  )
}
