import tw, { styled } from 'twin.macro'

export const DisclosureWrapper = tw.div`flex flex-col gap-y-4 overflow-hidden`

export const DisclosureButton = tw.button`flex items-start justify-between w-full text-start cursor-pointer gap-x-2 disabled:cursor-not-allowed`

export const DisclosureButtonMain = tw.div`w-full`

export const DisclosureMain = tw.div`overflow-hidden`

type DisclosureIconProps = {
  isOpen?: boolean
  disabled?: boolean
}

export const DisclosureIcon = styled.div<DisclosureIconProps>(
  ({ isOpen, disabled }) => [
    isOpen && tw`rotate-180`,
    disabled ? tw`text-gray-400` : tw`group-hover:text-gray-900`,
    tw`flex w-fit items-center gap-x-2 ease-in-out duration-200`,
  ]
)
