import { groupBy } from 'lodash'
import { Fragment } from 'react'
import { PartialDeep } from 'type-fest'

import Dot from '@nui/ui/dot'
import { key, titleCase } from '@utils'

import { Permission } from '@gql/graphql'

type RoleDetailPermissionGroupedListProps = {
  permissions: PartialDeep<Permission>[]
}

export default function RoleDetailPermissionGroupedList({
  permissions,
}: RoleDetailPermissionGroupedListProps) {
  const permissionGroupList = groupBy(permissions, (item) => {
    const parts = item?.action?.split('.') || []

    if (parts[parts.length - 2] === 'confirm') {
      parts.pop()
      parts.pop()
    } else {
      parts.pop()
    }

    return parts.join('.')
  })

  return (
    <div tw="flex flex-col gap-3">
      {Object.keys(permissionGroupList).map((groupKey) => (
        <div
          tw="grid grid-cols-2 gap-2 pb-3 border-b last:border-b-0 border-gray-200"
          key={key(groupKey)}
        >
          {permissionGroupList[groupKey].map((item) => {
            const parts = item?.action?.split('.') || []

            return (
              <div
                tw="flex items-center gap-x-2 text-sm text-gray-500"
                key={key(item.id)}
              >
                <Dot size="xs" color="gray" />
                {parts.map((part, index) => {
                  return (
                    <Fragment key={key(`key-${part}`)}>
                      {index > 0 && ' '}
                      <span>{titleCase(part)}</span>
                    </Fragment>
                  )
                })}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
