import tw, { styled } from 'twin.macro'

import { DrawerSize } from '../types'

export const DrawerContentOverLay = tw.div`flex h-full w-screen flex-col items-end justify-end bg-gray-500/10 backdrop-blur-[2px]`

type DrawerContentWrapperProps = {
  drawerSize?: DrawerSize
}

export const DrawerContentWrapper = styled.div<DrawerContentWrapperProps>(
  ({ drawerSize = 'md' }) => {
    const drawerSizes = {
      xs: tw`w-full md:w-[35rem]`,
      sm: tw`w-full md:w-[40rem]`,
      md: tw`w-full md:w-[45rem]`,
      lg: tw`w-full lg:w-[50rem]`,
      xl: tw`w-full lg:w-[55rem]`,
      '2xl': tw`w-full lg:w-[60rem]`,
    }

    return [
      drawerSize && drawerSizes[drawerSize],
      tw`h-full rounded-none mt-0 overflow-hidden bg-white overflow-y-scroll`,
    ]
  }
)

export const DrawerContentContainer = tw.div`relative px-4 pb-4 lg:(px-8 pb-8)`
