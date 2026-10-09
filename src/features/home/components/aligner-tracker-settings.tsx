import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import {
  AlignerTrackerSettingsValues,
  alignerTrackerSettingsSchema,
} from '@/model/aligner'
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

type AlignerTrackerSettingsProps = {
  defaultValues: Partial<AlignerTrackerSettingsValues>
  onSave: (values: AlignerTrackerSettingsValues) => Promise<void>
}

export function AlignerTrackerSettings({
  defaultValues,
  onSave,
}: AlignerTrackerSettingsProps) {
  const { closeDialog } = useDialog()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AlignerTrackerSettingsValues>({
    resolver: zodResolver(alignerTrackerSettingsSchema),
    defaultValues,
  })

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (values) => {
        try {
          await onSave(values)
          closeDialog()
        } catch {}
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
                <Input type="number" min={0} inputMode="numeric" {...field} />
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
          disabled={isSubmitting}
          onClick={closeDialog}
        >
          Close
        </Button>
        <Button type="submit" fontWeight="medium" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </DialogFooter>
    </form>
  )
}
