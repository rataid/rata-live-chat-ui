import { MouseEventHandler } from 'react'

import Button from '@nui/ui/button'
import Image from '@nui/ui/image'

import { PreviewImageDelete, PreviewImageItem } from './image.style'

type PreviewImageProps = {
  src?: string
  alt?: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default function PreviewImage({ src, alt, onClick }: PreviewImageProps) {
  return (
    <PreviewImageItem className="group">
      <Image
        // tw="w-[70px] h-[70px] md:(w-[6.375rem] h-[6.375rem])"
        tw="w-[48px] h-[48px]"
        src={src}
        alt={alt}
        object="cover"
      />
      <PreviewImageDelete tw="group-hover:visible">
        <Button
          type="button"
          variant="secondary"
          icon="lucide:x"
          size="xs"
          rounded="full"
          danger
          onClick={onClick}
        />
      </PreviewImageDelete>
    </PreviewImageItem>
  )
}
