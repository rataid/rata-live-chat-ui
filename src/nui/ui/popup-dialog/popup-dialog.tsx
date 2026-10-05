import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useTransitionStyles,
} from '@floating-ui/react'
import { createContext, useContext } from 'react'

import { useDialog } from '@nui/ui/dialog/hooks'
import Icon from '@nui/ui/icon'

import {
  PopupDialogCloseButton,
  PopupDialogContainer,
  PopupDialogOverlay,
} from './popup-dialog.style'
import { PopupDialogProps } from './types'

const PopupDialogContext = createContext<{ close: () => void } | null>(null)

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
    <PopupDialogContext.Provider value={{ close: () => onOpenChange(false) }}>
      <FloatingPortal>
        <FloatingOverlay className="z-[100]" lockScroll>
          <FloatingFocusManager context={context}>
            <PopupDialogOverlay>
              <PopupDialogContainer
                ref={refs.setFloating}
                style={styles}
                $size={size}
                {...getFloatingProps()}
              >
                {children}
              </PopupDialogContainer>
            </PopupDialogOverlay>
          </FloatingFocusManager>
        </FloatingOverlay>
      </FloatingPortal>
    </PopupDialogContext.Provider>
  )
}

// X button for the header, closes the dialog it is rendered in
export function PopupDialogClose() {
  const context = useContext(PopupDialogContext)

  return (
    <PopupDialogCloseButton
      type="button"
      aria-label="Close"
      onClick={() => context?.close()}
    >
      <Icon icon="lucide-x" size="xs" />
    </PopupDialogCloseButton>
  )
}
