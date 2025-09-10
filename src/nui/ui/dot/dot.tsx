import { DotLabel, DotSymbol, DotWrapper } from './dot.style'
import { DotProps } from './types'

export function Dot({
  size = 'sm',
  color = 'primary',
  hexColor,
  outline,
  children,
}: DotProps) {
  if (!children)
    return <DotSymbol size={size} color={color} hexColor={hexColor} />

  return (
    <DotWrapper>
      <DotSymbol
        outline={outline}
        size={size}
        color={color}
        hexColor={hexColor}
      />
      <DotLabel color={color} hexColor={hexColor}>
        {children}
      </DotLabel>
    </DotWrapper>
  )
}
