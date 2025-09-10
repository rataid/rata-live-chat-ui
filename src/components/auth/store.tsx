import { createStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { AuthAction, AuthState, AuthenticatedUser } from './types'

export type AuthStore = ReturnType<typeof authStore>

const checkValue = (value: AuthenticatedUser | null) => {
  return !value || !Object.keys(value).length ? null : value
}

const authStore = (userData: AuthenticatedUser | null) => {
  const DEFAULT_PROPS: AuthState = {
    userData: checkValue(userData),
  }

  return createStore<AuthState & AuthAction>()(
    immer<AuthState & AuthAction>((set, get) => ({
      userData: DEFAULT_PROPS.userData,
      getPermissions: () => get().userData?.permissions ?? [],
      setUserData: (payload) =>
        set((s) => {
          s.userData = checkValue(payload)
        }),
      assignData: (payload: any) =>
        set((s) => {
          if (s.userData) {
            s.userData = {
              ...s.userData,
              ...payload,
            }
          }
        }),
    }))
  )
}

export default authStore
