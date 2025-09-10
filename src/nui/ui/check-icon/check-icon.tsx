import { CheckIconMain, CheckIconWrapper } from './check-icon.style'
import { CheckIconProps } from './types'

export function CheckIcon({
  size = 'md',
  variant = 'primary',
  icon = '',
}: CheckIconProps) {
  return (
    <CheckIconWrapper size={size} variant={variant}>
      {!icon ? (
        <CheckIconMain size={size} fill="currentColor" viewBox="0 0 13 11">
          <path
            fillRule="evenodd"
            d="M11.096.39 3.936 7.3l-1.9-2.03c-.35-.33-.9-.35-1.3-.07-.39.29-.5.8-.26 1.21l2.25 3.66c.22.34.6.55 1.03.55.41 0 .8-.21 1.02-.55.36-.47 7.23-8.66 7.23-8.66.9-.92-.19-1.73-.91-1.03v.01Z"
            clipRule="evenodd"
          />
        </CheckIconMain>
      ) : (
        icon
      )}
    </CheckIconWrapper>
  )
}
