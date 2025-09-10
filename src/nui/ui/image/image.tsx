import { forwardRef } from 'react'

import Icon from '../icon'
import { ImageIconWrapper, ImageMain, ImageWrapper } from './image.style'
import { ImageProps } from './types'

export const Image = forwardRef<HTMLDivElement, ImageProps>(function Image(
  {
    src,
    alt,
    width,
    height,
    object = 'scale-down',
    cursorPointer,
    children,
    ...props
  },
  ref
) {
  return src ? (
    <ImageWrapper
      cursorPointer={cursorPointer}
      width={width}
      height={height}
      {...props}
      ref={ref}
    >
      <ImageMain loading="lazy" object={object} src={src} alt={alt} />
    </ImageWrapper>
  ) : (
    <ImageIconWrapper width={width} height={height} {...props} ref={ref}>
      {!children ? <Icon icon="lucide-image" size="sm" /> : children}
    </ImageIconWrapper>
  )
})
