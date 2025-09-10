import tw, { styled } from 'twin.macro'

import { BlankLayoutProps } from '../types'

// export const BlankLayoutWrapper = tw.div`flex h-screen w-screen text-gray-500 xl:bg-gray-100`

type BlankLayoutWrapperProps = Pick<BlankLayoutProps, 'background'>

const backgroundMap = {
  white: tw`bg-white`,
  gray: tw`xl:bg-gray-100`,
}

export const BlankLayoutWrapper = styled.div<BlankLayoutWrapperProps>(
  ({ background }) => [
    background && backgroundMap[background],
    tw`flex h-screen w-screen text-gray-500`,
  ]
)

type BlankLayoutContainerProps = Pick<BlankLayoutProps, 'middle'>

export const BlankLayoutContainer = styled.div<BlankLayoutContainerProps>(
  ({ middle }) => [
    tw`mx-auto flex h-full max-w-screen-2xl justify-center`,
    middle && tw`items-center`,
  ]
)
