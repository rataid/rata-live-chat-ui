import { useNavigate, useParams } from 'react-router-dom'

import useFormHelper from '@nui/hooks/use-form-helper'
import Box from '@nui/ui/box'
import Drawer, { DrawerContent, DrawerHeading } from '@nui/ui/drawer'

import { Role } from '@gql/graphql'
import { roleQuery } from '@models/role/role'

import { roleArgs } from '../pages/list/detail.route'
import RoleDetailInfo from './detail/info'
import RoleDetailPermissionList from './detail/permission-list'

export default function RoleDetail() {
  const { id } = useParams()

  const navigate = useNavigate()

  const { data: role } = useFormHelper<Role>({
    args: roleArgs(id),
    query: roleQuery,
  })

  if (!role) return null

  const { permissions, title, abbr } = role

  const onOpenChange = () => {
    navigate('..')
  }

  return (
    <Drawer open onOpenChange={onOpenChange}>
      <DrawerContent drawerSize="lg" initialFocus={-1}>
        <DrawerHeading title="Role" />
        <Box flow="column" padding="lg">
          <RoleDetailInfo title={title} abbr={abbr} />
          <RoleDetailPermissionList permissions={permissions} />
        </Box>
      </DrawerContent>
    </Drawer>
  )
}
