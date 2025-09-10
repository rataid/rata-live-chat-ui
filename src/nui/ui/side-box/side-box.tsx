import Box from '../box'
import { Heading3 } from '../typo/heading'
import { SideBoxContainer, SideBoxHeader, SideBoxMain } from './side-box.style'
import { SideBoxProps } from './types'

export function SideBox({
  caption,
  more,
  inlineHeader,
  children,
}: SideBoxProps) {
  return (
    <Box padding="lg">
      <SideBoxContainer>
        {caption && (
          <SideBoxHeader inlineHeader={inlineHeader}>
            <Heading3>{caption}</Heading3>
            {more && <div>{more}</div>}
          </SideBoxHeader>
        )}
        <SideBoxMain>{children}</SideBoxMain>
      </SideBoxContainer>
    </Box>
  )
}
