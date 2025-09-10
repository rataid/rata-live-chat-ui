import Topbar from '@nui/ui/topbar'

import Scrollbar from '../scrollbar'
import {
  PageAside,
  PageAsideMain,
  PageInner,
  PageMain,
  PageTop,
  PageWrapper,
} from './page.style'
import { PageProps } from './types'

export function Page({ nav, children }: PageProps) {
  const hasSidenav = !!nav

  return (
    <PageWrapper>
      <>
        {hasSidenav && (
          <PageAside>
            <Scrollbar positionTrack="0" maxHeight="100%">
              <PageAsideMain>{nav()}</PageAsideMain>
            </Scrollbar>
          </PageAside>
        )}
        <PageInner hasSidenav={hasSidenav}>
          <PageTop>
            <Topbar />
          </PageTop>
          <PageMain>{children}</PageMain>
        </PageInner>
      </>
    </PageWrapper>
  )
}
