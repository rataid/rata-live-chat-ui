import { decodeToken, isExpired } from 'react-jwt'
import { LoaderFunction, LoaderFunctionArgs, redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'

import { throwError } from '@utils'

import { AuthenticatedUser } from './types'

export const COOKIE_EXPIRATION_TIME = 60 * 60 * 24
export const LOGIN_TOKEN_COOKIE = 'rata.login.token'
export const TOKEN_COOKIE = 'rata.token'

const cookies = new Cookies(null)

export function setToken(token: string, expirationTime?: number) {
  cookies.set(TOKEN_COOKIE, token, {
    maxAge: expirationTime || COOKIE_EXPIRATION_TIME,
    domain: window.location.hostname,
    path: '/',
  })
}

export function getToken() {
  return cookies.get(TOKEN_COOKIE) || null
}

export function removeToken() {
  cookies.remove(TOKEN_COOKIE, {
    domain: window.location.hostname,
    path: '/',
  })
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

  if(decodedToken.permissions){
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
