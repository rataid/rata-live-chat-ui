import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const InfiniteScrollLoaderWrapper = styled.div.attrs({ className: tw`flex h-8 w-full items-center justify-center gap-x-2 text-sm font-semibold text-primary-600` })``

export const InfiniteScrollLoaderMain = styled.div.attrs({ className: tw`flex h-fit w-fit animate-spin items-center justify-center` })``
