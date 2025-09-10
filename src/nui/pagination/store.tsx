import { assign, set as objectSet, some } from 'lodash'
import { createStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { PAGINATION_INITIAL_STATE } from './config'
import { PaginationAction, PaginationProps, PaginationState } from './types'

export type PaginationStore = ReturnType<typeof paginationStore>

const paginationStore = ({ initArgs: initialArgs = {} }: PaginationProps) => {
  const DEFAULT_STATE = { ...PAGINATION_INITIAL_STATE, initArgs: initialArgs }

  // args?: any
  // arrArgs: any[]
  // filter: any
  // currentPage: number
  // searchQuery: string
  // perPage: number
  // selectedRows: any[]
  // isSelectedAll: boolean
  // data: any
  // isLoading: boolean
  // isFetching: boolean

  return createStore<PaginationState & PaginationAction>()(
    immer<PaginationState & PaginationAction>((set, get) => ({
      ...DEFAULT_STATE,
      name: '',
      filter: {},
      selectedRows: [],
      isSelectedAll: false,
      selectedId: '',
      data: null,
      isLoading: false,
      isFetching: false,

      setName: (name) =>
        set((s) => {
          s.name = name
        }),
      // Set initial args on first render
      setInitArgs: (args) => {
        set((s) => {
          s.initArgs = args
        })
        get().reset({ ...args })
      },

      setInitState: (newState) => {
        set((s) => {
          s.args = newState.args
          s.arrArgs = newState.arrArgs
          s.currentPage = newState.currentPage
          s.searchQuery = newState.searchQuery
          s.perPage = newState.perPage
        })
      },

      // Reset
      reset: (args) =>
        set((s) => {
          s.args = args
          s.arrArgs = [args]
          s.perPage = args?.first ?? 10
          s.currentPage = 1
          s.searchQuery = ''
        }),

      setArgs: (args) =>
        set((s) => {
          assign(args, { first: s.perPage })

          if (s.currentPage === 1) {
            s.args = { ...args }
            s.arrArgs = [s.args]
          } else {
            s.args = s.arrArgs[s.currentPage - 1]
          }
        }),

      rebuildArgs: () => {
        set((s) => {
          const { initArgs, perPage, searchQuery, filter } = s
          const newArgs = { ...initArgs }

          assign(newArgs, { first: perPage })

          if (searchQuery !== '') {
            const filterWhere =
              searchQuery !== '' ? filter(searchQuery).where : {}

            objectSet(newArgs, 'where', {
              ...(newArgs?.where ?? {}),
              ...filterWhere,
            })

            if (filter(searchQuery).query) {
              assign(newArgs, { query: filter(searchQuery).query })
            }
          }

          s.args = newArgs
          s.arrArgs = [s.args]
        })
      },

      setFilter: (filterFn) =>
        set((s) => {
          s.filter = filterFn
        }),

      setCurrentPage: (currentPage) => {
        set((s) => {
          s.currentPage = currentPage
          s.args = s.arrArgs[s.currentPage - 1]
        })
      },

      setPerPage: (perPage) => {
        set((s) => {
          s.perPage = perPage
          s.currentPage = 1
        })

        get().rebuildArgs()
      },

      setSearchQuery: (searchQuery) => {
        set((s) => {
          s.searchQuery = searchQuery
          s.currentPage = 1
        })

        get().rebuildArgs()
      },

      prev: () => {
        set((s) => {
          if (s.isFetching) {
            return
          }

          if (s.currentPage > 1 && s.data?.pageInfo?.hasPreviousPage) {
            s.currentPage -= 1
            s.args = s.arrArgs[s.currentPage - 1]
          }
        })
      },

      next: () => {
        set((s) => {
          if (s.isFetching) {
            return
          }

          if (!s.data?.pageInfo?.hasNextPage) return

          s.currentPage += 1
          s.args = s.arrArgs[s.currentPage - 1]
        })
      },

      toggleSelect: (row) =>
        set((s) => {
          const isSelected = get().isSelected(row)

          // Use original key if row is from tanstack table
          // Otherwise use row itself
          const selectedItem = row.original ?? row

          if (isSelected) {
            s.selectedRows = s.selectedRows.filter(
              (selectedRow) => selectedRow.id !== selectedItem.id
            )
          } else {
            s.selectedRows.push(selectedItem)
          }
        }),

      selected: (row: any) =>
        set((s) => {
          const selectedItem = row.original ?? row

          s.selectedId = selectedItem.id
        }),

      selectAll: () =>
        set((s) => {
          if (s.isSelectedAll) {
            s.selectedRows = []
          } else {
            s.selectedRows = s.data?.nodes.map((row: any) => row)
          }
          s.isSelectedAll = !s.isSelectedAll
        }),

      isSelected: (row: any) => {
        const selectedItem = row.original ?? row

        return some(
          get().selectedRows,
          (selectedRow) => selectedRow.id === selectedItem.id
        )
      },

      clearSelections: () =>
        set((s) => {
          s.selectedRows = []
          s.isSelectedAll = false
        }),

      setData: (data) =>
        set((s) => {
          s.data = data
          s.selectedRows = []
          s.isSelectedAll = false

          // If we are on the last page and last record on the page deleted
          // then switch to previous page
          if (
            data?.pageInfo?.hasPreviousPage &&
            data?.totalPages < s.currentPage
          ) {
            s.currentPage -= 1
            s.args = s.arrArgs[s.currentPage - 1]
            s.arrArgs.pop()
          }

          // If current data has nextPage and next args not prepared yet
          // then, prepare args for the next page
          if (
            data?.pageInfo?.hasNextPage &&
            s.arrArgs.length === s.currentPage
          ) {
            s.arrArgs.push({
              ...s.arrArgs[s.currentPage - 1],
              after: data.pageInfo.endCursor,
            })
          }
        }),

      setIsLoading: (isLoading) =>
        set((s) => {
          s.isLoading = isLoading
        }),

      setIsFetching: (isFetching) =>
        set((s) => {
          s.isFetching = isFetching
        }),
    }))
  )
}

export default paginationStore
