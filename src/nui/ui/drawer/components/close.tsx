import { ButtonHTMLAttributes, forwardRef } from 'react'

import Button from '@nui/ui/button'

import { useDrawerContext } from '../hooks'
import { DrawerCloseWrapper } from './close.style'

export const DrawerClose = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function DrawerClose(props, ref) {
  const { setOpen } = useDrawerContext()

  return (
    <DrawerCloseWrapper>
      <Button
        type="button"
        icon="lucide-x"
        variant="tertiaryGray"
        size="sm"
        {...props}
        ref={ref}
        onClick={() => {
          setOpen(false)
        }}
      />
    </DrawerCloseWrapper>
  )
})
