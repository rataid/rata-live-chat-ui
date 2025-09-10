import tw, { styled } from 'twin.macro'

type DeleteConfirmWrapperProps = {
  inline?: boolean
}

export const DeleteConfirmWrapper = styled.div<DeleteConfirmWrapperProps>(
  ({ inline }) => [
    inline
      ? tw`items-center justify-between gap-x-4 `
      : tw`gap-y-4 flex-col items-end justify-end`,
    tw`py-2 px-3 flex text-sm text-start xl:min-w-max`,
  ]
)

export const DeleteConfirmMessage = tw.p``

export const DeleteConfirmAction = tw.div``
