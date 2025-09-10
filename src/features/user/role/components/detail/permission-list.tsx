import { groupBy } from 'lodash'
import { PartialDeep } from 'type-fest'

import { permissionDefinedSort } from '@/components/permission-checklist'
import Section from '@nui/ui/section'
import Typo from '@nui/ui/typo'
import { key, titleCase } from '@utils'

import { Permission } from '@gql/graphql'

import RoleDetailPermissionGroupedList from './permission-grouped-list'

type RoleDetailPermissionListProps = {
  permissions: PartialDeep<Permission>[]
}

export default function RoleDetailPermissionList({
  permissions,
}: RoleDetailPermissionListProps) {
  const permissionGroupList = groupBy(permissions, 'group')

  const permissionGroupListKey = Object.keys(permissionGroupList)

  permissionGroupListKey.sort((a: string, b: string) => {
    return permissionDefinedSort[a] - permissionDefinedSort[b]
  })

  return (
    <div tw="flex flex-col gap-y-8 first:gap-y-6">
      <Typo color="gray-900" fontWeight="semibold">
        PERMISSIONS
      </Typo>
      {permissionGroupListKey.map((groupKey) => (
        <Section
          key={key(groupKey)}
          spacing="xs"
          margin="none"
          caption={
            <Typo fontWeight="semibold" color="gray-900">
              {titleCase(groupKey)}
            </Typo>
          }
        >
          <RoleDetailPermissionGroupedList
            permissions={permissionGroupList[groupKey]}
          />
        </Section>
      ))}
    </div>
  )
}
