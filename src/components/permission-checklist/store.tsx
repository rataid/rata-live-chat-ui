import { map } from 'lodash'
import { createStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { Permission } from '@gql/graphql'

import {
  PermissionChecklistAction,
  PermissionChecklistChoice,
  PermissionChecklistItem,
  PermissionChecklistState,
} from './types'

export type PermissionChecklistStore = ReturnType<
  typeof permissionItemSelectStore
>

const parseItems = (items: PermissionChecklistItem[]) => {
  return JSON.stringify(
    items.map((item) => ({
      permissionId: item.permissionId,
    }))
  )
}

const mapItems = (items: PermissionChecklistChoice[]) => {
  return map(items, (item) => ({
    permissionId: item.id,
  }))
}

const permissionItemSelectStore = (
  defaultItems?: PermissionChecklistChoice[] | null
) => {
  const DEFAULT_PROPS: PermissionChecklistState = {
    parsedValue: parseItems(mapItems(defaultItems ?? [])),
    items: mapItems(defaultItems ?? []),
  }

  return createStore<PermissionChecklistState & PermissionChecklistAction>()(
    immer<PermissionChecklistState & PermissionChecklistAction>((set, get) => ({
      parsedValue: DEFAULT_PROPS.parsedValue,
      items: DEFAULT_PROPS.items,
      syncParsedValue: () =>
        set((s) => {
          s.parsedValue = parseItems(s.items)
        }),
      checked: (permission) => {
        return get().items.some((item) => item.permissionId === permission.id)
      },
      setItems: (permissions: Permission[]) => {
        set((s) => {
          s.items = mapItems(permissions)
        })
        get().syncParsedValue()
      },
      toggleAll: (permissions: Permission[]) => {
        set((s) => {
          s.items = mapItems(permissions)
        })
        get().syncParsedValue()
      },
      toggle: (permission: Permission) => {
        set((s) => {
          if (s.items.some((item) => item.permissionId === permission.id)) {
            s.items = s.items.filter(
              (item) => item.permissionId !== permission.id
            )
          } else {
            s.items.push({
              permissionId: permission.id,
            })
          }
        })
        get().syncParsedValue()
      },
    }))
  )
}

export default permissionItemSelectStore
