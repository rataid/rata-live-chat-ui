import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const DrawerHeadingWrapper = styled.div.attrs({ className: tw`sticky top-0 pt-[1.125rem] lg:pt-8 pb-6 z-30 bg-white` })``

export const DrawerHeadingTitle = styled.div.attrs({ className: tw`text-xl lg:text-2xl text-gray-900 font-semibold tracking-tight` })``

export const DrawerHeadingBody = styled.div.attrs({ className: tw`text-sm text-gray-500` })``
