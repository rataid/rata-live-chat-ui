import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/components/auth'
import { Form } from '@nui/form'
import Avatar from '@nui/ui/avatar'
import Button from '@nui/ui/button'
import Spacer from '@nui/ui/spacer'

import {
  SidebarProfileTipAction,
  SidebarProfileTipAvatar,
  SidebarProfileTipEmail,
  SidebarProfileTipUser,
  SidebarProfileTipUserDetail,
  SidebarProfileTipUsername,
  SidebarProfileTipWrapper,
} from './tip.style'

type SidebarProfileTipProps = {
  onClose?: () => void
}

export default function SidebarProfileTip({ onClose }: SidebarProfileTipProps) {
  const navigate = useNavigate()
  const { userData } = useAuth()

  return (
    <SidebarProfileTipWrapper>
      <SidebarProfileTipUser>
        <SidebarProfileTipAvatar>
          <Avatar placeholder="lucide-user" size="4xl" src={userData?.avatar} />
        </SidebarProfileTipAvatar>
        <SidebarProfileTipUserDetail>
          <SidebarProfileTipUsername>
            {userData?.fullname}
          </SidebarProfileTipUsername>
          <SidebarProfileTipEmail>{userData?.username}</SidebarProfileTipEmail>
        </SidebarProfileTipUserDetail>
      </SidebarProfileTipUser>
      <Spacer />
      <SidebarProfileTipAction>
        <Button
          variant="linkGray"
          onClick={() => {
            if (onClose) {
              onClose()
            }
            navigate('/profile')
          }}
          icon="lucide:edit-2"
          size="sm"
        >
          My Profile
        </Button>
        <Form action="/logout">
          <Button
            type="submit"
            variant="linkGray"
            icon="lucide:log-out"
            size="sm"
            danger
          >
            Logout
          </Button>
        </Form>
      </SidebarProfileTipAction>
    </SidebarProfileTipWrapper>
  )
}
