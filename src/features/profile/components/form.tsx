import { useResponsive } from 'ahooks'
import { useEffect } from 'react'
import { Controller } from 'react-hook-form'

import { useAuth } from '@/components/auth'
import {
  FormAction,
  FormActionButton,
  FormControl,
  FormLabel,
  FormMain,
  FormSection,
  Input,
  InputIcase,
  Textarea,
} from '@nui/form'
import { InputPhone } from '@nui/form/input/components/phone'
import useFormHelper from '@nui/hooks/use-form-helper'
import Item from '@nui/ui/item'
import Section from '@nui/ui/section'
import Spacer from '@nui/ui/spacer'
import Stack from '@nui/ui/stack'
import WidgetUserPicture from '@nui/widgets/widget-user-picture'

import { User } from '@gql/graphql'
import { meQuery } from '@models/user/user'

export default function ProfileForm() {
  const { xl } = useResponsive()

  const { assignData } = useAuth()

  const { data, formContext } = useFormHelper<User>({
    args: {},
    query: meQuery,
  })

  const {
    control,
    formState: { errors },
  } = formContext

  useEffect(() => {
    assignData({
      username: data?.email,
      fullname: data?.name,
      avatar: null,
    })
  }, [assignData, data])

  return (
    <>
      {!xl && (
        <Section>
          <Spacer />
          <Controller
            name="avatarAssetId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <WidgetUserPicture
                resourceKey="user|avatar_asset_id"
                {...field}
              />
            )}
          />
        </Section>
      )}
      <FormMain>
        <FormSection>
          <div tw="w-3/4 sm:w-2/3">
            <FormControl error={errors.name} required>
              <FormLabel>Name</FormLabel>
              <Controller
                name="name"
                defaultValue={data?.name ?? ''}
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="User name" />
                )}
              />
            </FormControl>
          </div>
          <Stack tw="flex flex-col sm:flex-row">
            <Item tw="w-full">
              <FormControl error={errors.email} required>
                <FormLabel>Email</FormLabel>
                <Controller
                  name="email"
                  defaultValue={data?.email ?? ''}
                  control={control}
                  render={({ field }) => (
                    <InputIcase
                      displayCase="lower"
                      allowSpace={false}
                      {...field}
                      placeholder="User email"
                    />
                  )}
                />
              </FormControl>
            </Item>
            <Item tw="w-full">
              <FormControl error={errors.phone} required>
                <FormLabel>Mobile Number</FormLabel>
                <Controller
                  name="phone"
                  defaultValue={data?.phone ?? ''}
                  control={control}
                  render={({ field }) => <InputPhone {...field} />}
                />
              </FormControl>
            </Item>
          </Stack>

          <FormControl error={errors.notes}>
            <FormLabel>Notes</FormLabel>
            <Controller
              name="notes"
              defaultValue={data?.notes ?? ''}
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  name="notes"
                  placeholder="Write your note"
                />
              )}
            />
          </FormControl>

          <Stack tw="flex flex-col sm:flex-row">
            <Item tw="w-full">
              <FormControl error={errors.password} required>
                <FormLabel>Password</FormLabel>
                <Controller
                  name="password"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="password" placeholder="Password" />
                  )}
                />
              </FormControl>
            </Item>
            <Item tw="w-full">
              <FormControl error={errors.retypePassword} required>
                <FormLabel>Re-Type Password</FormLabel>
                <Controller
                  name="retypePassword"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="password"
                      placeholder="Re-Type Password"
                    />
                  )}
                />
              </FormControl>
            </Item>
          </Stack>
        </FormSection>
      </FormMain>
      <FormAction>
        <FormActionButton label="Update" />
      </FormAction>
    </>
  )
}
