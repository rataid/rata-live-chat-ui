import tw, { styled } from 'twin.macro'

type FormInlineControlProps = {
  error?: boolean
}

export const FormInlineControl = styled.div<FormInlineControlProps>(
  ({ error }) => [
    tw`rounded-lg border border-dashed border-red-500`,
    !error ? tw`border-gray-200` : tw`border-red-500`,
  ]
)
