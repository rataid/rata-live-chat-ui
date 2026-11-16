import {
  GetLiveChatMessagesParams,
  LivechatServerMessage,
} from '@/model/livechat'
import { ApiResponse } from '@/model/shared/query'

import axiosInstance from '../axiosInstance'

export const LIVECHAT_MESSAGES_PAGE_SIZE = 30

export const getLiveChatMessages = async ({
  cursor,
  take = LIVECHAT_MESSAGES_PAGE_SIZE,
}: GetLiveChatMessagesParams = {}): Promise<LivechatServerMessage[]> => {
  const res = await axiosInstance.get<
    ApiResponse<{ items?: LivechatServerMessage[] }>
  >('/livechat/messages', { params: { cursor, take } })

  return res.data?.data?.items ?? []
}

// Agent replies the customer has not read yet, counted by the backend
export const getLiveChatUnreadCount = async (): Promise<number> => {
  const res = await axiosInstance.get<ApiResponse<{ count?: number }>>(
    '/livechat/messages/unread-count'
  )

  return res.data?.data?.count ?? 0
}
