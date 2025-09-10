import { RouteObject } from 'react-router-dom'

import { routeGuard } from '@/components/auth/helpers'

import { roleCreateAction } from './pages/create.route'
import { roleEditAction, roleEditLoader } from './pages/edit.route'
import { roleListAction, roleListLoader } from './pages/list'

const roleRoutes: RouteObject[] = [
  {
    path: 'role',
    loader: (args) => routeGuard(args, roleListLoader, ['user.role.list']),
    action: (args) =>
      routeGuard(args, roleListAction, ['user.role.delete'], 'some'),
    async lazy() {
      const { RoleListPage } = await import('./pages/list')
      return {
        Component: RoleListPage,
      }
    },
    handle: {
      crumb: () => 'Role',
    },
    children: [
      {
        path: ':id/detail',
        loader: (args) => routeGuard(args, roleEditLoader, ['user.role.list']),
        async lazy() {
          const { RoleListDetailPage } = await import('./pages/list/detail')
          return {
            Component: RoleListDetailPage,
          }
        },
      },
    ],
  },
  {
    path: 'role/create',
    loader: (args) => routeGuard(args, undefined, ['user.role.create']),
    action: (args) => routeGuard(args, roleCreateAction, ['user.role.create']),
    async lazy() {
      const { RoleCreatePage } = await import('./pages/create')
      return {
        Component: RoleCreatePage,
      }
    },
    handle: {
      crumb: () => 'Create',
    },
  },
  {
    path: 'role/:id/edit',
    loader: (args) => routeGuard(args, roleEditLoader, ['user.role.update']),
    action: (args) => routeGuard(args, roleEditAction, ['user.role.update']),
    async lazy() {
      const { RoleEditPage } = await import('./pages/edit')
      return {
        Component: RoleEditPage,
      }
    },
    handle: {
      crumb: (data: any) => [data.title, 'Edit'],
    },
  },
]

export default roleRoutes
