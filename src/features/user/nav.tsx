import { useAuth } from '@/components/auth'
import { AppSubnav, AppSubnavProps } from '@nui/layouts'
import Icon from '@nui/ui/icon'

const navs: AppSubnavProps = {
  items: [
    {
      title: 'User',
      to: '/user',
      icon: <Icon icon="lucide:users" size="sm" />,
      permissionName: 'user.user.list',
    },
    {
      title: 'Role',
      to: '/user/role',
      icon: <Icon icon="lucide:layout-grid" size="sm" />,
      permissionName: 'user.role.list',
    },
  ],
}

export default function Nav() {
  const { can } = useAuth()

  const enabledNavs = {
    items: navs.items.filter((item) => {
      const { permissionName } = item
      return can([permissionName ?? ''])
    }),
  }

  return <AppSubnav {...enabledNavs}>User</AppSubnav>
}
