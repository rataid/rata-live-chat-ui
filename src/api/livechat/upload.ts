import axios from 'axios'

import { ApiResponse } from '@/model/shared/query'

import axiosInstance from '../axiosInstance'

export type UploadedAsset = {
  id: string
  url: string
  name: string
}

type PresignedUpload = {
  uploadId: string
  uploadUrl: string
  contentType: string
}

export async function uploadLivechatFile(file: File): Promise<UploadedAsset> {
  const presign = await axiosInstance.post<ApiResponse<PresignedUpload>>(
    '/livechat/uploads',
    {
      fileName: file.name,
      contentType: file.type || 'application/octet-stream',
      size: file.size,
    }
  )

  const upload = presign.data?.data

  if (!upload?.uploadId || !upload.uploadUrl) {
    throw new Error('Upload failed')
  }

  await axios.put(upload.uploadUrl, file, {
    headers: { 'Content-Type': upload.contentType },
    timeout: 120000,
  })

  const done = await axiosInstance.post<ApiResponse<UploadedAsset>>(
    '/livechat/uploads/complete',
    { uploadId: upload.uploadId },
    { timeout: 60000 }
  )

  const asset = done.data?.data

  if (!asset?.id) {
    throw new Error('Upload failed')
  }

  return asset
}
