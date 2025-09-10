export type StepperPhase = 'default' | 'done' | 'current'

export type StepperPosition = 'top' | 'middle' | 'bottom'

export type StepperProps = {
  contentTooltip?: React.ReactNode
  phase?: StepperPhase
  icon?: React.ReactNode
  position?: StepperPosition
}
