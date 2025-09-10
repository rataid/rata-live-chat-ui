import { Dispatch, SetStateAction } from 'react'

export type InfiniteScrollProps = {
  data: any
  totalPage?: number
  parentScrollId?: string
  page?: number
  setPage: Dispatch<SetStateAction<number>>
  children?: React.ReactNode | ((props: { nodes: any }) => React.ReactNode)
}
