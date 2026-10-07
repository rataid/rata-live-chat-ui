import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

type DeleteConfirmWrapperProps = {
  inline?: boolean
}

export const DeleteConfirmWrapper = styled.div.attrs<DeleteConfirmWrapperProps>(({ inline }) => ({ className: [inline
      ? tw`items-center justify-between gap-x-4 `
      : tw`gap-y-4 flex-col items-end justify-end`, tw`py-2 px-3 flex text-sm text-start xl:min-w-max`].filter(Boolean).join(' ') }))<DeleteConfirmWrapperProps>``

export const DeleteConfirmMessage = styled.p.attrs({ className: tw`` })``

export const DeleteConfirmAction = styled.div.attrs({ className: tw`` })``
