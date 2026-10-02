import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

import Box from '@nui/ui/box'

export const CardContactWrapper = styled(Box).attrs({ className: tw`relative h-full` })``

export const CardContactMain = styled.button.attrs({ className: tw`w-full flex flex-col items-center gap-y-4 text-sm` })``

export const CardContactContent = styled.div.attrs({ className: tw`line-clamp-1 w-full` })``

export const CardContactName = styled.div.attrs({ className: tw`text-base font-semibold text-gray-900` })``

export const CardContactNameLink = styled(CardContactName).attrs({ className: tw` hover:text-primary-700` })``

export const CardContacContact = styled.div.attrs({ className: tw`text-gray-700` })``
