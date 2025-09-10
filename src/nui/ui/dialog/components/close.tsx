import { ButtonHTMLAttributes, forwardRef } from 'react'

import Button from '@nui/ui/button'

import { useDialogContext } from '../hooks'
import { DialogCloseWrapper } from './close.style'

export const DialogClose = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function DialogClose(props, ref) {
  const { setOpen } = useDialogContext()

  return (
    <DialogCloseWrapper>
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
    </DialogCloseWrapper>
  )
})
