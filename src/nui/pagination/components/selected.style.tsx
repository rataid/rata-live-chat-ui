import tw from 'twin.macro'

import Stack from '@nui/ui/stack'

export const PaginationSelectedWrapper = tw.div`fixed bottom-8 inset-x-4 p-4 bg-white rounded-lg border border-gray-200 z-[50] max-w-3xl mx-auto xl:(relative z-0 border-0 p-0 bottom-0)`

export const PaginationSelectedMain = tw(
  Stack
)`justify-between w-full xl:(justify-start w-fit)`

export const PaginationSelectedStatus = tw.div`flex items-center gap-x-2 text-sm font-semibold`

export const PaginationSelectedStatusNum = tw.div`text-base text-gray-900`

export const PaginationSelectedStatusLabel = tw.div`font-normal text-gray-500`

export const PaginationSelectedAction = tw.div`flex items-center gap-3`

export const PaginationSelectedActionCancel = tw.div``

export const PaginationSelectedActionDelete = tw.div``
