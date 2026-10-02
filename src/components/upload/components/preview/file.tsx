import { MouseEventHandler } from 'react'

import Button from '@nui/ui/button'
import FeaturedIcon from '@nui/ui/featured-icon'
import Typo from '@nui/ui/typo'
import { formatBytes } from '@utils'

import {
  PreviewFileContainer,
  PreviewFileMain,
  PreviewFileWrapper,
} from './file.style'

type PreviewFileProps = {
  title?: string
  size?: number
  body?: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default function PreviewFile({
  title,
  size,
  body,
  onClick,
}: PreviewFileProps) {
  return (
    <PreviewFileWrapper>
      <PreviewFileContainer>
        <FeaturedIcon icon="lucide:file-text" rounded="lg" />
        <PreviewFileMain>
          <Typo fontWeight="bold" color="gray-500">
            {title}
          </Typo>
          <Typo size="xs" color="gray-500">
            {body}
            <span className="pl-1">| {formatBytes(size)}</span>
          </Typo>
        </PreviewFileMain>
      </PreviewFileContainer>
      <Button
        danger
        size="sm"
        variant="secondary"
        icon="lucide:x"
        onClick={onClick}
      />
    </PreviewFileWrapper>
  )
}
