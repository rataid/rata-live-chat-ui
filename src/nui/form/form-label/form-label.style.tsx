import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const FormLabelWrapper = styled.label.attrs({ className: tw`flex items-center gap-x-0.5` })``

export const FormLabelMain = styled.label.attrs({ className: tw`font-semibold text-sm text-gray-900` })``

export const FormLabelOptional = styled.span.attrs({ className: tw`pl-1 text-xs text-gray-500` })``

export const FormLabelRequired = styled.span.attrs({ className: tw`text-sm font-semibold text-danger-500` })``
