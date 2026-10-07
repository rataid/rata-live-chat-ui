import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useMergeRefs,
  useTransitionStyles,
} from '@floating-ui/react'
import { forwardRef } from 'react'

import { useDrawerContext } from '../hooks'
import { DrawerContentProps } from '../types'
import { DrawerClose } from './close'
import {
  DrawerContentContainer,
  DrawerContentOverLay,
  DrawerContentWrapper,
} from './content.style'

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  function DrawerContent(
    { initialFocus = -1, drawerSize, isClose = true, ...props },
    propRef
  ) {
    const { context: floatingContext, ...context } = useDrawerContext()

    const ref = useMergeRefs([context.refs.setFloating, propRef])

    const { isMounted, styles } = useTransitionStyles(floatingContext, {
      duration: 300,
      initial: {
        opacity: 0,
        transform: 'translateX(30%)',
      },
    })

    return isMounted ? (
      <FloatingPortal>
        <FloatingOverlay lockScroll className="z-[100]">
          <FloatingFocusManager
            context={floatingContext}
            initialFocus={initialFocus}
          >
            <DrawerContentOverLay>
              <DrawerContentWrapper
                ref={ref}
                style={styles}
                drawerSize={drawerSize}
                aria-labelledby={context.labelId}
                aria-describedby={context.descriptionId}
                {...context.getFloatingProps(props)}
              >
                <DrawerContentContainer>
                  {props.children}
                </DrawerContentContainer>
                {isClose && <DrawerClose />}
              </DrawerContentWrapper>
            </DrawerContentOverLay>
          </FloatingFocusManager>
          <div id="dialog-portal" />
        </FloatingOverlay>
      </FloatingPortal>
    ) : null
  }
)
