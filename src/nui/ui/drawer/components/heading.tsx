import { forwardRef, useId, useLayoutEffect } from 'react'

import { useDrawerContext } from '../hooks'
import { DrawerHeadingProps } from '../types'
import {
  DrawerHeadingBody,
  DrawerHeadingTitle,
  DrawerHeadingWrapper,
} from './heading.style'

export const DrawerHeading = forwardRef<HTMLHeadingElement, DrawerHeadingProps>(
  function DrawerHeading({ title, children, ...props }, ref) {
    const { setLabelId } = useDrawerContext()
    const id = useId()

    // Only sets `aria-labelledby` on the Drawer root element
    // if this component is mounted inside it.
    useLayoutEffect(() => {
      setLabelId(id)
      return () => setLabelId(undefined)
    }, [id, setLabelId])

    return (
      <DrawerHeadingWrapper {...props} ref={ref} id={id}>
        <DrawerHeadingTitle>{title}</DrawerHeadingTitle>
        <DrawerHeadingBody>{children}</DrawerHeadingBody>
      </DrawerHeadingWrapper>
    )
  }
)
