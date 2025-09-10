import {
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react'
import { createContext, useContext, useMemo, useState } from 'react'

import { DrawerProps } from './types'

type ContextType =
  | (ReturnType<typeof useDrawer> & {
      setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>
      setDescriptionId: React.Dispatch<React.SetStateAction<string | undefined>>
    })
  | null

export const DrawerContext = createContext<ContextType>(null)

export const useDrawerContext = () => {
  const context = useContext(DrawerContext)

  if (context == null) {
    throw new Error('Drawer components must be wrapped in <Drawer />')
  }

  return context
}

export function useDrawer({
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: DrawerProps = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen)
  const [labelId, setLabelId] = useState<string | undefined>()
  const [descriptionId, setDescriptionId] = useState<string | undefined>()

  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen

  const data = useFloating({
    open,
    onOpenChange: setOpen,
  } as any)

  const { context } = data

  const click = useClick(context, {
    enabled: controlledOpen == null,
  })
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' })
  const role = useRole(context)

  const interactions = useInteractions([click, dismiss, role])

  return useMemo(
    () => ({
      open,
      setOpen,
      // onClose,
      ...interactions,
      ...data,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    }),
    [open, setOpen, interactions, data, labelId, descriptionId]
  )
}
