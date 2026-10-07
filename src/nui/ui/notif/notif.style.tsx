import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

import { NotifProps } from './types'

export const NotifWrapper = styled.div.attrs({ className: tw`flex items-center gap-3` })``

export const NotifIconEdge = styled.div.attrs<Pick<NotifProps, 'type'>>(({ type }) =>  {
    const colors = {
      default: tw`text-gray-600 outline-gray-50`,
      info: tw`text-primary-600 outline-primary-50`,
      success: tw`text-success-600 outline-success-50`,
      warning: tw`text-warning-600 outline-warning-50`,
      error: tw`text-danger-600 outline-danger-50`,
    }

    return { className: [colors && colors[type], tw`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white outline`].filter(Boolean).join(' ') }
  })<Pick<NotifProps, 'type'>>``

export const NotifMain = styled.div.attrs({ className: tw`` })``

export const NotifTitle = styled.div.attrs({ className: tw`text-sm font-semibold text-gray-700` })``

export const NotifMessage = styled.div.attrs({ className: tw`text-xs text-gray-500` })``
