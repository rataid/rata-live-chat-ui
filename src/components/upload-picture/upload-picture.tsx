import { ChangeEvent, forwardRef, useEffect, useState } from 'react'

import Button from '@nui/ui/button'
import Icon from '@nui/ui/icon'
import Image from '@nui/ui/image'

import upload from '../upload/utils'
import { UploadPictureProps } from './types'
import {
  UploadPictureContent,
  UploadPictureFormUpload,
  UploadPictureInfo,
  UploadPictureWrapper,
} from './upload-picture.style'

export const UploadPicture = forwardRef<HTMLInputElement, UploadPictureProps>(
  function UploadPicture(
    { value, resourceKey, labelButton, onChange, ...props },
    forwardedRef
  ) {
    const [inputValue, setInputValue] = useState<any>(value)

    useEffect(() => {
      onChange?.({
        target: { value: inputValue?.id || '' },
      } as any)
    }, [onChange, inputValue])

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

    return (
      <UploadPictureWrapper>
        <input
          ref={forwardedRef}
          value={inputValue?.id ?? ''}
          onChange={() => {}}
          hidden
          {...props}
        />
        <Image
          width="200px"
          height="120px"
          object="cover"
          tw="text-primary-600"
          src={inputValue?.url}
        >
          <Icon stroke="md" icon="lucide:image" size="2xl" />
        </Image>
        <UploadPictureContent>
          <Button
            type="button"
            noPadding
            size="sm"
            variant="link"
            icon={<Icon icon="lucide-edit" />}
          >
            <UploadPictureFormUpload htmlFor="upload">
              <input
                onChange={onChangeImage}
                type="file"
                id="upload"
                accept="image/png,image/jpg,image/jpeg"
                hidden
              />
              {labelButton}
            </UploadPictureFormUpload>
          </Button>
          <UploadPictureInfo>
            <div>*File format recomendation: JPG/PNG</div>
            <div>*Max size: 5mb</div>
          </UploadPictureInfo>
        </UploadPictureContent>
      </UploadPictureWrapper>
    )
  }
)
