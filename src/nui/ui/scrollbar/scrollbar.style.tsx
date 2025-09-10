import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import tw, { css, styled } from 'twin.macro'

type ScrollbarMainProps = {
  $positionTrack?: string
}

export const ScrollbarMain = styled(SimpleBar)<ScrollbarMainProps>(
  ({ $positionTrack = '-1rem' }) => {
    return [
      css`
        .simplebar-wrapper {
          ${tw`!-mr-4`}
        }
        .simplebar-track {
          right: ${$positionTrack};
        }
        .simplebar-vertical > .simplebar-scrollbar:before {
          ${tw`bg-gray-400`}
          width: 4px;
        }
        .simplebar-horizontal > .simplebar-scrollbar:before {
          ${tw`bg-gray-400`}
          height: 4px;
        }
      `,
    ]
  }
)
