import tw, { styled } from 'twin.macro'

import { NotifProps } from './types'

export const NotifWrapper = tw.div`flex items-center gap-3`

export const NotifIconEdge = styled.div<Pick<NotifProps, 'type'>>(
  ({ type }) => {
    const colors = {
      default: tw`text-gray-600 outline-gray-50`,
      info: tw`text-primary-600 outline-primary-50`,
      success: tw`text-success-600 outline-success-50`,
      warning: tw`text-warning-600 outline-warning-50`,
      error: tw`text-danger-600 outline-danger-50`,
    }

    return [
      colors && colors[type],
      tw`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white outline`,
    ]
  }
)

export const NotifMain = tw.div``

export const NotifTitle = tw.div`text-sm font-semibold text-gray-700`

export const NotifMessage = tw.div`text-xs text-gray-500`
