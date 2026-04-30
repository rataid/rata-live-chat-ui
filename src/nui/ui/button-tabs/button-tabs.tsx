import { key } from '@utils'

import ButtonGroup from '../button-group'
import { Button } from './button'
import { ButtonTabsProps } from './types'

export function ButtonTabs({
  items,
  link = '',
  fit,
  children,
}: ButtonTabsProps) {
  if (children) return <ButtonGroup fit={fit}>{children}</ButtonGroup>

  return (
    <ButtonGroup fit={fit}>
      {items?.map((item) => {
        if (item?.isButton) {
          return (
            <Button
              fit={fit}
              isActive={item.isActive}
              isButton
              // key={key(item)}
              onClick={item.onClick}
            >
              {item.name}
            </Button>
          )
        }

        return (
          <Button
            link={`${link}${item.link}`}
            isActive={item.isActive}
            name={item.name}
            // key={key(item)}
          />
        )
      })}
    </ButtonGroup>
  )
}
