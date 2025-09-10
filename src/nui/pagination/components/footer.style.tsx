/* eslint-disable import/no-cycle */
import tw from 'twin.macro'

export const PaginationFooterWrapper = tw.div`mt-4 h-[4.25rem] flex items-center justify-between text-sm`

export const PaginationFooterPerPage = tw.div`pr-6 shrink-0 flex items-center gap-x-2`

export const PaginationFooterPerPageLabel = tw.div`font-medium text-gray-700`

export const PaginationFooterPerPageSelect = tw.div`font-semibold w-[4.9375rem]`

export const PaginationFooterInfo = tw.div`px-6 flex-1 text-center font-medium text-gray-700`

export const PaginationFooterPagination = tw.div`shrink-0 w-full xl:(pl-6 w-auto)`
