import { forwardRef } from 'react'

import Button from '../button'
import {
  InlineConfirmAction,
  InlineConfirmMain,
  InlineConfirmWrapper,
} from './inline-confirm.style'
import { InlineConfirmProps } from './types'

export const InlineConfirm = forwardRef<HTMLButtonElement, InlineConfirmProps>(
  function InlineConfirm(
    { onConfirm, onCancel, children, ...props },
    forwadedRef
  ) {
    const handleOnCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (onCancel) onCancel()
    }

    const handleOnConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!forwadedRef) {
        e.preventDefault()
      }
      onConfirm()
    }
    return (
      <InlineConfirmWrapper>
        <InlineConfirmMain>{children}</InlineConfirmMain>
        <InlineConfirmAction>
          <Button
            onClick={handleOnCancel}
            variant="secondary"
            danger
            wider="full"
          >
            Cancel
          </Button>
          <Button
            ref={forwadedRef}
            onClick={handleOnConfirm}
            type="submit"
            variant="primary"
            danger
            wider="full"
            {...props}
          >
            Submit
          </Button>
        </InlineConfirmAction>
      </InlineConfirmWrapper>
    )
  }
)
