import tw, { TwStyle, styled } from 'twin.macro'

export type BoxPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type BoxRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export type BoxFlow = 'row' | 'column'

export type BoxAlign = 'none' | 'center' | 'start' | 'end'

export type BoxProps = {
  fit?: boolean
  flow?: BoxFlow
  align?: BoxAlign
  padding?: BoxPadding
  rounded?: BoxRounded
  noborder?: boolean
  background?: boolean
  divide?: boolean
}

const flowMap: Record<BoxFlow, TwStyle> = {
  row: tw`flex`,
  column: tw`flex-col`,
}

const alignMap: Record<BoxAlign, TwStyle> = {
  none: tw``,
  center: tw`items-center`,
  start: tw`items-start`,
  end: tw`items-end`,
}

const paddingMap: Record<BoxPadding, TwStyle> = {
  none: tw`p-0`,
  xs: tw`p-2`,
  sm: tw`p-3`,
  md: tw`p-4`,
  lg: tw`p-6`,
  xl: tw`p-8`,
  '2xl': tw`p-10`,
}

const roundedMap: Record<BoxRounded, TwStyle> = {
  none: tw`rounded-none`,
  sm: tw`rounded-sm`,
  md: tw`rounded`,
  lg: tw`rounded-lg`,
  xl: tw`rounded-xl`,
}

const Box = styled.div<BoxProps>(
  ({
    fit = false,
    flow = 'row',
    align = 'none',
    padding = 'md',
    rounded = 'lg',
    noborder = false,
    background = false,
    divide = false,
  }) => [
    !noborder && tw`border border-gray-200`,
    divide && tw`divide-y divide-gray-200`,
    fit ? tw`w-fit` : tw`w-full`,
    background && tw`bg-white`,
    flowMap[flow],
    alignMap[align],
    paddingMap[padding],
    roundedMap[rounded],
  ]
)

export default Box
