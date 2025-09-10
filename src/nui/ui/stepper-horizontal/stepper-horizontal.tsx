import { useEffect, useState } from 'react'

import { key } from '@utils'

import Dot from '../dot'
import Icon from '../icon'
import {
  StepperHorizontalContent,
  StepperHorizontalLine,
  StepperHorizontalMain,
  StepperHorizontalStatus,
  StepperHorizontalWrapper,
} from './stepper-horizontal.style'
import { StepperHorizontalProps } from './types'

export function StepperHorizontal({ data, go, step }: StepperHorizontalProps) {
  const [state, setState] = useState(0)

  useEffect(() => {
    if (data.length === step) {
      setState(step)
    }
  }, [data, step])

  return (
    <StepperHorizontalWrapper>
      {data?.map((item) => (
        <StepperHorizontalContent
          onClick={() => go(item.value)}
          disabled={item.value >= state + 1}
          type="button"
          key={key(item)}
        >
          {item.value !== 1 && (
            <StepperHorizontalLine active={step >= item.value} />
          )}
          {item.value <= step ? (
            <div>
              {item.value === step ? (
                <StepperHorizontalMain step="current">
                  <StepperHorizontalStatus step="current">
                    <Dot color="white" />
                  </StepperHorizontalStatus>
                  {item.label}
                </StepperHorizontalMain>
              ) : (
                <StepperHorizontalMain step="done">
                  <StepperHorizontalStatus step="done">
                    <Icon icon="lucide-check" size="xs" />
                  </StepperHorizontalStatus>
                  {item.label}
                </StepperHorizontalMain>
              )}
            </div>
          ) : (
            <StepperHorizontalMain step="default">
              <StepperHorizontalStatus step="default" />
              {item.label}
            </StepperHorizontalMain>
          )}
        </StepperHorizontalContent>
      ))}
    </StepperHorizontalWrapper>
  )
}
