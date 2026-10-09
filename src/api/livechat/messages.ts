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
