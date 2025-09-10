import tw, { styled } from 'twin.macro'

type ShortdateCellProps = { primary?: boolean }

export const ShortdateCellWrapper = tw.div`flex xl:(flex-col items-center justify-center) justify-end`

export const ShortdateCellContainer = styled.div<ShortdateCellProps>(
  ({ primary }) => [
    !primary
      ? tw`text-xs xl:text-sm text-gray-500 font-semibold`
      : tw`text-xs xl:text-sm text-primary-600 font-semibold`,
  ]
)

export const ShortdateCellMain = styled.div<ShortdateCellProps>(
  ({ primary }) => [
    !primary
      ? tw`text-xs font-semibold text-gray-500 xl:(text-2xs font-normal text-gray-400) whitespace-nowrap`
      : tw`text-xs font-semibold text-primary-600 xl:(text-2xs font-normal text-primary-500) whitespace-nowrap`,
  ]
)
