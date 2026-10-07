import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useTransitionStyles,
} from '@floating-ui/react'
import { createContext, useContext } from 'react'

import Icon from '@nui/ui/icon'

import {
  DialogCloseButton,
  DialogContainer,
  DialogOverlay,
} from './dialog.style'
import { useDialogFloating } from './hooks'
import { DialogProps } from './types'

export const DIALOG_PORTAL_ID = 'dialog-portal'

const DialogCloseContext = createContext<{ close: () => void } | null>(null)

export function Dialog({
  open,
  onOpenChange,
  size = 'md',
  children,
}: DialogProps) {
  const { context, refs, getFloatingProps } = useDialogFloating({
    open,
    onOpenChange,
  })

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 200,
    initial: { opacity: 0, transform: 'scale(0.95)' },
  })

  if (!isMounted) return null

  return (
    <DialogCloseContext.Provider value={{ close: () => onOpenChange(false) }}>
      <FloatingPortal>
        <FloatingOverlay className="z-[100]" lockScroll>
          <FloatingFocusManager context={context}>
            <DialogOverlay>
              <DialogContainer
                ref={refs.setFloating}
                style={styles}
                $size={size}
                {...getFloatingProps()}
              >
                {children}
                {/* Floating content (date picker, select) rendered here stays
                    inside the dialog, so clicking it doesn't close the dialog */}
                <div id={DIALOG_PORTAL_ID} />
              </DialogContainer>
            </DialogOverlay>
          </FloatingFocusManager>
        </FloatingOverlay>
      </FloatingPortal>
    </DialogCloseContext.Provider>
  )
}

// X button for the header, closes the dialog it is rendered in
export function DialogClose() {
  const context = useContext(DialogCloseContext)

  return (
    <DialogCloseButton
      type="button"
      aria-label="Close"
      onClick={() => context?.close()}
    >
      <Icon icon="lucide-x" size="xs" />
    </DialogCloseButton>
  )
}
