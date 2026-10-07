import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const PageWrapper = styled.div.attrs({ className: tw`relative flex justify-between` })``

export const PageAside = styled.aside.attrs({ className: tw`hidden fixed w-[15.5rem] h-screen py-9 bg-white border-r border-gray-200 xl:block` })``

export const PageAsideMain = styled.div.attrs({ className: tw`flex flex-col gap-y-7` })``

type PageInnerProps = {
  hasSidenav: boolean
}

export const PageInner = styled.main.attrs<PageInnerProps>(({ hasSidenav }) => ({ className: [tw`flex-1 flex flex-col w-full`, hasSidenav && tw`xl:pl-[15.5rem]`].filter(Boolean).join(' ') }))<PageInnerProps>``

export const PageTop = styled.main.attrs({ className: tw`shrink-0 sticky top-0 z-[50]` })``

export const PageMain = styled.main.attrs({ className: tw`py-4 xl:py-10 flex flex-col gap-y-10` })``
