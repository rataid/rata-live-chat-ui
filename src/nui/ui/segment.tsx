import { SegmentWrapper } from './segment.style'

export type SectionProps = React.PropsWithChildren

// Page section

export default function Segment({ children }: SectionProps) {
  return <SegmentWrapper>{children}</SegmentWrapper>
}
