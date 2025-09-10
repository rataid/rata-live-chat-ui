import { shallow } from 'zustand/shallow'

import { useAuthStore } from './use-auth-store'

export function useAuth() {
  const [userData, getPermissions, assignData] = useAuthStore(
    (s) => [s.userData, s.getPermissions, s.assignData],
    shallow
  )

  const userPermissions = getPermissions()

  const can = (
    permissions: string[] = [],
    mode: 'some' | 'every' = 'every'
  ) => {
    const isHasPermission = permissions[mode]((p) =>
      userPermissions.includes(p)
    )

    return isHasPermission
  }

  return {
    userData,
    userPermissions,
    assignData,
    can,
  }
}
