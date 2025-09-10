import { z } from 'zod'

import gqlClient from '@libs/gql-client'

import {
  CreateRoleDocument,
  CreateRoleMutationVariables,
  DeleteRolesDocument,
  DeleteRolesMutationVariables,
  RoleDocument,
  RoleQueryVariables,
  RolesDocument,
  RolesQueryVariables,
  UpdateRoleDocument,
  UpdateRoleMutationVariables,
} from '@gql/graphql'
import { abbr, color, json, title } from '@models/shared/validations'

export const roleKey = 'role'

export const roles = async (args: RolesQueryVariables) => {
  const result = await gqlClient.request(RolesDocument, args)

  return result.roles
}

export const rolesQuery = (args: RolesQueryVariables) => ({
  queryKey: [roleKey, args],
  queryFn: () => roles(args),
})

export const role = async (args: RoleQueryVariables) => {
  if (!args.id) return null

  const result = await gqlClient.request(RoleDocument, args)

  return result.role
}

export const roleQuery = (args: RoleQueryVariables) => ({
  queryKey: [roleKey, args.id],
  queryFn: () => role(args),
})

export const createRole = async (args: CreateRoleMutationVariables) => {
  return gqlClient.request(CreateRoleDocument, args)
}

export const updateRole = async (args: UpdateRoleMutationVariables) => {
  return gqlClient.request(UpdateRoleDocument, args)
}

export const deleteRoles = async (args: DeleteRolesMutationVariables) => {
  return gqlClient.request(DeleteRolesDocument, args)
}

export const roleSchema = z.object({
  title,
  abbr,
  color,
  permissionItems: json,
})
