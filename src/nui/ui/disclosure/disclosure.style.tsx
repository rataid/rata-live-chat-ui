import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const DisclosureWrapper = styled.div.attrs({ className: tw`flex flex-col gap-y-4 overflow-hidden` })``

export const DisclosureButton = styled.button.attrs({ className: tw`flex items-start justify-between w-full text-start cursor-pointer gap-x-2 disabled:cursor-not-allowed` })``

export const DisclosureButtonMain = styled.div.attrs({ className: tw`w-full` })``

export const DisclosureMain = styled.div.attrs({ className: tw`overflow-hidden` })``

type DisclosureIconProps = {
  isOpen?: boolean
  disabled?: boolean
}

export const DisclosureIcon = styled.div.attrs<DisclosureIconProps>(({ isOpen, disabled }) => ({ className: [isOpen && tw`rotate-180`, disabled ? tw`text-gray-400` : tw`group-hover:text-gray-900`, tw`flex w-fit items-center gap-x-2 ease-in-out duration-200`].filter(Boolean).join(' ') }))<DisclosureIconProps>``
