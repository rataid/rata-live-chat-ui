import { decodeToken, isExpired } from 'react-jwt'
import { LoaderFunction, LoaderFunctionArgs, redirect } from 'react-router-dom'

import { throwError } from '@utils'

import { AuthenticatedUser } from './types'

export const AUTH_STORAGE_KEY = 'livechat-auth'

type AuthStorage = {
  token: string | null
  name: string | null
}

function readAuthStorage(): AuthStorage {
  try {
    const value = localStorage.getItem(AUTH_STORAGE_KEY)
    const parsed = value ? JSON.parse(value) : null

    return {
      token: typeof parsed?.token === 'string' ? parsed.token : null,
      name: typeof parsed?.name === 'string' ? parsed.name : null,
    }
  } catch {
    return { token: null, name: null }
  }
}

function writeAuthStorage(value: AuthStorage) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(value))
  } catch {}
}

export function setToken(token: string) {
  writeAuthStorage({ ...readAuthStorage(), token })
}

export function getToken() {
  return readAuthStorage().token
}

export function removeToken() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  } catch {}
}

export function setUserName(name: string) {
  writeAuthStorage({ ...readAuthStorage(), name })
}

export function getUserName() {
  return readAuthStorage().name
}

export function setPermissions(data: string) {
  localStorage.setItem('permissions', data)
}

export function getPermissions(): Record<string, any>[] {
  try {
    return JSON.parse(localStorage.getItem('permissions') || '[]')
  } catch (error) {
    return []
  }
}

export function isTokenValid(token: string | null) {
  try {
    if (!token || isExpired(token)) {
      return false
    }
  } catch (e) {
    return false
  }

  return true
}

export function parseToken(token: string | null) {
  if (!isTokenValid(token)) {
    return false
  }

  const decodedToken = decodeToken<AuthenticatedUser>(token as string)

  if (!decodedToken || !Object.keys(decodedToken).length) {
    return false
  }

  const permissions = getPermissions()

  if (decodedToken.permissions) {
    decodedToken.permissions =
      decodedToken?.permissions.map((dp) => {
        const record = permissions.find((p) => p.code === dp)

        if (record) {
          return `${record.group}.${record.action}`
        }

        return dp
      }) ?? []
  }

  return decodedToken
}

export function buildFromUrl(path: string, url: string) {
  const params = new URLSearchParams()
  const { pathname, search } = new URL(url)

  if (pathname === '/') {
    return path
  }

  params.set('from', pathname + search)
  return `${path}?${params.toString()}`
}

export function authNavMenuDefaultLink(permissionNavMenuMap: any = {}) {
  const token = getToken()
  const decodedToken = parseToken(token) as AuthenticatedUser

  const userPermissions = decodedToken?.permissions ?? []

  const permissionStatusKeys = Object.keys(permissionNavMenuMap)

  const links: any[] = []

  const filteredPermission = permissionStatusKeys.filter((p) =>
    userPermissions.includes(p)
  )

  filteredPermission.forEach((p) => {
    const link = permissionNavMenuMap[p]
    if (link) {
      links.push(link)
    }
  })

  return links[0] ?? undefined
}

export function authAllowedRecordStatus(
  permissionStatusMap: any = {},
  returnKey = false
) {
  const token = getToken()
  const decodedToken = parseToken(token) as AuthenticatedUser

  const userPermissions = decodedToken?.permissions ?? []

  const permissionStatusKeys = Object.keys(permissionStatusMap)

  const statuses: any[] = []

  const filteredPermission = userPermissions.filter((p) =>
    permissionStatusKeys.includes(p)
  )

  filteredPermission.forEach((p) => {
    const status = returnKey ? p : permissionStatusMap[p]
    if (status) {
      statuses.push(status)
    }
  })

  return statuses.length > 0 ? statuses : ['']
}

export async function routeGuard(
  args: LoaderFunctionArgs,
  loaderFunction: LoaderFunction | undefined,
  permissions: string[] = [],
  mode: 'some' | 'every' = 'every'
) {
  const token = getToken()
  const decodedToken = parseToken(token) as AuthenticatedUser

  if (!decodedToken) {
    removeToken()
    return redirect(buildFromUrl('/login', args.request.url))
  }

  if (permissions.length) {
    const userPermissions = decodedToken?.permissions ?? []

    const isHasPermission = permissions[mode]((p) =>
      userPermissions.includes(p)
    )

    if (!isHasPermission) {
      throwError(403)
    }
  }

  if (loaderFunction) return loaderFunction(args)

  return null
}
