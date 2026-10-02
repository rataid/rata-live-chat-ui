import { useMergeRefs } from '@floating-ui/react'
import { cloneElement, forwardRef, isValidElement } from 'react'

import { useTipContext } from '../hooks'

export const TipTrigger = forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & { asChild?: boolean }
>(function TipTrigger({ children, asChild = false, ...props }, propRef) {
  const context = useTipContext()
  const childrenRef = (children as any).ref
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef])

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        'data-state': context.open ? 'open' : 'closed',
      })
    )
  }

  return (
    <span
      ref={ref}
      role="button"
      className="leading-none"
      // The user can style the trigger based on the state
      data-state={context.open ? 'open' : 'closed'}
      {...context.getReferenceProps(props)}
    >
      {children}
    </span>
  )
})
