import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

import { FieldProps } from './types'

export const FieldWrapper = styled.div.attrs<Pick<FieldProps, 'fit'>>(({ fit }) => ({ className: [fit ? tw`w-fit` : tw`w-full`, tw`flex gap-x-1 items-center text-sm text-gray-500`].filter(Boolean).join(' ') }))<Pick<FieldProps, 'fit'>>``

export const fontWeightMap = {
  normal: tw`font-normal`,
  medium: tw`font-medium`,
  semibold: tw`font-semibold`,
  bold: tw`font-bold`,
  extrabold: tw`font-extrabold`,
}

export const FieldIcon = styled.div.attrs({ className: tw`h-6 leading-6 flex items-center` })``

export const FieldLabel = styled.div.attrs<Pick<FieldProps, 'fontWeight'>>(({ fontWeight }) => ({ className: [fontWeight && fontWeightMap[fontWeight], tw`flex items-center xl:whitespace-nowrap text-gray-700`].filter(Boolean).join(' ') }))<Pick<FieldProps, 'fontWeight'>>``

export const FieldContent = styled.span.attrs<Pick<FieldProps, 'inline'>>(({ inline }) => ({ className: [inline && tw`font-normal text-gray-500`, tw`whitespace-pre-line`].filter(Boolean).join(' ') }))<Pick<FieldProps, 'inline'>>``
