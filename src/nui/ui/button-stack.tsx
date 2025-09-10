import tw, { styled } from 'twin.macro'

export type ButtonStackJustify =
  | 'none'
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'

type ButtonStackProps = {
  justify?: ButtonStackJustify
}

const ButtonStack = styled.div<ButtonStackProps>(({ justify = 'none' }) => {
  const justifyMap = {
    none: tw``,
    start: tw`justify-start`,
    end: tw`justify-end`,
    center: tw`justify-center`,
    between: tw`justify-between`,
    around: tw`justify-around`,
  }

  return [tw`w-full flex gap-x-3 items-center`, justifyMap[justify]]
})

export default ButtonStack
