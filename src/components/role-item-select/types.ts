import { InputPropsWithoutRef } from '@nui/types'

import { Role } from '@gql/graphql'

// Store
export type RoleItemSelectOption = Role

export type RoleItemSelectItem = {
  id?: string
  role: Role
}

export type RoleItemSelectState =
  | {
      query: string
      parsedValue: string
      items: RoleItemSelectItem[]
    }
  | null
  | undefined

export type RoleItemSelectAction = {
  setQuery: (searchQuery: string) => void
  syncParsedValue: () => void
  setItems: (items: RoleItemSelectItem[]) => void
  addItem: (role: Role) => void
  removeItem: (roleId: string) => void
}

// Provider
export type RoleItemSelectProviderProps = React.PropsWithChildren

// Components
export type RoleItemSelectValueProps = {
  defaultItems?: any
} & InputPropsWithoutRef

export type RoleItemSelectProps = {
  portalId?: string
} & RoleItemSelectValueProps

export type RoleItemSelectedItemProps = {
  item: Role
}
