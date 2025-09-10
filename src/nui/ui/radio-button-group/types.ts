import { InputPropsWithoutRef } from '@nui/types'

import { ButtonSize } from '../button'

export type RadioButtonGroupProps = {
  sizeButton?: ButtonSize
  trueCaption?: string
  falseCaption?: string
} & InputPropsWithoutRef

export type RadioButtonGroupActionProps = {
  isActive?: boolean
}
