import tw, { TwStyle, styled } from 'twin.macro'

export type SpacerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const spaces: Record<SpacerSize, TwStyle> = {
  xs: tw`h-2`,
  sm: tw`h-4`,
  md: tw`h-6`,
  lg: tw`h-8`,
  xl: tw`h-12`,
}

export type SpacerProps = {
  size?: SpacerSize
}

const Spacer = styled.div(({ size = 'md' }: SpacerProps) => [
  tw`flex justify-center items-center w-full`,
  spaces[size],
])

export default Spacer
