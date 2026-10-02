import styled from 'styled-components'

import { tw } from '@nui/utils/tw'

export const ProfileMobileWrapper = styled.div.attrs({
  className: tw`flex justify-between items-center gap-1 p-4 pb-3 last:pb-4 border-t border-gray-200`,
})``

export const ProfileMobileProfile = styled.div.attrs({
  className: tw`flex items-center gap-x-2`,
})``

export const ProfileMobileDetail = styled.div.attrs({
  className: tw`text-sm`,
})``

export const ProfileName = styled.div.attrs({
  className: tw`font-semibold text-gray-900`,
})``

export const ProfileEmail = styled.div.attrs({
  className: tw`text-xs text-gray-500`,
})``

export const ProfileMobileAction = styled.div.attrs({
  className: tw`flex items-center gap-4`,
})``
