import tw, { styled } from 'twin.macro'

import { ViewProps } from './types'

export const ViewWrapper = styled.div<Pick<ViewProps, 'show'>>(({ show }) => [
  show ? tw`block` : tw`hidden`,
])
