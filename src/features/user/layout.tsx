import { Outlet } from 'react-router-dom'

import Page from '@nui/ui/page'

import Nav from './nav'

export function Layout() {
  return (
    <Page nav={Nav}>
      <Outlet />
    </Page>
  )
}
