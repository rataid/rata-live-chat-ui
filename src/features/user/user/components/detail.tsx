import { useNavigate, useParams } from 'react-router-dom'

import useFormHelper from '@nui/hooks/use-form-helper'
import Avatar from '@nui/ui/avatar'
import Box from '@nui/ui/box'
import Drawer, { DrawerContent, DrawerHeading } from '@nui/ui/drawer'
import Field, { Fields } from '@nui/ui/field'
import Icon from '@nui/ui/icon'
import Typo from '@nui/ui/typo'

// import { User } from '@gql/graphql'
// import { userQuery } from '@models/user/user'

import { userArgs } from '../pages/list/detail.route'
import UserStatusBadge from './status-badge'

export default function UserDetail() {
  const { id } = useParams()

  const navigate = useNavigate()

  // const { data: user } = useFormHelper<User>({
  //   args: userArgs(id),
  //   query: userQuery,
  // })

  // if (!user) return null

  const user = {
    name: 'test',
    email: 'test@rata.id',
    phone: '00000',
    isActive: true,
    notes: 'heheh',
    userRoles: [{
      id: 'test',
        role: {
          title: 'test'
        }
    }]
  }
  const {
    name,
    email,
    phone,
    isActive,
    notes,

    userRoles,
  } = user

  const onOpenChange = () => {
    navigate('..')
  }

  return (
    <Drawer open onOpenChange={onOpenChange}>
      <DrawerContent drawerSize="sm" initialFocus={-1}>
        <DrawerHeading title="User Profile" />
        <Box flow="column" padding="none">
          <div className="flex justify-between items-start p-6 border-b border-gray-200">
            <div className="flex gap-x-3">
              <Avatar size="2xl" src="" alt="">
                <Icon icon="lucide-user" size="lg" />
              </Avatar>
              <div className="w-full flex flex-col gap-y-1 items-start">
                <Typo fontWeight="semibold" color="gray-900">
                  {name}
                </Typo>
                <Typo size="xs" color="gray-500">
                  {email}
                </Typo>
                <Typo size="xs" color="gray-500">
                  {phone}
                </Typo>
              </div>
            </div>
            <div className="flex flex-col items-end gap-y-1">
              <UserStatusBadge isActive={isActive} />
            </div>
          </div>
          <div className="flex flex-col gap-y-6 p-6">
            <Box noborder padding="none">
              <Fields>
                <Field label="Role">
                  <ol className="pl-4 pt-1">
                    {userRoles.map((role) => (
                      <li key={role.id} className="list-disc text-gray-500">
                        {role.role.title}
                      </li>
                    ))}
                  </ol>
                </Field>
              </Fields>
            </Box>
            <div className="border-b border-gray-200 h-1 w-full" />
            <Fields>
              <Field label="Notes">{notes ?? '-'}</Field>
            </Fields>
          </div>
        </Box>
      </DrawerContent>
    </Drawer>
  )
}
