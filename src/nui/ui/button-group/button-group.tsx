import tw, { styled } from 'twin.macro'

type ButtonGroupProps = {
  fit?: boolean
}

export const ButtonGroup = styled.div<ButtonGroupProps>(({ fit }) => [
  !fit ? tw`sm:w-fit w-full` : tw`w-fit`,
  tw`flex items-center overflow-auto h-fit rounded-lg border border-gray-200`,
])
