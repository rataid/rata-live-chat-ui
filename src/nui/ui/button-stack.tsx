import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

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

const ButtonStack = styled.div.attrs<ButtonStackProps>(({ justify = 'none' }) =>  {
  const justifyMap = {
    none: tw``,
    start: tw`justify-start`,
    end: tw`justify-end`,
    center: tw`justify-center`,
    between: tw`justify-between`,
    around: tw`justify-around`,
  }

  return { className: [tw`w-full flex gap-x-3 items-center`, justifyMap[justify]].filter(Boolean).join(' ') }
})<ButtonStackProps>``

export default ButtonStack
