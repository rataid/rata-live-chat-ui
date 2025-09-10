import { HTMLProps, forwardRef, useId, useLayoutEffect } from 'react'

import { useDrawerContext } from '../hooks'

// @todo
// Consider to remove this component
// as custom NUI modal only use content and heading
export const DrawerDescription = forwardRef<
  HTMLParagraphElement,
  HTMLProps<HTMLParagraphElement>
>(function DrawerDescription({ children, ...props }, ref) {
  const { setDescriptionId } = useDrawerContext()
  const id = useId()

  // Only sets `aria-describedby` on the Drawer root element
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
