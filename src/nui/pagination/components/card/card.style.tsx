/* eslint-disable import/no-cycle */
import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

// add this to prevent build error
export const Test = styled.div.attrs({ className: tw`text-sm` })``
