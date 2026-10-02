import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const Wrapper = styled.div.attrs({ className: tw`relative rounded-lg border border-gray-200` })``

export const Title = styled.div.attrs({ className: tw`mb-4 px-6 pt-6 text-base font-bold text-gray-900` })``

export const Content = styled.div.attrs({ className: tw`relative px-6 pb-6 text-sm text-gray-500` })``

export const Image = styled.div.attrs({ className: tw`absolute bottom-4 right-4 w-[98px]` })``

export const ImageStyle = tw`w-full object-cover h-full`

export const Main = styled.div.attrs({ className: tw`max-w-[193px]` })``
