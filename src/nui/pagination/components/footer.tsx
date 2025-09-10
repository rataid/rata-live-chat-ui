/* eslint-disable import/no-cycle */
import { useResponsive } from 'ahooks'
import { UseSelectProps } from 'downshift'
import { useMemo } from 'react'
import { shallow } from 'zustand/shallow'

import { Select } from '@nui/form'
import {
  PaginationFooterProps,
  PaginationPerPageOption,
  usePagination,
} from '@nui/pagination'
import Button from '@nui/ui/button'
import ButtonStack from '@nui/ui/button-stack'

import { PAGINATION_TABLE_PERPAGES } from '../config'
import {
  PaginationFooterInfo,
  PaginationFooterPagination,
  PaginationFooterPerPage,
  PaginationFooterPerPageLabel,
  PaginationFooterPerPageSelect,
  PaginationFooterWrapper,
} from './footer.style'

const buildPerPageOptions = (perPages: number[]): PaginationPerPageOption[] =>
  perPages.map((perpage) => ({
    value: perpage,
    label: perpage.toString(),
  }))

export function PaginationFooter({
  perPages: perPagesValue,
  hideSelected = false,
}: PaginationFooterProps) {
  const responsive = useResponsive()

  const { xl } = responsive

  const [perPage, currentPage, data, isFetching, setPerPage, prev, next] =
    usePagination(
      (s) => [
        s.perPage,
        s.currentPage,
        s.data,
        s.isFetching,
        s.setPerPage,
        s.prev,
        s.next,
      ],
      shallow
    )

  const perPageOptions = useMemo(
    () => buildPerPageOptions(perPagesValue ?? PAGINATION_TABLE_PERPAGES),
    [perPagesValue]
  )

  const selectedItem = useMemo(
    () => perPageOptions.find((o) => o.value === perPage) ?? undefined,
    [perPage, perPageOptions]
  )

  const options = useMemo(
    () =>
      ({
        items: perPageOptions,
        selectedItem,
        onSelectedItemChange: ({ selectedItem: item }) => {
          if (item) setPerPage(item.value)
        },
      } as UseSelectProps<PaginationPerPageOption>),
    [perPageOptions, selectedItem, setPerPage]
  )

  return (
    <PaginationFooterWrapper>
      {xl && (
        <>
          <PaginationFooterPerPage>
            <PaginationFooterPerPageLabel>
              Rows per page
            </PaginationFooterPerPageLabel>
            <PaginationFooterPerPageSelect>
              {hideSelected ? (
                perPage
              ) : (
                <Select disabled={hideSelected} options={options} />
              )}
            </PaginationFooterPerPageSelect>
          </PaginationFooterPerPage>
          <PaginationFooterInfo>
            Page {currentPage} of {data?.totalPages}
          </PaginationFooterInfo>
        </>
      )}

      <PaginationFooterPagination>
        <ButtonStack justify={xl ? 'none' : 'between'}>
          <Button
            variant="secondaryGray"
            icon={!xl ? 'lucide:arrow-left' : undefined}
            onClick={prev}
            disabled={isFetching || !data?.pageInfo.hasPreviousPage}
          >
            {xl && 'Previous'}
          </Button>
          {!xl && (
            <PaginationFooterInfo>
              Page {currentPage} of {data?.totalPages}
            </PaginationFooterInfo>
          )}
          <Button
            variant="secondaryGray"
            icon={!xl ? 'lucide:arrow-right' : undefined}
            onClick={next}
            disabled={isFetching || !data?.pageInfo.hasNextPage}
          >
            {xl && 'Next'}
          </Button>
        </ButtonStack>
      </PaginationFooterPagination>
    </PaginationFooterWrapper>
  )
}
