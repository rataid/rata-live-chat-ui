import { groupBy } from 'lodash'
import { Fragment } from 'react'
import { shallow } from 'zustand/shallow'

import Checkbox from '@nui/ui/checkbox'
import Dot from '@nui/ui/dot'
import { key, titleCase } from '@utils'

import { usePermissionChecklist } from '../hooks'
import { PermissionChecklistChoice } from '../types'
import {
  PermissionChecklistItemsChildContainer,
  PermissionChecklistItemsChildMain,
  PermissionChecklistItemsChildWrapper,
} from './items-child.style'

type PermissionChecklistItemsChildProps = {
  permissionList: PermissionChecklistChoice[]
}

export function PermissionChecklistItemsChild({
  permissionList,
}: PermissionChecklistItemsChildProps) {
  const [checked, toggle] = usePermissionChecklist(
    (s) => [s.checked, s.toggle],
    shallow
  )

  const permissionGroupList = groupBy(permissionList, (item) => {
    const parts = item?.action.split('.') || []

    if (parts[parts.length - 2] === 'confirm') {
      parts.pop()
      parts.pop()
    } else {
      parts.pop()
    }

    return parts.join('.')
  })

  return (
    <div>
      {Object.keys(permissionGroupList).map((groupKey) => (
        <PermissionChecklistItemsChildWrapper key={key(groupKey)}>
          <PermissionChecklistItemsChildContainer>
            {permissionGroupList[groupKey].map((item) => {
              const parts = item?.action.split('.') || []

              return (
                <Checkbox
                  key={key(item.id)}
                  id={item.id}
                  value={item.id}
                  checked={checked(item)}
                  onChange={() => toggle(item)}
                >
                  <PermissionChecklistItemsChildMain>
                    {parts.map((part, index) => {
                      return (
                        <Fragment key={key(`key-${part}`)}>
                          {index > 0 && <Dot size="xs" color="gray" />}
                          <span>
                            {titleCase(part)?.replace('Scan 3 D', 'Scan 3D')}
                          </span>
                        </Fragment>
                      )
                    })}
                  </PermissionChecklistItemsChildMain>
                </Checkbox>
              )
            })}
          </PermissionChecklistItemsChildContainer>
        </PermissionChecklistItemsChildWrapper>
      ))}
    </div>
  )
}
