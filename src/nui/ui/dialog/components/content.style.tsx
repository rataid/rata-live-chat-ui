import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

import { DialogSize } from '../types'

export const DialogContentOverLay = styled.div.attrs({ className: tw`flex h-full w-screen flex-col items-center justify-end xl:justify-center bg-gray-500/10 backdrop-blur-[2px]` })``

type DialogContentContainerProps = {
  dialogSize?: DialogSize
}

export const DialogContentContainer = styled.div.attrs<DialogContentContainerProps>(({ dialogSize = 'xs' }) =>  {
    const dialogSizes = {
      '2xs': tw`w-full md:w-[25rem]`,
      xs: tw`w-full md:w-[35rem]`,
      sm: tw`w-full md:w-[40rem]`,
      md: tw`w-full md:w-[45rem]`,
      lg: tw`w-full lg:w-[50rem]`,
      xl: tw`w-full lg:w-[55rem]`,
      '2xl': tw`w-full lg:w-[60rem]`,
    }

    return { className: [dialogSize && dialogSizes[dialogSize], tw`relative rounded-t-2xl max-h-[calc(100%-3rem)] max-w-3xl xl:min-w-[25rem] xl:max-w-none xl:m-4 xl:rounded-lg bg-white`].filter(Boolean).join(' ') }
  })<DialogContentContainerProps>``

export const DialogContentContainerWrapper = styled.div.attrs({ className: tw`h-full w-full overflow-auto px-4 pb-4 xl:px-6 xl:pb-6` })``
