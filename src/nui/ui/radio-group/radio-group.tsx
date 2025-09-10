import { RadioGroupTitle, RadioGroupWrapper } from './radio-group.style'
import { RadioGroupProps } from './types'

export function RadioGroup({ title, flow = 'row', children }: RadioGroupProps) {
  return (
    <RadioGroupWrapper flow={flow}>
      {title && <RadioGroupTitle>{title}</RadioGroupTitle>}
      {children}
    </RadioGroupWrapper>
  )
}
