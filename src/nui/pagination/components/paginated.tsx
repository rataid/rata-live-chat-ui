import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { shallow } from 'zustand/shallow'

import {
  PaginatedProps,
  PaginationFooter,
  PaginationHeader,
  usePagination,
} from '@nui/pagination'

import { PAGINATION_TABLE_PERPAGE } from '../config'

export function Paginated({
  query,
  args: argsValue,
  filter,
  title,
  more,
  selected,
  perPages,
  placeholder,
  hideSelected,
  children,
}: PaginatedProps) {
  const [args, setInitArgs, setPerPage, setIsFetching, setData, setFilter] =
    usePagination(
      (s) => [
        s.args,
        s.setInitArgs,
        s.setPerPage,
        s.setIsFetching,
        s.setData,
        s.setFilter,
      ],
      shallow
    )

  const q = useMemo(
    () => (args ? query(args) : query(argsValue)),
    [args, argsValue, query]
  )

  const { data, isFetching } = useQuery<any>({
    ...q,
    keepPreviousData: true,
  })

  useEffect(() => {
    setIsFetching(isFetching)
  }, [isFetching, setIsFetching])

  // Always trigger some setter on first render
  // Caution Only run this effect on first render!!
  useEffect(() => {
    setPerPage(perPages?.[1] ?? PAGINATION_TABLE_PERPAGE)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (argsValue) {
      setInitArgs(argsValue)
    }
  }, [argsValue, setInitArgs])

  useEffect(() => {
    if (filter) {
      setFilter(filter)
    }
  }, [filter, setFilter])

  useEffect(() => {
    setData(data)
  }, [data, setData])

  return (
    <div>
      <PaginationHeader
        placeholder={placeholder}
        title={title}
        more={more}
        selected={selected}
      />
      {children}
      <PaginationFooter hideSelected={hideSelected} perPages={perPages} />
    </div>
  )
}
