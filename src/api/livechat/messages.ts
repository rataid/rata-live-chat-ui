import axiosInstance from '../axiosInstance'
import { LivechatServerMessage } from './socket'

export const LIVECHAT_MESSAGES_ENDPOINT = '/livechat/messages'

export const LIVECHAT_MESSAGES_PAGE_SIZE = 30

type GetLiveChatMessagesParams = {
  cursor?: string
  take?: number
}

export const getLiveChatMessages = async ({
  cursor,
  take = LIVECHAT_MESSAGES_PAGE_SIZE,
}: GetLiveChatMessagesParams = {}): Promise<LivechatServerMessage[]> => {
  const res = await axiosInstance.get<{
    data?: { items?: LivechatServerMessage[] }
  }>(LIVECHAT_MESSAGES_ENDPOINT, { params: { cursor, take } })

  return res.data?.data?.items ?? []
}
