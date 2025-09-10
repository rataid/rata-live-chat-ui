import { ChangeEvent, forwardRef, useEffect, useState } from 'react'

import { UploadPictureProps } from '@/components/upload-picture/types'
import upload from '@/components/upload/utils'
import Avatar from '@nui/ui/avatar'
import Button from '@nui/ui/button'
import Icon from '@nui/ui/icon'

import {
  WidgetUserPictureContent,
  WidgetUserPictureFormUpload,
  WidgetUserPictureImage,
  WidgetUserPictureInfo,
  WidgetUserPictureWrapper,
} from './widget-user-picture.style'

const WidgetUserPicture = forwardRef<
  HTMLInputElement,
  Omit<UploadPictureProps, 'labelButton'>
>(function WidgetUserPicture(
  { value, resourceKey, onChange, ...props },
  forwardedRef
) {
  const [inputValue, setInputValue] = useState<any>(value)

  useEffect(() => {
    onChange?.({
      target: { value: inputValue?.id || '' },
    } as any)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

  // todo maybe need progress upload
  const updateProgress = () => {}

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      // axios
      upload(resourceKey, '', file, updateProgress)
        .then((response) => {
          // handle the response
          setInputValue(response.data.data.upload)
        })
        .catch((error) => {})
    }
  }

  const status = inputValue ? 'Change' : 'Add'

  return (
    <WidgetUserPictureWrapper>
      <input
        ref={forwardedRef}
        value={inputValue?.id ?? ''}
        onChange={() => {}}
        hidden
        {...props}
      />
      <WidgetUserPictureImage>
        <Avatar src={inputValue?.url} placeholder="lucide-user" size="4xl" />
      </WidgetUserPictureImage>
      <WidgetUserPictureContent>
        <Button
          type="button"
          size="sm"
          variant="link"
          icon={<Icon icon="lucide-edit" />}
        >
          <WidgetUserPictureFormUpload htmlFor="upload">
            <input
              onChange={onChangeImage}
              type="file"
              id="upload"
              accept="image/png,image/jpg,image/jpeg"
              hidden
            />
            {status} display picture
          </WidgetUserPictureFormUpload>
        </Button>
        <WidgetUserPictureInfo>
          <div>*File format recomendation: JPG/PNG</div>
          <div>*Max size: 5mb</div>
        </WidgetUserPictureInfo>
      </WidgetUserPictureContent>
    </WidgetUserPictureWrapper>
  )
})

export default WidgetUserPicture
