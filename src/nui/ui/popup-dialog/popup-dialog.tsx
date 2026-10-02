import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useTransitionStyles,
} from '@floating-ui/react'

import { useDialog } from '@nui/ui/dialog/hooks'

import { PopupDialogContainer, PopupDialogOverlay } from './popup-dialog.style'
import { PopupDialogProps } from './types'

export function PopupDialog({
  open,
  onOpenChange,
  size = 'md',
  children,
}: PopupDialogProps) {
  const { context, refs, getFloatingProps } = useDialog({
    open,
    onOpenChange,
  })

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 200,
    initial: { opacity: 0, transform: 'scale(0.95)' },
  })

  if (!isMounted) return null

  return (
    <FloatingPortal>
      <FloatingOverlay tw="z-[100]" lockScroll>
        <FloatingFocusManager context={context}>
          <PopupDialogOverlay>
            <PopupDialogContainer
              ref={refs.setFloating}
              style={styles}
              size={size}
              {...getFloatingProps()}
            >
              {children}
            </PopupDialogContainer>
          </PopupDialogOverlay>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  )
}
