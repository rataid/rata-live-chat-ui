import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import styled from 'styled-components'

type ScrollbarMainProps = {
  $positionTrack?: string
}

export const ScrollbarMain = styled(SimpleBar)<ScrollbarMainProps>`
  .simplebar-wrapper {
    margin-right: -1rem !important;
  }

  .simplebar-track {
    right: ${({ $positionTrack = '-1rem' }) => $positionTrack};
  }

  .simplebar-vertical > .simplebar-scrollbar:before {
    background-color: var(--nui-color-gray-400);
    width: 4px;
  }

  .simplebar-horizontal > .simplebar-scrollbar:before {
    background-color: var(--nui-color-gray-400);
    height: 4px;
  }
`
