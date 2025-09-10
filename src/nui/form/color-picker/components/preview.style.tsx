import tw, { css, styled } from 'twin.macro'
import { shallow } from 'zustand/shallow'

import { useColorPicker } from '../hooks'

export const ColorPickerPreviewWrapper = tw.div``

export const ColorPickerPreviewPlaceholder = styled.div(() => {
  const [color] = useColorPicker((s) => [s.color], shallow)
  return [
    tw`w-10 h-10 rounded-lg`,
    css`
      background-color: ${color};
    `,
  ]
})
