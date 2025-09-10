import { HTMLProps, forwardRef, useId, useLayoutEffect } from 'react'

import { useDialogContext } from '../hooks'

// @todo
// Consider to remove this component
// as custom NUI modal only use content and heading
export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  HTMLProps<HTMLParagraphElement>
>(function DialogDescription({ children, ...props }, ref) {
  const { setDescriptionId } = useDialogContext()
  const id = useId()

  // Only sets `aria-describedby` on the Dialog root element
  // if this component is mounted inside it.
  useLayoutEffect(() => {
    setDescriptionId(id)
    return () => setDescriptionId(undefined)
  }, [id, setDescriptionId])

  return (
    <p {...props} ref={ref} id={id}>
      {children}
    </p>
  )
})
