import { useCallback, useEffect, useState } from 'react'
import ReactInfiniteScroll from 'react-infinite-scroll-component'

import InfiniteScrollLoader from './components/loader'
import { InfiniteScrollProps } from './types'

export function InfiniteScroll({
  page = 10,
  setPage,
  data,
  parentScrollId,
  totalPage = 0,
  children,
}: InfiniteScrollProps) {
  const [hasMore, setHasMore] = useState<boolean>(true)

  const [items, setItems] = useState<any>(data)

  const fetchMoreData = useCallback(() => {
    setPage(page + 5)
    setHasMore(true)
    setTimeout(() => {
      setHasMore(false)
    }, 200)
  }, [page, setPage])

  useEffect(() => {
    if (!items) {
      setItems(data)
    }
    if (!hasMore && data) {
      setItems((prevItems: any) => {
        // Use a Set to keep track of unique item IDs
        const uniqueItemIds =
          new Set(prevItems?.map((item: any) => item.id)) ?? []

        // Filter out duplicates and append new items
        const filteredNodes =
          data?.filter((node: any) => !uniqueItemIds.has(node.id)) || []

        return [...prevItems, ...filteredNodes]
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, hasMore])

  return (
    <ReactInfiniteScroll
      dataLength={items?.length || 0}
      hasMore={(items?.length || 0) < totalPage}
      next={fetchMoreData}
      scrollableTarget={parentScrollId}
      loader={<InfiniteScrollLoader />}
    >
      {typeof children === 'function' ? children({ nodes: items }) : children}
    </ReactInfiniteScroll>
  )
}
