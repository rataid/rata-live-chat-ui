import { shallow } from 'zustand/shallow'

import Button from '@nui/ui/button'

import { useRoleItemSelect } from '../hooks'
import { RoleItemSelectedItemProps } from '../types'

export default function RoleItemSelectedItem({
  item,
}: RoleItemSelectedItemProps) {
  const [removeItem] = useRoleItemSelect((s) => [s.removeItem], shallow)

  return (
    <div tw="px-4 mt-3.5 flex-1 flex items-center gap-x-4">
      <div tw="flex-1">
        <div tw="text-gray-700 font-semibold">{item.title}</div>
      </div>
      <div tw="w-fit">
        <Button
          type="button"
          variant="tertiaryGray"
          onClick={() => removeItem(item.id)}
          icon="lucide:trash"
          size="xs"
        />
      </div>
    </div>
  )
}
