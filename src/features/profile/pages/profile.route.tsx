import { omit } from 'lodash'
import { ActionFunctionArgs } from 'react-router-dom'

import { queryClient } from '@libs/query-client'
import notify, { UpdateSuccess } from '@nui/hooks/use-notif'

import { meQuery, profileSchema, updateProfile } from '@models/user/user'

import { UpdateProfileInput } from '../../../../generated/gql/graphql'

export async function profileLoader() {
  const q = meQuery({})

  return queryClient.ensureQueryData(q)
}

export async function profileAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const data = profileSchema.parse(Object.fromEntries(formData))

  await updateProfile({
    data: omit(data, ['retypePassword']) as UpdateProfileInput,
  })

  // await queryClient.invalidateQueries({ queryKey: [userKey] })
  // await queryClient.invalidateQueries({ queryKey: [clinicKey] })

  await queryClient.invalidateQueries()

  notify(UpdateSuccess)

  return null
}
