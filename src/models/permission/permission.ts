import gqlClient from '@libs/gql-client'

import {
  AllPermissionsDocument,
  AllPermissionsQueryVariables,
  PermissionDocument,
  PermissionQueryVariables,
  PermissionsDocument,
  PermissionsQueryVariables,
} from '@gql/graphql'

export const permissionKey = 'permission'

export const permissions = async (args: PermissionsQueryVariables) => {
  const result = await gqlClient.request(PermissionsDocument, args)

  return result.permissions
}

export const permissionsQuery = (args: PermissionsQueryVariables) => ({
  queryKey: [permissionKey, args],
  queryFn: () => permissions(args),
})

export const allPermissions = async (args: AllPermissionsQueryVariables) => {
  const result = await gqlClient.request(AllPermissionsDocument, args)

  return result.allPermissions
}

export const allPermissionsQuery = (args: AllPermissionsQueryVariables) => ({
  queryKey: [permissionKey, args],
  queryFn: () => allPermissions(args),
})

export const permission = async (args: PermissionQueryVariables) => {
  if (!args.id) return null

  const result = await gqlClient.request(PermissionDocument, args)

  return result.permission
}

export const permissionQuery = (args: PermissionQueryVariables) => ({
  queryKey: [permissionKey, args.id],
  queryFn: () => permission(args),
})
