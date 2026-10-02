import styled, { css } from 'styled-components'
import { tw } from '@nui/utils/tw'
import { shallow } from 'zustand/shallow'

import { useColorPicker } from '../hooks'

export const ColorPickerPreviewWrapper = styled.div.attrs({ className: tw`` })``

export const ColorPickerPreviewPlaceholder = styled.div.attrs(() => ({
  className: tw`w-10 h-10 rounded-lg`,
}))`
  ${() => {
    const [color] = useColorPicker((s) => [s.color], shallow)

    return css`
      background-color: ${color};
    `
  }}
`
