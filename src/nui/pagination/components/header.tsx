import { useDebounceEffect } from 'ahooks'
import { useLayoutEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'

import { Input } from '@nui/form'
import { PaginationHeaderProps, usePagination } from '@nui/pagination'

import {
  PaginationHeaderFilter,
  PaginationHeaderSearch,
  PaginationHeaderSelected,
  PaginationHeaderTitle,
  PaginationHeaderWrapper,
} from './header.style'

export function PaginationHeader({
  title,
  more,
  selected,
  placeholder = 'search',
  summary,
}: PaginationHeaderProps) {
  const [searchQuery, selectedRows, setSearchQuery] = usePagination(
    (s) => [s.searchQuery, s.selectedRows, s.setSearchQuery],
    shallow
  )

  const [inputValue, setInputValue] = useState('')

  // Use inputChangeCount to detect initial input value change
  const [inputChangeCount, setInputChangeCount] = useState(0)

  useDebounceEffect(
    () => {
      // Only trigger setSearchQuery if input value change by user (not form initial mount)
      if (inputChangeCount > 0) {
        setSearchQuery(inputValue)
      }
    },
    [inputValue],
    {
      wait: 500,
    }
  )

  useLayoutEffect(() => {
    setInputValue(searchQuery)
  }, [searchQuery])

  return (
    <PaginationHeaderWrapper>
      {summary && summary}
      {selectedRows.length > 0 && (
        <PaginationHeaderSelected>{selected}</PaginationHeaderSelected>
      )}
      {selectedRows.length === 0 && title && (
        <PaginationHeaderTitle>{title}</PaginationHeaderTitle>
      )}
      <PaginationHeaderFilter>
        {placeholder && (
          <PaginationHeaderSearch>
            <Input
              placeholder={placeholder}
              leadingIcon="lucide:search"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
                setInputChangeCount((v) => v + 1)
              }}
              disabled={selectedRows.length > 0}
            />
          </PaginationHeaderSearch>
        )}
        {more && more}
      </PaginationHeaderFilter>
    </PaginationHeaderWrapper>
  )
}
