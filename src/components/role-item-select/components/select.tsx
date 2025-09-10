import { useQuery } from '@tanstack/react-query'
import { useDebounce } from 'ahooks'
import { UseComboboxProps } from 'downshift'
import { assign, random } from 'lodash'
import { useMemo, useState } from 'react'
import { shallow } from 'zustand/shallow'

import { Combobox } from '@nui/form'

import { QueryMode, RolesQueryVariables, SortOrder } from '@gql/graphql'
import { rolesQuery } from '@models/role/role'

import { useRoleItemSelect } from '../hooks'
import { RoleItemSelectOption } from '../types'

export function RoleItemSelectSelect({ portalId }: { portalId?: string }) {
  const [currentSelected, setCurrentSelected] = useState(0)

  const [searchQuery, selectedRoles, setQuery, addItem] = useRoleItemSelect(
    (s) => [s.query, s.items, s.setQuery, s.addItem],
    shallow
  )

  const debSearchQuery = useDebounce(searchQuery, { wait: 500 })

  const args: RolesQueryVariables = useMemo(() => {
    const queryArgs = {
      orderBy: [{ createdAt: SortOrder.Desc }],
      first: 100,
      where: {},
    }

    if (debSearchQuery !== '') {
      assign(queryArgs.where, {
        OR: [
          {
            title: {
              contains: debSearchQuery,
              mode: QueryMode.Insensitive,
            },
          },
        ],
      })
    }

    if (selectedRoles?.length > 0) {
      const selectedRoleIds = selectedRoles.map((item) => item.role.id)
      assign(queryArgs.where, {
        id: {
          notIn: selectedRoleIds,
        },
      })
    }

    return queryArgs
  }, [debSearchQuery, selectedRoles])

  const { data } = useQuery({
    ...rolesQuery(args),
    keepPreviousData: true,
  })

  const filteredItems = useMemo(
    () => (data?.nodes as RoleItemSelectOption[]) || [],
    [data?.nodes]
  )

  const options: UseComboboxProps<RoleItemSelectOption> = {
    items: filteredItems,
    selectedItem: null,
    onInputValueChange: ({ inputValue }) => {
      if (inputValue && inputValue?.length >= 3) {
        setQuery(inputValue || '')
      }
    },
    itemToString: () => '',
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        addItem(selectedItem)
      }
      setCurrentSelected(random(1, 1000))
    },
  }

  const renderItem = (item: RoleItemSelectOption) => {
    return (
      <div tw="px-3 py-2 w-full flex gap-x-4 cursor-pointer hover:bg-gray-50">
        {item.title}
      </div>
    )
  }

  return (
    <Combobox
      portalId={portalId}
      key={currentSelected}
      placeholder="Search role"
      options={options}
      renderItem={renderItem}
    />
  )
}
