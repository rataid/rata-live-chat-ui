import { useResponsive } from 'ahooks'
import { useNavigate } from 'react-router-dom'

import Button from '@nui/ui/button'
import ButtonStack from '@nui/ui/button-stack'
import Icon from '@nui/ui/icon'

import { FormActionButtonWrapper } from './form-action-button.style'
import { FormActionButtonProps } from './types'

export function FormActionButton({
  type = 'submit',
  icon,
  label = 'Submit',
  disabled = false,
  danger = false,
  onSubmit,
  cancelType = 'button',
  cancelLabel = 'Cancel',
  cancelDisabled = false,
  hideCancel = false,
  onCancel,
  justify,
  buttonFullWidth,
  children,
}: FormActionButtonProps) {
  const { sm } = useResponsive()

  const navigate = useNavigate()

  const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onCancel) {
      onCancel(e)
    } else {
      navigate(-1)
    }
  }

  return (
    <FormActionButtonWrapper>
      <ButtonStack justify={sm && !buttonFullWidth ? justify : 'between'}>
        {!hideCancel && (
          <Button
            type={cancelType}
            variant={danger ? 'secondaryGray' : 'secondary'}
            wider={sm && !buttonFullWidth ? 'md' : 'full'}
            onClick={handleCancelClick}
            disabled={cancelDisabled}
          >
            {cancelLabel}
          </Button>
        )}
        <Button
          type={type}
          icon={icon && <Icon icon={icon} />}
          danger={danger}
          wider={sm && !buttonFullWidth ? 'lg' : 'full'}
          onClick={onSubmit}
          disabled={disabled}
        >
          {label}
        </Button>
        {!!children && children}
      </ButtonStack>
    </FormActionButtonWrapper>
  )
}
