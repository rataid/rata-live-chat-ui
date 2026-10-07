import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

import Stack from '@nui/ui/stack'

export const PaginationSelectedWrapper = styled.div.attrs({ className: tw`fixed bottom-8 inset-x-4 p-4 bg-white rounded-lg border border-gray-200 z-[50] max-w-3xl mx-auto xl:relative xl:z-0 xl:border-0 xl:p-0 xl:bottom-0` })``

export const PaginationSelectedMain = styled(
  Stack
).attrs({ className: tw`justify-between w-full xl:justify-start xl:w-fit` })``

export const PaginationSelectedStatus = styled.div.attrs({ className: tw`flex items-center gap-x-2 text-sm font-semibold` })``

export const PaginationSelectedStatusNum = styled.div.attrs({ className: tw`text-base text-gray-900` })``

export const PaginationSelectedStatusLabel = styled.div.attrs({ className: tw`font-normal text-gray-500` })``

export const PaginationSelectedAction = styled.div.attrs({ className: tw`flex items-center gap-3` })``

export const PaginationSelectedActionCancel = styled.div.attrs({ className: tw`` })``

export const PaginationSelectedActionDelete = styled.div.attrs({ className: tw`` })``
