import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useMergeRefs,
  useTransitionStyles,
} from '@floating-ui/react'
import { forwardRef } from 'react'

import { useTipContext } from '../hooks'

export const TipContent = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function TipContent({ style, id, ...props }, propRef) {
  const { isMobile, context: floatingContext, ...context } = useTipContext()

  const ref = useMergeRefs([context.refs.setFloating, propRef])

  const { isMounted, styles } = useTransitionStyles(floatingContext, {
    duration: 200,
    initial: {
      opacity: 0,
    },
  })

  if (isMobile) {
    return isMounted ? (
      <FloatingPortal id={id}>
        <FloatingOverlay lockScroll tw="z-[6666]">
          <FloatingFocusManager initialFocus={-1} context={floatingContext}>
            <div tw="h-full w-screen flex items-end justify-center bg-gray-500/10 backdrop-blur-[2px]">
              <div
                tw="max-h-[calc(100%-48px)] max-w-3xl mx-auto"
                style={styles}
              >
                <div
                  ref={ref}
                  style={styles}
                  {...context.getFloatingProps(props)}
                />
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      </FloatingPortal>
    ) : null
  }

  return isMounted ? (
    <FloatingPortal id={id}>
      <div tw="relative z-[6666]" style={styles}>
        <div
          ref={ref}
          style={{
            ...context.floatingStyles,
            ...style,
          }}
          {...context.getFloatingProps(props)}
        />
      </div>
    </FloatingPortal>
  ) : null
})
