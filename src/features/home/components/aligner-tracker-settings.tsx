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
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AlignerTrackerSettingsValues>({
    resolver: zodResolver(alignerTrackerSettingsSchema),
    defaultValues,
    mode: 'onBlur',
  })

  // The total can't be lower than the set in use (and is at least 1)
  const minTotalSets = Math.max(1, Number(watch('currentSet')) || 0)

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
        Atur progres Aligner
        <DialogClose />
      </DialogHeader>
      <DialogBody>
        <div className="grid gap-3 sm:grid-cols-2">
          <FormControl required error={errors.currentSet}>
            <FormLabel>Set Aligner sekarang</FormLabel>
            <Controller
              name="currentSet"
              control={control}
              // Its error shows on totalSets, so check that field too
              rules={{ deps: 'totalSets' }}
              render={({ field }) => (
                <Input type="number" min={0} inputMode="numeric" {...field} />
              )}
            />
          </FormControl>
          <FormControl required error={errors.totalSets}>
            <FormLabel>Jumlah set Aligner</FormLabel>
            <Controller
              name="totalSets"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  min={minTotalSets}
                  inputMode="numeric"
                  {...field}
                />
              )}
            />
          </FormControl>
          <FormControl required error={errors.daysPerSet}>
            <FormLabel>Durasi pemakaian Aligner (hari)</FormLabel>
            <Controller
              name="daysPerSet"
              control={control}
              render={({ field }) => (
                <Input type="number" min={1} inputMode="numeric" {...field} />
              )}
            />
          </FormControl>
          <FormControl required error={errors.startDate}>
            <FormLabel>Mulai pakai set Aligner</FormLabel>
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
          Tutup
        </Button>
        <Button type="submit" fontWeight="medium" disabled={isSubmitting}>
          {isSubmitting ? 'Menyimpan...' : 'Simpan'}
        </Button>
      </DialogFooter>
    </form>
  )
}
