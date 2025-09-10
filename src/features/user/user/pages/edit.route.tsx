import { omit } from 'lodash'
import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router-dom'

import { queryClient } from '@libs/query-client'
import notify, { UpdateSuccess, notifyError } from '@nui/hooks/use-notif'
import { idArgs } from '@utils'

import { UpdateUserInput, UserQueryVariables } from '@gql/graphql'
import {
  editUserSchema,
  updateUser,
  userKey,
  userQuery,
} from '@models/user/user'

export const userArgs = idArgs<UserQueryVariables>()

export async function userEditLoader({ params }: LoaderFunctionArgs) {
  const { id } = params
  const q = userQuery(userArgs(id))

  return queryClient.ensureQueryData(q)
}

export async function userEditAction({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData()
  const data = editUserSchema.parse(Object.fromEntries(formData))

  try {
    await updateUser({
      data: omit(data, ['retypePassword']) as UpdateUserInput,
      where: { id: params.id },
    })
    await queryClient.invalidateQueries({ queryKey: [userKey] })
    notify(UpdateSuccess)
  } catch (error: any) {
    const message = await error?.text()
    notifyError(message)
  }

  return null
}
