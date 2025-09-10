import { random } from 'lodash'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { shallow } from 'zustand/shallow'

import notify from '@nui/hooks/use-notif'
import Button from '@nui/ui/button'
import FeaturedIcon from '@nui/ui/featured-icon'
import Icon from '@nui/ui/icon'

import { useUpload } from '../hooks'
import {
  UploadDropzoneIcon,
  UploadDropzoneInfo,
  UploadDropzoneInfoAccent,
  UploadDropzoneOverlay,
  UploadDropzoneToggle,
  UploadDropzoneWrapper,
} from './dropzone.style'

export function UploadDropzone() {
  const [uploadName, setUploadName] = useState(`upload${random(1, 100000)}`)

  const [
    fileType,
    maxFiles,
    maxSize,
    fileNamingRules,
    queue,
    setCurrentTab,
    addQueueItems,
  ] = useUpload(
    (s) => [
      s.fileType,
      s.maxFiles,
      s.maxSize,
      s.fileNamingRules,
      s.queue,
      s.setCurrentTab,
      s.addQueueItems,
    ],
    shallow
  )

  const isTypeFile = {
    image: 'image/png, image/jpg, image/jpeg',
    file: '.pdf, .xls, .xlsx, .doc, .docx, image/png, image/jpg, image/jpeg',
    stl: '.stl',
    icd: '.pdf, image/png, image/jpg, image/jpeg',
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: { [isTypeFile[fileType]]: [] },
    maxFiles,
    maxSize,
    onDrop(acceptedFiles, fileRejections) {
      if (acceptedFiles.length > 0) {
        addQueueItems(acceptedFiles)
      }
      const fileRejectionMessage = fileRejections?.[0]?.errors?.[0]?.message

      if (fileRejectionMessage) {
        notify({
          type: 'error',
          message: fileRejectionMessage,
        })
      }
    },
  })

  const isTypeNameFile = {
    image: '( png or jpg )',
    file: '( pdf, xlsx, doc, png or jpg )',
    stl: 'Only STL files are allowed to upload',
    icd: '( pdf, png or jpg )',
  }

  return (
    <UploadDropzoneWrapper>
      <UploadDropzoneOverlay {...getRootProps()} />
      <input
        type="file"
        id={uploadName}
        name={uploadName}
        multiple
        accept={isTypeFile[fileType]}
        hidden
        {...getInputProps()}
      />

      <UploadDropzoneToggle>
        {queue.length > 0 && (
          <Button
            variant="link"
            trailing
            icon="lucide:list"
            size="xs"
            onClick={() => setCurrentTab('queue')}
          >
            See queue
          </Button>
        )}
      </UploadDropzoneToggle>
      <UploadDropzoneIcon>
        <FeaturedIcon
          icon={<Icon icon="lucide-upload" />}
          variant="gray"
          rounded="full"
          size="lg"
          outline
        />
      </UploadDropzoneIcon>
      <div>
        <UploadDropzoneInfo>
          <UploadDropzoneInfoAccent>Click to upload</UploadDropzoneInfoAccent>{' '}
          or drag and drop
          <br />
          {isTypeNameFile[fileType]}
        </UploadDropzoneInfo>
        {fileNamingRules}
      </div>
    </UploadDropzoneWrapper>
  )
}
