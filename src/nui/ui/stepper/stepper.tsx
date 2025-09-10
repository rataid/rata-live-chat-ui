import Tooltip from '../tooltip'
import {
  BoxIcon,
  LineBottom,
  LineTop,
  StepperContent,
  StepperMain,
  StepperWrapper,
} from './stepper.style'
import { StepperProps } from './types'

export function Stepper({
  phase: status = 'default',
  icon = false,
  contentTooltip,
  position = 'middle',
}: StepperProps) {
  const setIcon = status === 'done' ? icon : null

  return (
    <StepperWrapper>
      <LineTop phase={status} position={position} />
      <LineBottom phase={status} position={position} />
      <StepperContent position={position}>
        <Tooltip content={contentTooltip}>
          <StepperMain phase={status}>
            <BoxIcon phase={status}>{setIcon}</BoxIcon>
          </StepperMain>
        </Tooltip>
      </StepperContent>
    </StepperWrapper>
  )
}
