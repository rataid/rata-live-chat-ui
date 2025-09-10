import Crumbs from './crumbs'
import { TopbarMain, TopbarPortal, TopbarWrapper } from './topbar.style'

export default function Topbar() {
  return (
    <TopbarWrapper>
      <TopbarMain>
        <Crumbs />
      </TopbarMain>
      <TopbarPortal id="topbarPortal" />
    </TopbarWrapper>
  )
}
