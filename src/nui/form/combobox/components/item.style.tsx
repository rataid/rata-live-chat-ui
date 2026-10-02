import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export const ComboboxItemWrapper = styled.div.attrs(() => ({ className: [tw`pl-3 py-2 text-left hover:bg-gray-50 hover:bg-opacity-80`].filter(Boolean).join(' ') }))``
