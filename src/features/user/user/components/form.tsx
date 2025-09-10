import { Controller } from 'react-hook-form'

import RoleItemSelect from '@/components/role-item-select'
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
import RadioButtonGroup from '@nui/ui/radio-button-group'
import Stack from '@nui/ui/stack'

import { User } from '@gql/graphql'
import { userQuery } from '@models/user/user'

export default function UserForm() {
  const { data, formContext } = useFormHelper<User>({
    query: userQuery,
  })

  const {
    control,
    formState: { errors },
  } = formContext

  return (
    <>
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
          <FormControl error={errors.isActive}>
            <FormLabel>Status</FormLabel>
            <Controller
              name="isActive"
              defaultValue={data?.isActive ?? true}
              control={control}
              render={({ field }) => <RadioButtonGroup {...field} />}
            />
          </FormControl>
          <FormControl error={errors.roleItems} required>
            <FormLabel>Roles</FormLabel>
            <Controller
              name="roleItems"
              defaultValue="[]"
              control={control}
              render={({ field }) => (
                <RoleItemSelect defaultItems={data?.userRoles} {...field} />
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
        <FormActionButton />
      </FormAction>
    </>
  )
}
