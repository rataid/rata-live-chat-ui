import { shallow } from 'zustand/shallow'

import { key } from '@utils'

import { useRoleItemSelect } from '../hooks'
import RoleItemSelectedItem from './item'

export function RoleItemSelectItems() {
  const [items] = useRoleItemSelect((s) => [s.items], shallow)

  return items?.length > 0 ? (
    <div tw="pt-2 text-sm">
      {items?.map((item) => (
        <div key={key(item)}>
          <RoleItemSelectedItem item={item.role} />
          <div tw="border-b border-gray-200 pb-2.5" />
        </div>
      ))}
    </div>
  ) : null
}
