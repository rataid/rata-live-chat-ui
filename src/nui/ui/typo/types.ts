import { colorMap, fontWeightMap, sizeMap } from './typo.style'

export type Color = keyof typeof colorMap

export type FontWeight = keyof typeof fontWeightMap

export type Size = keyof typeof sizeMap

export type TypoProps = {
  fontWeight?: FontWeight
  size?: Size
  color?: Color
  nowrap?: boolean
}
