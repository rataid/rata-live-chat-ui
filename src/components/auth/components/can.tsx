import { useAuth } from '../hooks/use-auth'

export type CanProps = {
  permissions: string[]
  mode?: 'some' | 'every'
} & React.PropsWithChildren

export function Can({ permissions = [], mode = 'every', children }: CanProps) {
  const { userPermissions } = useAuth()

  const isHasPermission = permissions[mode]((p) => userPermissions.includes(p))

  return isHasPermission ? (children as React.ReactElement) : null
}
