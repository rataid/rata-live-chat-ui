import axiosInstance from '../axiosInstance'

import { ApiResponse } from '@/model/shared/query'

export type UploadedAsset = {
  id: string
  url: string
  name: string
}

export async function uploadLivechatFile(file: File): Promise<UploadedAsset> {
  const done = await axiosInstance.post<ApiResponse<UploadedAsset>>(
    '/livechat/uploads',
    file,
    {
      timeout: 120000,
      headers: {
        'Content-Type': file.type || 'application/octet-stream',
        'x-file-name': encodeURIComponent(file.name),
      },
      transformRequest: [(data) => data],
    }
  )

  const asset = done.data?.data

  if (!asset?.id || !asset.url) {
    throw new Error('Upload failed')
  }

  return asset
}
