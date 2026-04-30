
// Store
export type AuthOption = Role

export type AuthItem = Role

type Role = {
  abbr:string
    color: string
    createdAt: Date;
    id: string;
    permissions: string[]
    rolePermissions?: string[]
    title: string;
    updatedAt: Date
    userRoles?: string[]
    users: string[]
}

export type AuthenticatedUser = {
  sub: string
  username: string
  fullname: string
  avatar: string
  roles: string[]
  permissions: string[]
  iat: number
  exp: number
  id?: string | number
  approval_line?: string | number
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
