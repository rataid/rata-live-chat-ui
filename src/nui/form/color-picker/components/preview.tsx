import { shallow } from 'zustand/shallow'

import Tooltip from '@nui/ui/tooltip'

import { useColorPicker } from '../hooks'
import ColorPickerPicker from './picker'
import {
  ColorPickerPreviewPlaceholder,
  ColorPickerPreviewWrapper,
} from './preview.style'

export function ColorPickerPreview() {
  const [showPicker, toggleShowPicker] = useColorPicker(
    (s) => [s.showPicker, s.toggleShowPicker],
    shallow
  )

  const onClick = () => {
    toggleShowPicker()
  }

  return (
    <ColorPickerPreviewWrapper>
      <Tooltip
        content={<ColorPickerPicker />}
        open={showPicker}
        onOpenChange={() => toggleShowPicker()}
      >
        <ColorPickerPreviewPlaceholder onClick={onClick} />
      </Tooltip>
    </ColorPickerPreviewWrapper>
  )
}
