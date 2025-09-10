import { BlankLayoutProps } from '../types'
import { BlankLayoutContainer, BlankLayoutWrapper } from './blank.style'

export function BlankLayout({
  middle = true,
  background = 'gray',
  children,
}: BlankLayoutProps) {
  return (
    <BlankLayoutWrapper background={background}>
      <BlankLayoutContainer middle={middle}>{children}</BlankLayoutContainer>
    </BlankLayoutWrapper>
  )
}
