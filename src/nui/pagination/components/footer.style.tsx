/* eslint-disable import/no-cycle */
import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const PaginationFooterWrapper = styled.div.attrs({ className: tw`mt-4 h-[4.25rem] flex items-center justify-between text-sm` })``

export const PaginationFooterPerPage = styled.div.attrs({ className: tw`pr-6 shrink-0 flex items-center gap-x-2` })``

export const PaginationFooterPerPageLabel = styled.div.attrs({ className: tw`font-medium text-gray-700` })``

export const PaginationFooterPerPageSelect = styled.div.attrs({ className: tw`font-semibold w-[4.9375rem]` })``

export const PaginationFooterInfo = styled.div.attrs({ className: tw`px-6 flex-1 text-center font-medium text-gray-700` })``

export const PaginationFooterPagination = styled.div.attrs({ className: tw`shrink-0 w-full xl:pl-6 xl:w-auto` })``
