import { HexColorPicker } from 'react-colorful'

import { useColorPicker } from '../hooks'

export default function ColorPickerPicker() {
  const [color, setColor] = useColorPicker((s) => [s.color, s.setColor])

  const onChange = (newColor: string) => {
    setColor(newColor)
  }

  return <HexColorPicker color={color} onChange={onChange} />
}
