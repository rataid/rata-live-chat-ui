import styled from 'styled-components'

import { tw } from '@nui/utils/tw'

export const PaginationHeaderWrapper = styled.div.attrs({
  className: tw`pb-6 flex flex-wrap items-center gap-y-3 justify-end xl:justify-between xl:flex-nowrap gap-x-6`,
})``

export const PaginationHeaderTitle = styled.div.attrs({
  className: tw`text-sm text-gray-700 w-full font-semibold`,
})``

export const PaginationHeaderSelect = styled.div`
  :not(:has(div)) {
    display: none;
  }
`

export const PaginationHeaderFilter = styled.div.attrs({
  className: tw`flex flex-1 flex-wrap xl:flex-nowrap gap-4 items-center justify-end`,
})``

export const PaginationHeaderSearch = styled.div.attrs({
  className: tw`flex-1 w-full min-w-[12.5rem] xl:min-w-[20rem] xl:max-w-xs h-10 leading-10`,
})``

export const PaginationHeaderSelected = styled.div.attrs({
  className: tw`w-fit h-10 leading-10 absolute xl:relative`,
})``
