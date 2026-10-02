import { includes, isEqual, some } from 'lodash'
import { useEffect, useRef } from 'react'

import Button from '@nui/ui/button'
import FeaturedIcon from '@nui/ui/featured-icon'
import Progress from '@nui/ui/progress'
import Scrollbar from '@nui/ui/scrollbar'

import { useUpload } from '../hooks'
import { UploadQueueStatus } from '../types'
import upload from '../utils'
import {
  UploadQueueClose,
  UploadQueueItem,
  UploadQueueMain,
  UploadQueueMessage,
  UploadQueueProgress,
  UploadQueueProgressContainer,
  UploadQueueThumbnail,
  UploadQueueWrapper,
} from './queue.style'

export default function UploadQueue() {
  const effectInvoked = useRef(false)

  const [
    fileType,
    resourceKey,
    queue,
    addItem,
    setCurrentTab,
    updateQueue,
    setQueueItemProgress,
  ] = useUpload((s) => [
    s.fileType,
    s.resourceKey,
    s.queue,
    s.addItem,
    s.setCurrentTab,
    s.updateQueue,
    s.setQueueItemProgress,
  ])

  useEffect(() => {
    // Prevent multiple upload even in development StrictMode
    if (!effectInvoked.current) {
      const updateProgress = (resourceId: string, percentCompleted: number) => {
        setQueueItemProgress(resourceId, percentCompleted)
      }
      queue.forEach(async (item) => {
        if (item.status === UploadQueueStatus.PENDING) {
          const { file } = item
          const uploadResult = await upload(
            resourceKey,
            item.id,
            file,
            updateProgress
          )

          const checkStatus = some([
            includes([200, 202], uploadResult.status),
            isEqual('OK', uploadResult.statusText),
          ])

          if (uploadResult && checkStatus) {
            updateQueue(item.id, uploadResult.data.data.upload.id)
            addItem(uploadResult.data.data.upload)
          }
        }
      })
    }

    return () => {
      effectInvoked.current = true
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative">
      <Scrollbar maxHeight="178px" positionTrack="-0.8rem">
        <UploadQueueWrapper>
          {queue.map((item) => (
            <UploadQueueItem key={item.id}>
              <UploadQueueThumbnail>
                {['file', 'stl'].includes(fileType) ? (
                  <FeaturedIcon icon="lucide:file-text" />
                ) : (
                  <img
                    src={URL.createObjectURL(item.file)}
                    alt={`thumbnail ${item.filename}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </UploadQueueThumbnail>
              <UploadQueueMain>
                <UploadQueueProgressContainer>
                  <UploadQueueProgress>
                    <Progress
                      value={item.progress}
                      status={`${Math.trunc(item.progressPercent * 100)}%`}
                    >
                      {item.filename}
                    </Progress>
                  </UploadQueueProgress>
                </UploadQueueProgressContainer>
                {(item.status === UploadQueueStatus.ERROR ||
                  item.errorMessage) && (
                  <UploadQueueMessage>
                    {!item.errorMessage
                      ? 'Upload failed, please try again'
                      : item.errorMessage}
                  </UploadQueueMessage>
                )}
              </UploadQueueMain>
            </UploadQueueItem>
          ))}
        </UploadQueueWrapper>
      </Scrollbar>
      <UploadQueueClose>
        <Button
          type="button"
          variant="tertiaryGray"
          icon="lucide:x"
          size="xs"
          onClick={() => setCurrentTab('dropzone')}
        />
      </UploadQueueClose>
    </div>
  )
}
