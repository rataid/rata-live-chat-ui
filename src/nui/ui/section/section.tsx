import {
  SectionCaption,
  SectionCaptionText,
  SectionHeader,
  SectionMain,
  SectionMore,
  SectionWrapper,
} from './section.style'
import { SectionProps } from './types'

export function Section({
  caption,
  more,
  spacing = 'md',
  margin = 'lg',
  children,
}: SectionProps) {
  const captionElement =
    typeof caption === 'string' ? (
      <SectionCaption>
        <SectionCaptionText>{caption}</SectionCaptionText>
      </SectionCaption>
    ) : (
      <SectionCaption>{caption}</SectionCaption>
    )

  return (
    <SectionWrapper margin={margin}>
      {(caption || more) && (
        <SectionHeader spacing={spacing}>
          {captionElement}
          {more && <SectionMore>{more}</SectionMore>}
        </SectionHeader>
      )}

      <SectionMain>{children}</SectionMain>
    </SectionWrapper>
  )
}
