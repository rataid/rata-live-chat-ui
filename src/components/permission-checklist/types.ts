import { InputPropsWithoutRef } from '@nui/types'

import { Permission } from '@gql/graphql'

export type PermissionChecklistItem = {
  id?: string
  permissionId: string
}

export type PermissionChecklistChoice = Permission

export type PermissionChecklistState =
  | {
      parsedValue: string
      items: PermissionChecklistItem[]
    }
  | null
  | undefined

export type PermissionChecklistAction = {
  syncParsedValue: () => void
  checked: (permission: Permission) => boolean
  setItems: (permissions: Permission[]) => void
  toggleAll: (permissions: Permission[]) => void
  toggle: (permission: Permission) => void
}

// Provider
export type PermissionChecklistProviderProps = {
  defaultItems?: any
} & React.PropsWithChildren

// Components
export type PermissionChecklistValueProps = InputPropsWithoutRef

export type PermissionChecklistProps = InputPropsWithoutRef
