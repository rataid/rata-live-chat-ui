import { useQuery } from '@tanstack/react-query'
import { groupBy } from 'lodash'
import { useMemo } from 'react'
import { shallow } from 'zustand/shallow'

import Checkbox from '@nui/ui/checkbox'
import Item from '@nui/ui/item'
import Section from '@nui/ui/section'
import Stack from '@nui/ui/stack'
import Typo from '@nui/ui/typo'
import { key, titleCase } from '@utils'

import { SortOrder } from '@gql/graphql'
import { allPermissionsQuery } from '@models/permission/permission'

import { usePermissionChecklist } from '../hooks'
import { PermissionChecklistChoice } from '../types'
import { PermissionChecklistItemsChild } from './items-child'

export const permissionDefinedSort: Record<string, number> = {
  dashboard: 0,
  user: 13,
}

export function PermissionChecklistItems() {
  const [items, toggleAll] = usePermissionChecklist(
    (s) => [s.items, s.toggleAll],
    shallow
  )

  const args = {
    first: 250,
    orderBy: [{ createdAt: SortOrder.Asc }],
    where: {},
  }

  const { data } = useQuery({
    ...allPermissionsQuery(args),
    keepPreviousData: true,
  })

  const filteredChoices = useMemo(
    () => (data as PermissionChecklistChoice[]) || [],
    [data]
  )

  const filteredItems = useMemo(() => items, [items])

  const permissionList = useMemo(() => filteredChoices, [filteredChoices])

  const permissionGroupList = groupBy(permissionList, 'group')

  const permissionGroupListKey = Object.keys(permissionGroupList)

  permissionGroupListKey.sort((a: string, b: string) => {
    return permissionDefinedSort[a] - permissionDefinedSort[b]
  })

  return (
    <div tw="my-3">
      <Section>
        <Stack>
          <Item basis="20%">
            <Typo fontWeight="semibold" color="gray-900">
              APP
            </Typo>
          </Item>
          <Item basis="80%">
            <Checkbox
              checked={filteredItems.length === permissionList.length}
              onChange={(e) => {
                toggleAll(e?.target.checked ? permissionList : [])
              }}
            >
              All Feature
            </Checkbox>
          </Item>
        </Stack>
      </Section>
      {permissionGroupListKey.map((groupKey) => (
        <Section
          key={key(groupKey)}
          spacing="sm"
          caption={
            <Typo fontWeight="semibold" color="gray-900">
              {titleCase(groupKey)}
            </Typo>
          }
        >
          <PermissionChecklistItemsChild
            permissionList={permissionGroupList[groupKey]}
          />
        </Section>
      ))}
    </div>
  )
}
