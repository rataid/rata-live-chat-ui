import { createStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import {
  RoleItemSelectAction,
  RoleItemSelectItem,
  RoleItemSelectState,
} from './types'

export type RoleItemSelectStore = ReturnType<typeof roleItemSelectStore>

const parseItems = (items: RoleItemSelectItem[]) => {
  return JSON.stringify(
    items.map((item) => ({
      id: item?.id,
      roleId: item.role.id,
    }))
  )
}

const roleItemSelectStore = () => {
  const DEFAULT_PROPS: RoleItemSelectState = {
    query: '',
    parsedValue: parseItems([]),
    items: [],
  }

  return createStore<RoleItemSelectState & RoleItemSelectAction>()(
    immer<RoleItemSelectState & RoleItemSelectAction>((set, get) => ({
      query: DEFAULT_PROPS.query,
      parsedValue: DEFAULT_PROPS.parsedValue,
      items: DEFAULT_PROPS.items,
      setQuery: (searchQuery) =>
        set((s) => {
          s.query = searchQuery
        }),
      syncParsedValue: () =>
        set((s) => {
          s.parsedValue = parseItems(s.items)
        }),
      setItems: (items) => {
        set((s) => {
          s.items = items
        })
        get().syncParsedValue()
      },
      addItem: (item) => {
        set((s) => {
          s.items = [...s.items, { id: undefined, role: item }]
          s.query = ''
        })
        get().syncParsedValue()
      },
      removeItem: (roleId) => {
        set((s) => {
          s.items = s.items.filter((row) => row.role.id !== roleId)
        })
        get().syncParsedValue()
      },
    }))
  )
}

export default roleItemSelectStore
