import axios from 'axios'

import { getToken } from '@/components/auth'

import { UploadQueueItem, UploadQueueStatus } from './types'

export default async function upload(
  resourceKey: string,
  resourceId: string,
  file: File,
  callback?: (resourceId: string, percentCompleted: number) => void
) {
  const data = new FormData()

  await data.append(
    'operations',
    JSON.stringify({
      operationName: 'Upload',
      variables: { file: null, resourceKey },
      query: `mutation Upload($file: Upload! $resourceKey: String!) {
        upload(file: $file, resourceKey: $resourceKey) {
          id
          resourceKey
          createdAt
          updatedAt
          url
          name
          size
          ext
          title
        }
      }`,
    })
  )

  data.append('map', JSON.stringify({ 0: ['variables.file'] }))
  data.append('0', file)

  const token = getToken()

  return axios.request({
    url: import.meta.env.VITE_GQL_UPLOAD_ENDPOINT,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
      'Apollo-Require-Preflight': 'true',
    },
    data,
    onUploadProgress: (progressEvent) => {
      if (progressEvent && progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        if (typeof callback === 'function') {
          callback(resourceId, percentCompleted)
        }
      }
    },
  })
}

export function countOnProgress(queue: UploadQueueItem[]) {
  return queue.filter(
    (item) =>
      item.status === UploadQueueStatus.PENDING ||
      item.status === UploadQueueStatus.UPLOADING
  ).length
}
