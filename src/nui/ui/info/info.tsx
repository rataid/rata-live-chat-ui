import FeaturedIcon from '../featured-icon'
import { InfoDescription, InfoMain, InfoTitle, InfoWrapper } from './info.style'
import { InfoProps } from './types'

export function Info({
  icon = 'lucide-alert-triangle',
  title,
  variant = 'warning',
  borderColor = 'gray',
  borderVariant = 'dashed',
  noBorder = false,
  sizeIcon = 'xs',
  children,
}: InfoProps) {
  return (
    <InfoWrapper
      hideTitle={!title}
      noBorder={noBorder}
      borderColor={borderColor}
      borderVariant={borderVariant}
    >
      <FeaturedIcon
        rounded="full"
        size={sizeIcon}
        variant={variant}
        icon={icon}
      />
      <InfoMain>
        {title && <InfoTitle>{title}</InfoTitle>}
        <InfoDescription>{children}</InfoDescription>
      </InfoMain>
    </InfoWrapper>
  )
}
