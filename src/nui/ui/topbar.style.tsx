import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const TopbarWrapper = styled.div.attrs({ className: tw`px-4 flex items-center justify-between h-11 bg-white gap-x-3 border-b sm:h-[4rem] border-gray-200 xl:h-[4.5rem] xl:px-8` })``

export const TopbarMain = styled.div.attrs({ className: tw`flex-1` })``

export const TopbarPortal = styled.div.attrs({ className: tw`shrink-0` })``
