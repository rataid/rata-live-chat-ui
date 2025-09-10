import { ViewProps } from './types'
import { ViewWrapper } from './view.style'

export function View({ show = true, children }: ViewProps) {
  return <ViewWrapper show={show}>{children}</ViewWrapper>
}
