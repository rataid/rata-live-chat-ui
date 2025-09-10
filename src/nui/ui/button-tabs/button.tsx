import { ButtonButton, ButtonMain, ButtonNav } from './button.style'
import { ButtonTabsItems } from './types'

export function Button({
  link,
  name,
  isButton = false,
  isActive: isActiveButton,
  onClick,
  fit,
  children,
}: ButtonTabsItems) {
  return !isButton ? (
    <ButtonNav fit={fit} to={link ?? ''} end>
      {(isActive) => (
        <ButtonMain isActive={isActive.isActive}>{name}</ButtonMain>
      )}
    </ButtonNav>
  ) : (
    <ButtonButton fit={fit} type="button" onClick={onClick}>
      <ButtonMain isActive={isActiveButton}>{children}</ButtonMain>
    </ButtonButton>
  )
}
