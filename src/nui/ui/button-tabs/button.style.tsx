import { NavLink } from 'react-router-dom'
import tw, { styled } from 'twin.macro'

type ButtonProps = {
  fit?: boolean
}

export const ButtonNav = styled(NavLink)<ButtonProps>(({ fit }) => [
  fit && tw`last:border-0`,
  tw`border-r border-gray-200 min-w-max`,
])

export const ButtonButton = styled.button<ButtonProps>(({ fit }) => [
  fit && tw`last:border-0`,
  tw`border-r border-gray-200 min-w-max`,
])

type ButtonMainProps = {
  isActive?: boolean
}

export const ButtonMain = styled.div<ButtonMainProps>(({ isActive }) => [
  isActive
    ? tw`bg-gray-50 font-semibold text-gray-900`
    : tw`bg-white text-gray-700 font-medium`,
  tw`px-4 py-2.5 text-sm`,
])
