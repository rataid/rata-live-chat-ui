export type StepperHorizontalValueProps = {
  label: string
  value: number
}

export type StepperHorizontalProps = {
  data: StepperHorizontalValueProps[]
  go: (step: number) => void
  step: number
}

export type Step = 'default' | 'current' | 'done'

export type StepperHorizontalStyleProps = {
  step?: Step
  active?: boolean
}
