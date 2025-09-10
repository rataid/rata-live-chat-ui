import React from 'react'

import { DateInfo } from '@/components/ui/date'
import Box from '@nui/ui/box'
import { DualToneColum } from '@nui/ui/dual-tone-column'
import Section from '@nui/ui/section'
import { Heading3 } from '@nui/ui/typo'
import { DATE_WORD } from '@utils'

import { CardDualToneColumnProps } from './types'

export default function CardDualToneColumn({
  caption,
  titleDate,
  date,
  fit,
  noBackground,
  more,
  children,
  padding = 'lg',
}: CardDualToneColumnProps) {
  const arrChildren = React.Children.toArray(children)

  if (arrChildren.length > 2) throw new Error('Max Children 2')

  return (
    <Section
      spacing="xs"
      caption={caption && <Heading3>{caption}</Heading3>}
      more={
        date && (
          <DateInfo title={titleDate} date={date} dateFormat={DATE_WORD} />
        )
      }
    >
      <Box padding={padding} flow="column">
        {arrChildren.length === 1
          ? children
          : children && (
              <DualToneColum fit={fit} noBackground={noBackground}>
                {children}
              </DualToneColum>
            )}
        {more}
      </Box>
    </Section>
  )
}
