import { forwardRef } from 'react'
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize'

import { FormLabel } from '@nui/form'
import { TextareaPropsWithoutRef } from '@nui/types'

import { TextareaMain, TextareaWrapper } from './textarea.style'

export type TextareaProps = {
  rows?: number
  minRows?: number
  maxRows?: number
  label?: string
  isDanger?: boolean
}

export type TextareaOrTextareaAutosizeProps =
  | (TextareaProps &
      TextareaAutosizeProps & {
        autosize?: true
      })
  | (TextareaProps &
      TextareaPropsWithoutRef & {
        autosize: false
      })

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaOrTextareaAutosizeProps
>(function Textarea(
  { rows = 3, minRows = 3, maxRows = 12, label, isDanger = false, ...props },
  forwardedRef
) {
  return (
    <TextareaWrapper>
      {label && <FormLabel>{label}</FormLabel>}
      <TextareaMain isDanger={isDanger}>
        {props.autosize === false ? (
          <textarea ref={forwardedRef} rows={rows} {...props} />
        ) : (
          <TextareaAutosize
            ref={forwardedRef}
            rows={rows}
            minRows={minRows}
            maxRows={maxRows}
            {...props}
          />
        )}
      </TextareaMain>
    </TextareaWrapper>
  )
})
