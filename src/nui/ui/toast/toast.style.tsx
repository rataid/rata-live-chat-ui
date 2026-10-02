import tw, { styled } from 'twin.macro'

import { ToastType } from './types'

type ToastStyleProps = { type: ToastType }

const titleColors = {
  success: tw`text-success-600`,
  error: tw`text-danger-600`,
  warning: tw`text-warning-600`,
  info: tw`text-primary-600`,
}

const messageColors = {
  success: tw`text-success-500`,
  error: tw`text-danger-500`,
  warning: tw`text-warning-500`,
  info: tw`text-primary-500`,
}

export const ToastWrapper = tw.div`flex items-start gap-3`

export const ToastIcon = styled.div<ToastStyleProps>(({ type }) => [
  tw`mt-0.5 shrink-0`,
  titleColors[type],
])

export const ToastMain = tw.div`flex min-w-0 flex-col gap-1`

export const ToastTitle = styled.div<ToastStyleProps>(({ type }) => [
  tw`text-sm font-semibold sm:text-base`,
  titleColors[type],
])

export const ToastMessage = styled.div<ToastStyleProps>(({ type }) => [
  tw`text-sm leading-5`,
  messageColors[type],
])
