import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { PaginationState } from '@nui/pagination'

type ListState = {
  name: string
  state: Pick<
    PaginationState,
    'args' | 'arrArgs' | 'currentPage' | 'searchQuery' | 'perPage'
  >
}

type State = {
  lists: ListState[]
}

type Actions = {
  setListState: ({ name, state }: ListState) => void
  getListState: (name: string) => ListState | undefined
}

export const useListStore = create<State & Actions>()(
  immer((set, get) => ({
    lists: [],
    setListState: ({ name, state }) => {
      set((s) => {
        const index = s.lists.findIndex((list) => list.name === name)
        if (index === -1) {
          s.lists.push({ name, state })
        } else {
          s.lists[index].state = state
        }
      })
    },
    getListState: (name) => get().lists.find((list) => list.name === name),
  }))
)
