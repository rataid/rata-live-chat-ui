import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const AppSidebarNavWrapper = styled.div.attrs({ className: tw`pb-6 flex-1 flex flex-col items-center justify-between text-gray-400` })``

export const AppSidebarNavTop = styled.div.attrs({ className: tw`flex flex-col gap-y-2` })``

export const AppSidebarNavBottom = styled.div.attrs({ className: tw`flex flex-col gap-y-2` })``

export const AppLayoutSidebarNavButton = styled.div.attrs<{ isActive?: boolean }>(({ isActive = false }: { isActive?: boolean }) => ({ className: [isActive
      ? tw`bg-primary-100 text-primary-600`
      : tw`text-gray-500 hover:bg-primary-100 hover:text-primary-600`, tw`flex items-center justify-center w-10 h-10 gap-y-2 cursor-pointer rounded-[6px]`].filter(Boolean).join(' ') }))<{ isActive?: boolean }>``
