import styled from 'styled-components'
import { tw } from '@nui/utils/tw'

export type TableCellProps = {
  stopPropagate?: boolean
  preventDefault?: boolean
} & React.PropsWithChildren

// Create flex container with centered vertical alignment and fill parent td container
const CellWrapper = styled.div.attrs({ className: tw`px-4 py-4 inline-flex flex-col items-start justify-center h-full w-full` })``

export default function Cell({
  stopPropagate = false,
  preventDefault = false,
  children,
}: TableCellProps) {
  if (stopPropagate || preventDefault) {
    return (
      <CellWrapper
        onClick={(e) => {
          if (stopPropagate) {
            e.stopPropagation()
          }

          if (preventDefault) {
            e.preventDefault()
          }
        }}
        aria-hidden="true"
      >
        {children}
      </CellWrapper>
    )
  }

  return <CellWrapper>{children}</CellWrapper>
}
