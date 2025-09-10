import tw, { styled } from 'twin.macro'

import { AppSubnavNavItemProps } from '../types'

export const AppSubnavWrapper = tw.div`px-4 shrink-0 flex flex-col`

export const AppSubnavTitle = tw.h2`pb-4 text-sm text-gray-700 font-bold`

export const AppSubnavNav = tw.div`flex flex-col gap-y-1`

export const AppSubnavNavItemWrapper = styled.div(
  ({ active = false }: AppSubnavNavItemProps) => [
    active
      ? tw`bg-primary-50 text-primary-700`
      : tw`text-gray-700 hover:(bg-primary-50 text-primary-700)`,
    tw`relative px-3 flex items-center justify-between rounded-md text-sm font-medium cursor-pointer`,
  ]
)

export const AppSubnavNavItem = tw.div`flex items-center gap-x-3 w-full`

export const AppSubnavNavItemIcon = tw.div`flex items-center w-4`

export const AppSubnavNavItemLabel = tw.div`py-2.5`

export const AppSubnavNavItemTotal = styled.div(
  ({ active = false }: AppSubnavNavItemProps) => [
    active ? tw`bg-primary-100` : tw`bg-primary-50 group-hover:bg-primary-100`,
    tw`flex min-w-[30px] shrink-0 items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-primary-700`,
  ]
)

export const AppSubnavNavItemLoader = tw.div`absolute right-3 flex animate-spin items-center justify-center text-primary-700`
