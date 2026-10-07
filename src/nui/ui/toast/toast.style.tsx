import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

import { ToastType } from './types'

// `$` prefix keeps the prop from being forwarded to the DOM element
type ToastStyleProps = { $type: ToastType }

const titleColors: Record<ToastType, string> = {
  success: tw`text-success-600`,
  error: tw`text-danger-600`,
  warning: tw`text-warning-600`,
  info: tw`text-primary-600`,
}

const messageColors: Record<ToastType, string> = {
  success: tw`text-success-500`,
  error: tw`text-danger-500`,
  warning: tw`text-warning-500`,
  info: tw`text-primary-500`,
}

export const ToastWrapper = styled.div.attrs({
  className: tw`flex items-start gap-3`,
})``

export const ToastIcon = styled.div.attrs<ToastStyleProps>(({ $type }) => ({
  className: [tw`mt-0.5 shrink-0`, titleColors[$type]].join(' '),
}))<ToastStyleProps>``

export const ToastMain = styled.div.attrs({
  className: tw`flex min-w-0 flex-col gap-1`,
})``

export const ToastTitle = styled.div.attrs<ToastStyleProps>(({ $type }) => ({
  className: [tw`text-sm font-semibold sm:text-base`, titleColors[$type]].join(
    ' '
  ),
}))<ToastStyleProps>``

export const ToastMessage = styled.div.attrs<ToastStyleProps>(({ $type }) => ({
  className: [tw`text-sm leading-5`, messageColors[$type]].join(' '),
}))<ToastStyleProps>``
