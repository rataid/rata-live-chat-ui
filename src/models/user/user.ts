import { z } from 'zod'

import gqlClient from '@libs/gql-client'

import {
  CreateUserDocument,
  CreateUserMutationVariables,
  DeleteUsersDocument,
  DeleteUsersMutationVariables,
  LoginDocument,
  LoginMutationVariables,
  MeDocument,
  MeQueryVariables,
  UpdateProfileDocument,
  UpdateProfileMutationVariables,
  UpdateUserDocument,
  UpdateUserMutationVariables,
  UserDocument,
  UserQueryVariables,
  UsersDocument,
  UsersQueryVariables,
} from '@gql/graphql'
import {
  allowEmpty,
  allowNull,
  bool,
  email,
  id,
  json,
  name,
  notes,
  password,
  phone,
} from '@models/shared/validations'

export const userKey = 'user'
export const meKey = 'me'

export const users = async (args: UsersQueryVariables) => {
  const result = await gqlClient.request(UsersDocument, args)

  return result.users
}

export const usersQuery = (args: UsersQueryVariables) => ({
  queryKey: [userKey, args],
  queryFn: () => users(args),
})

export const user = async (args: UserQueryVariables) => {
  if (!args.id) return null

  const result = await gqlClient.request(UserDocument, args)

  return result.user
}

export const userQuery = (args: UserQueryVariables) => ({
  queryKey: [userKey, args.id],
  queryFn: () => user(args),
})

export const me = async (args: MeQueryVariables) => {
  const result = await gqlClient.request(MeDocument, args)
  return result.me
}

export const meQuery = (args: MeQueryVariables) => ({
  queryKey: [meKey],
  queryFn: () => me(args),
})

export const createUser = async (args: CreateUserMutationVariables) => {
  return gqlClient.request(CreateUserDocument, args)
}

export const updateUser = async (args: UpdateUserMutationVariables) => {
  return gqlClient.request(UpdateUserDocument, args)
}

export const updateProfile = async (args: UpdateProfileMutationVariables) => {
  return gqlClient.request(UpdateProfileDocument, args)
}

export const deleteUsers = async (args: DeleteUsersMutationVariables) => {
  return gqlClient.request(DeleteUsersDocument, args)
}

export const login = async (args: LoginMutationVariables) => {
  return gqlClient.request(LoginDocument, args)
}

export const userSchema = z.object({
  name,
  email,
  phone,
  notes: allowNull(notes),
  isActive: bool,
  roleItems: json,
})

export const createUserSchema = userSchema.extend({
  password,
  retypePassword: password,
})

export const editUserSchema = userSchema.extend({
  password: allowEmpty(password),
  retypePassword: allowEmpty(password),
})

export const profileSchema = z.object({
  avatarAssetId: allowNull(id),
  name,
  email,
  phone,
  notes: allowNull(notes),
  password: allowEmpty(password),
  retypePassword: allowEmpty(password),
})

export const loginSchema = z.object({
  email,
  password,
})
