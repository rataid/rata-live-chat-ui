import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/components/auth'
import { Form } from '@nui/form'
import Avatar from '@nui/ui/avatar'
import Button from '@nui/ui/button'

import {
  ProfileEmail,
  ProfileMobileAction,
  ProfileMobileDetail,
  ProfileMobileProfile,
  ProfileMobileWrapper,
  ProfileName,
} from './mobile.style'

type ProfileMobileProps = {
  onClose?: () => void
}

export default function ProfileMobile({ onClose }: ProfileMobileProps) {
  const navigate = useNavigate()

  const { userData } = useAuth()

  return (
    <ProfileMobileWrapper>
      <ProfileMobileProfile>
        <Avatar placeholder="lucide-user" size="md" src={userData?.avatar} />
        <ProfileMobileDetail>
          <ProfileName>{userData?.fullname}</ProfileName>
          <ProfileEmail>{userData?.username}</ProfileEmail>
        </ProfileMobileDetail>
      </ProfileMobileProfile>
      <ProfileMobileAction>
        <Button
          variant="link"
          onClick={() => {
            if (onClose) {
              onClose()
            }
            navigate('/profile')
          }}
          icon="lucide:edit-2"
          size="sm"
        />
        <Form action="/logout">
          <Button
            type="submit"
            variant="linkGray"
            icon="lucide:log-out"
            size="sm"
            danger
          />
        </Form>
      </ProfileMobileAction>
    </ProfileMobileWrapper>
  )
}
