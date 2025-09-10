import tw, { styled } from 'twin.macro'

import { DialogSize } from '../types'

export const DialogContentOverLay = tw.div`flex h-full w-screen flex-col items-center justify-end xl:justify-center bg-gray-500/10 backdrop-blur-[2px]`

type DialogContentContainerProps = {
  dialogSize?: DialogSize
}

export const DialogContentContainer = styled.div<DialogContentContainerProps>(
  ({ dialogSize = 'xs' }) => {
    const dialogSizes = {
      '2xs': tw`w-full md:w-[25rem]`,
      xs: tw`w-full md:w-[35rem]`,
      sm: tw`w-full md:w-[40rem]`,
      md: tw`w-full md:w-[45rem]`,
      lg: tw`w-full lg:w-[50rem]`,
      xl: tw`w-full lg:w-[55rem]`,
      '2xl': tw`w-full lg:w-[60rem]`,
    }

    return [
      dialogSize && dialogSizes[dialogSize],
      tw`relative rounded-t-2xl max-h-[calc(100%-3rem)] max-w-3xl xl:(min-w-[25rem] max-w-none m-4 rounded-lg) bg-white`,
    ]
  }
)

export const DialogContentContainerWrapper = tw.div`h-full w-full overflow-auto px-4 pb-4 xl:(px-6 pb-6)`
