import { forwardRef, useId, useLayoutEffect } from 'react'

import { useDialogContext } from '../hooks'
import { DialogHeadingProps } from '../types'
import {
  DialogHeadingBody,
  DialogHeadingMain,
  DialogHeadingTitle,
  DialogHeadingWrapper,
} from './heading.style'

export const DialogHeading = forwardRef<HTMLHeadingElement, DialogHeadingProps>(
  function DialogHeading({ title, inline, children, ...otherProps }, ref) {
    const { setLabelId } = useDialogContext()
    const id = useId()

    // Only sets `aria-labelledby` on the Dialog root element
    // if this component is mounted inside it.
    useLayoutEffect(() => {
      setLabelId(id)
      return () => setLabelId(undefined)
    }, [id, setLabelId])

    return (
      <DialogHeadingWrapper ref={ref} id={id} {...otherProps}>
        <DialogHeadingMain inline={inline}>
          <DialogHeadingTitle>{title}</DialogHeadingTitle>
          {children && (
            <DialogHeadingBody inline={inline}>{children}</DialogHeadingBody>
          )}
        </DialogHeadingMain>
      </DialogHeadingWrapper>
    )
  }
)
