import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const AppLayoutWrapper = styled.div.attrs({ className: tw`flex h-[calc(100vh-4.5rem)] justify-center w-full bg-gray-50 text-gray-500 xl:h-screen xl:bg-none` })``

export const AppLayoutContainer = styled.div.attrs({ className: tw`flex-1 flex h-full flex-col max-w-3xl w-full xl:max-w-none overflow-y-scroll bg-white` })``
