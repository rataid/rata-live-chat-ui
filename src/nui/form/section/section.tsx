import {
  FormSectionCaption,
  FormSectionCaptionText,
  FormSectionHeader,
  FormSectionMain,
  FormSectionMore,
  FormSectionWrapper,
} from './section.style'
import { FormSectionProps } from './types'

export function FormSection({
  caption,
  more,
  gap,
  spacingHead,
  children,
}: FormSectionProps) {
  const captionElement =
    typeof caption === 'string' ? (
      <FormSectionCaption>
        <FormSectionCaptionText>{caption}</FormSectionCaptionText>
      </FormSectionCaption>
    ) : (
      <FormSectionCaption>{caption}</FormSectionCaption>
    )

  return (
    <FormSectionWrapper>
      {(caption || more) && (
        <FormSectionHeader spacingHead={spacingHead}>
          {captionElement}
          {more && <FormSectionMore>{more}</FormSectionMore>}
        </FormSectionHeader>
      )}

      <FormSectionMain gap={gap}>{children}</FormSectionMain>
    </FormSectionWrapper>
  )
}
