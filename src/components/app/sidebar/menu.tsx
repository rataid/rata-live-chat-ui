import { string } from 'zod'

interface menuType {
  url: string
  tooltip: string
  icon: string
}

export const menu: menuType[] = [
  {
    url: 'dashboard',
    tooltip: 'Dashboard',
    icon: 'lucide:layout-template',
  },
]
