import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useMergeRefs,
  useTransitionStyles,
} from '@floating-ui/react'
import { useResponsive } from 'ahooks'
import { forwardRef } from 'react'

import { useDialogContext } from '../hooks'
import { DialogContentProps } from '../types'
import { DialogClose } from './close'
import {
  DialogContentContainer,
  DialogContentContainerWrapper,
  DialogContentOverLay,
} from './content.style'

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent(
    { initialFocus, dialogSize, disableOnClose = false, ...props },
    propRef
  ) {
    const { context: floatingContext, ...context } = useDialogContext()

    const { xl } = useResponsive()

    const ref = useMergeRefs([context.refs.setFloating, propRef])

    const { isMounted, styles } = useTransitionStyles(floatingContext, {
      duration: 300,
      initial: {
        opacity: 0,
        transform: xl ? 'scale(0.8)' : 'translateY(30%)',
      },
    })

    return isMounted ? (
      <FloatingPortal>
        <FloatingOverlay tw="z-[100]" lockScroll>
          <FloatingFocusManager
            context={floatingContext}
            initialFocus={initialFocus}
          >
            <DialogContentOverLay>
              <DialogContentContainer
                ref={ref}
                style={styles}
                dialogSize={dialogSize}
                aria-labelledby={context.labelId}
                aria-describedby={context.descriptionId}
                {...context.getFloatingProps(props)}
              >
                <DialogContentContainerWrapper>
                  {props.children}
                </DialogContentContainerWrapper>
                {!disableOnClose && <DialogClose />}
              </DialogContentContainer>
            </DialogContentOverLay>
          </FloatingFocusManager>
          <div id="dialog-portal" />
        </FloatingOverlay>
      </FloatingPortal>
    ) : null
  }
)
