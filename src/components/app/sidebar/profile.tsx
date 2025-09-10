import { useResponsive } from 'ahooks'
import { useState } from 'react'

import { useAuth } from '@/components/auth'
import { useAppContext } from '@nui/layouts/app/provider'
import Avatar from '@nui/ui/avatar'
import Tooltip from '@nui/ui/tooltip'

import { AppSidebarProfileWrapper } from './profile.style'
import ProfileMobile from './profile/mobile'
import SidebarProfileTip from './profile/tip'

export default function AppSidebarProfile() {
  const { setIsMobileNav } = useAppContext()

  const [open, setOpen] = useState(false)
  const { userData } = useAuth()

  const { xl } = useResponsive()

  if (!xl) {
    return (
      <ProfileMobile
        onClose={() => {
          setIsMobileNav(false)
        }}
      />
    )
  }
  return (
    <AppSidebarProfileWrapper>
      <Tooltip
        content={
          <SidebarProfileTip
            onClose={() => {
              setOpen(false)
            }}
          />
        }
        placement="right-start"
        padding="none"
        open={open}
        onOpenChange={setOpen}
      >
        <button type="button" onClick={() => setOpen(!open)}>
          <Avatar src={userData?.avatar} placeholderName={userData?.fullname} />
        </button>
      </Tooltip>
    </AppSidebarProfileWrapper>
  )
}
