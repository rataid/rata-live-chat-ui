import {
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react'

type UseDialogFloatingOptions = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Floating UI state for <Dialog />: closes on Escape and outside press
export function useDialogFloating({
  open,
  onOpenChange,
}: UseDialogFloatingOptions) {
  const { context, refs } = useFloating({ open, onOpenChange })

  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' })
  const role = useRole(context)

  const { getFloatingProps } = useInteractions([dismiss, role])

  return { context, refs, getFloatingProps }
}
