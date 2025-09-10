import { Outlet } from 'react-router-dom'

import Page from '@nui/ui/page'

export function Layout() {
  return (
    <Page>
      <Outlet />
    </Page>
  )
}
