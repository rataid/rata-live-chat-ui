import tw, { styled } from 'twin.macro'

import { RadioGroupProps } from './types'

const flexMap = {
  row: tw`flex flex-row h-10 leading-10 items-center gap-6`,
  column: tw`flex flex-col gap-4`,
}
export const RadioGroupWrapper = styled.div<Pick<RadioGroupProps, 'flow'>>(
  ({ flow }) => [flow && flexMap[flow]]
)

export const RadioGroupTitle = tw.div`text-sm font-semibold text-gray-900`
