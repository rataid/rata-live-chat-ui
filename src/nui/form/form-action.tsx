import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

type Justify = 'none' | 'start' | 'end' | 'center' | 'between' | 'around'

type FormActionProps = {
  justify?: Justify
}

export const FormAction = styled.div.attrs<FormActionProps>(({ justify = 'between' }) =>  {
    const justifyMap = {
      none: tw``,
      start: tw`justify-start`,
      end: tw`justify-end`,
      center: tw`justify-center`,
      between: tw`justify-between`,
      around: tw`justify-around`,
    }

    return { className: [tw`pt-6 flex w-full items-center`, justifyMap[justify]].filter(Boolean).join(' ') }
  })<FormActionProps>``
