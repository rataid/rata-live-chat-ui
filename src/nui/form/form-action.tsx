import tw, { styled } from 'twin.macro'

type Justify = 'none' | 'start' | 'end' | 'center' | 'between' | 'around'

type FormActionProps = {
  justify?: Justify
}

export const FormAction = styled.div<FormActionProps>(
  ({ justify = 'between' }) => {
    const justifyMap = {
      none: tw``,
      start: tw`justify-start`,
      end: tw`justify-end`,
      center: tw`justify-center`,
      between: tw`justify-between`,
      around: tw`justify-around`,
    }

    return [tw`pt-6 flex w-full items-center`, justifyMap[justify]]
  }
)
