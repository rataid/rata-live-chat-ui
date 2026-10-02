import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const AppMobileNavWrapper = styled.div.attrs({ className: tw`flex h-[4.5rem] items-center justify-between border-b border-gray-200 bg-white px-4 max-w-3xl mx-auto` })``

export const AppMobileNavLogo = styled.div.attrs({ className: tw`w-[2.125rem]` })``

export const AppMobileNavOverlay = styled.div.attrs({ className: tw`flex h-full max-w-3xl mx-auto overflow-hidden flex-col items-end justify-end bg-gray-500/10 backdrop-blur-[2px]` })``

export const AppMobileNavMain = styled.div.attrs({ className: tw`relative bg-white w-full flex flex-col h-full justify-between` })``

export const AppMobileNavNav = styled.div.attrs({ className: tw`flex justify-between h-[calc(100%-72px)]` })``

export const AppMobileNavNavWrapper = styled.div.attrs({ className: tw`w-[72px] py-2 border-r border-gray-200` })``

export const AppMobileNavNavMain = styled.div.attrs({ className: tw`w-full flex flex-col items-center gap-y-2 py-2 px-4` })``

export const AppMobileNavNavDivide = styled.div.attrs({ className: tw`border-t border-gray-200 h-1 w-full last:hidden` })``

export const AppMobileNavSubNavWrapper = styled.div.attrs({ className: tw`w-full h-full mt-6 pb-4 overflow-hidden` })``

export const AppMobileNavSubNavMain = styled.div.attrs({ className: tw`flex flex-col pb-2 gap-y-4` })``

export const AppMobileNavProfile = styled.div.attrs({ className: tw`absolute bottom-0 bg-white right-0 left-0` })``
