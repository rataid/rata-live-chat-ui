import { Fragment } from 'react'

import Icon from '@nui/ui/icon'

import Markdown from '../markdown'
import {
  FieldContent,
  FieldIcon,
  FieldLabel,
  FieldWrapper,
} from './field.style'
import { FieldProps } from './types'

export function Field({
  label = '',
  icon,
  fontWeight = 'semibold',
  inline = false,
  enableMarkdown = false,
  fit = false,
  children,
}: FieldProps) {
  const iconNode =
    typeof icon === 'string' ? <Icon icon={icon} size="sm" /> : icon

  const Component = !inline ? 'div' : Fragment

  return (
    <FieldWrapper className="nui-field" fit={fit}>
      {iconNode ? (
        <div>
          <FieldIcon>{iconNode}</FieldIcon>
        </div>
      ) : null}
      {label && (
        <Component>
          <FieldLabel fontWeight={fontWeight}>{label}</FieldLabel>
          <FieldContent inline={inline}>
            {enableMarkdown ? <Markdown>{children}</Markdown> : children}
          </FieldContent>
        </Component>
      )}
      {!label && (
        <FieldContent inline={inline}>
          {enableMarkdown ? <Markdown>{children}</Markdown> : children}
        </FieldContent>
      )}
    </FieldWrapper>
  )
}
