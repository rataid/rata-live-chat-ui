import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

type ButtonProps = {
  fit?: boolean
}

export const ButtonNav = styled(NavLink).attrs<ButtonProps>(({ fit }) => ({ className: [fit && tw`last:border-0`, tw`border-r border-gray-200 min-w-max`].filter(Boolean).join(' ') }))<ButtonProps>``

export const ButtonButton = styled.button.attrs<ButtonProps>(({ fit }) => ({ className: [fit && tw`last:border-0`, tw`border-r border-gray-200 min-w-max`].filter(Boolean).join(' ') }))<ButtonProps>``

type ButtonMainProps = {
  isActive?: boolean
}

export const ButtonMain = styled.div.attrs<ButtonMainProps>(({ isActive }) => ({ className: [isActive
    ? tw`bg-gray-50 font-semibold text-gray-900`
    : tw`bg-white text-gray-700 font-medium`, tw`px-4 py-2.5 text-sm`].filter(Boolean).join(' ') }))<ButtonMainProps>``
