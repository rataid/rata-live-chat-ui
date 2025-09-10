import { Role } from '@gql/graphql'

// Store
export type AuthOption = Role

export type AuthItem = Role

export type AuthenticatedUser = {
  sub: string
  username: string
  fullname: string
  avatar: string
  roles: string[]
  permissions: string[]
  iat: number
  exp: number
}

export type AuthState = {
  userData: AuthenticatedUser | null
}

export type AuthAction = {
  getPermissions: () => string[]
  setUserData: (userData: AuthenticatedUser | null) => void
  assignData: (payload: any) => void
}

export type AuthProviderProps = {
  userData: AuthenticatedUser | null
} & React.PropsWithChildren

// Components
export type AuthProtectedLayoutProps = React.PropsWithChildren
