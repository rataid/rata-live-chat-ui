import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const PaneWrapper = styled.div.attrs({ className: tw`flex h-full flex-col xl:flex-row gap-12` })``

export const PaneMain = styled.div.attrs({ className: tw`flex-1 h-full xl:pt-6 pb-16 max-w-4xl` })``

export const PaneSecondary = styled.div.attrs({ className: tw`w-full pb-16 hidden xl:block xl:pt-6 xl:w-[19rem]` })``
