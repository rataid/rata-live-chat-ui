import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

import { BlankLayoutProps } from '../types'

// export const BlankLayoutWrapper = styled.div.attrs({ className: tw`flex h-screen w-screen text-gray-500 xl:bg-gray-100` })``

type BlankLayoutWrapperProps = Pick<BlankLayoutProps, 'background'>

const backgroundMap = {
  white: tw`bg-white`,
  gray: tw`xl:bg-gray-100`,
}

export const BlankLayoutWrapper = styled.div.attrs<BlankLayoutWrapperProps>(({ background }) => ({ className: [background && backgroundMap[background], tw`flex h-screen w-screen text-gray-500`].filter(Boolean).join(' ') }))<BlankLayoutWrapperProps>``

type BlankLayoutContainerProps = Pick<BlankLayoutProps, 'middle'>

export const BlankLayoutContainer = styled.div.attrs<BlankLayoutContainerProps>(({ middle }) => ({ className: [tw`mx-auto flex h-full max-w-screen-2xl justify-center`, middle && tw`items-center`].filter(Boolean).join(' ') }))<BlankLayoutContainerProps>``
