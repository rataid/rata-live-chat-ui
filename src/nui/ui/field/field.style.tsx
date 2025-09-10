import tw, { styled } from 'twin.macro'

import { FieldProps } from './types'

export const FieldWrapper = styled.div<Pick<FieldProps, 'fit'>>(({ fit }) => [
  fit ? tw`w-fit` : tw`w-full`,
  tw`flex gap-x-1 items-center text-sm text-gray-500`,
])

export const fontWeightMap = {
  normal: tw`font-normal`,
  medium: tw`font-medium`,
  semibold: tw`font-semibold`,
  bold: tw`font-bold`,
  extrabold: tw`font-extrabold`,
}

export const FieldIcon = tw.div`h-6 leading-6 flex items-center`

export const FieldLabel = styled.div<Pick<FieldProps, 'fontWeight'>>(
  ({ fontWeight }) => [
    fontWeight && fontWeightMap[fontWeight],
    tw`flex items-center xl:whitespace-nowrap text-gray-700`,
  ]
)

export const FieldContent = styled.span<Pick<FieldProps, 'inline'>>(
  ({ inline }) => [
    inline && tw`font-normal text-gray-500`,
    tw`whitespace-pre-line`,
  ]
)
