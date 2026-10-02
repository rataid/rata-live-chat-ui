import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

import { AppSubnavNavItemProps } from '../types'

export const AppSubnavWrapper = styled.div.attrs({ className: tw`px-4 shrink-0 flex flex-col` })``

export const AppSubnavTitle = styled.h2.attrs({ className: tw`pb-4 text-sm text-gray-700 font-bold` })``

export const AppSubnavNav = styled.div.attrs({ className: tw`flex flex-col gap-y-1` })``

export const AppSubnavNavItemWrapper = styled.div.attrs<AppSubnavNavItemProps>(({ active = false }: AppSubnavNavItemProps) => ({ className: [active
      ? tw`bg-primary-50 text-primary-700`
      : tw`text-gray-700 hover:bg-primary-50 hover:text-primary-700`, tw`relative px-3 flex items-center justify-between rounded-md text-sm font-medium cursor-pointer`].filter(Boolean).join(' ') }))<AppSubnavNavItemProps>``

export const AppSubnavNavItem = styled.div.attrs({ className: tw`flex items-center gap-x-3 w-full` })``

export const AppSubnavNavItemIcon = styled.div.attrs({ className: tw`flex items-center w-4` })``

export const AppSubnavNavItemLabel = styled.div.attrs({ className: tw`py-2.5` })``

export const AppSubnavNavItemTotal = styled.div.attrs<AppSubnavNavItemProps>(({ active = false }: AppSubnavNavItemProps) => ({ className: [active ? tw`bg-primary-100` : tw`bg-primary-50 group-hover:bg-primary-100`, tw`flex min-w-[30px] shrink-0 items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-primary-700`].filter(Boolean).join(' ') }))<AppSubnavNavItemProps>``

export const AppSubnavNavItemLoader = styled.div.attrs({ className: tw`absolute right-3 flex animate-spin items-center justify-center text-primary-700` })``
