import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react'
import { createContext, useContext, useMemo, useState } from 'react'

import { TipOptions } from './type'

type ContextType = ReturnType<typeof useTip> | null

export const TipContext = createContext<ContextType>(null)

export const useTipContext = () => {
  const context = useContext(TipContext)

  if (context == null) {
    throw new Error('Tooltip components must be wrapped in <Tooltip />')
  }

  return context
}

export function useTip({
  isMobile = false,
  initialOpen = false,
  placement = 'top',
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: TipOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen)

  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        crossAxis: placement.includes('-'),
        fallbackAxisSideDirection: 'start',
        padding: 5,
      }),
      shift({ padding: 5 }),
    ],
  })

  const { context } = data

  const hover = useHover(context, {
    move: false,
    enabled: !isMobile ? controlledOpen == null : false,
  })
  const focus = useFocus(context, {
    enabled: !isMobile ? controlledOpen == null : false,
  })
  const click = useClick(context, {
    enabled: controlledOpen === undefined,
  })

  const dismiss = useDismiss(context)

  const role = useRole(context, { role: 'tooltip' })

  const interactions = useInteractions([hover, focus, click, dismiss, role])

  return useMemo(
    () => ({
      isMobile,
      open,
      setOpen,
      ...interactions,
      ...data,
    }),
    [isMobile, open, setOpen, interactions, data]
  )
}
