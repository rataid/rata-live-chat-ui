import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

import { ViewProps } from './types'

export const ViewWrapper = styled.div.attrs<Pick<ViewProps, 'show'>>(({ show }) => ({ className: [show ? tw`block` : tw`hidden`].filter(Boolean).join(' ') }))<Pick<ViewProps, 'show'>>``
