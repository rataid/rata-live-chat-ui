import { Controller } from 'react-hook-form'

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

export default function UserForm() {
  // const { data, formContext } = useFormHelper<User>({
  //   query: userQuery,
  // })

  // const {
  //   control,
  //   formState: { errors },
  // } = formContext

  return (
    <>
      <FormMain>
        <FormSection>
          <div tw="w-3/4 sm:w-2/3">
            <FormControl required>
              <FormLabel>Name</FormLabel>
              <Controller
                name="name"
                // defaultValue={data?.name ?? ''}
                // control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="User name" />
                )}
              />
            </FormControl>
          </div>
          <Stack tw="flex flex-col sm:flex-row">
            <Item tw="w-full">
              <FormControl required>
                <FormLabel>Email</FormLabel>
                <Controller
                  name="email"
                  // defaultValue={data?.email ?? ''}
                  // control={control}
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
              <FormControl required>
                <FormLabel>Mobile Number</FormLabel>
                <Controller
                  name="phone"
                  // defaultValue={data?.phone ?? ''}
                  // control={control}
                  render={({ field }) => <InputPhone {...field} />}
                />
              </FormControl>
            </Item>
          </Stack>

          <FormControl >
            <FormLabel>Notes</FormLabel>
            <Controller
              name="notes"
              // defaultValue={data?.notes ?? ''}
              // control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  name="notes"
                  placeholder="Write your note"
                />
              )}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Controller
              name="isActive"
              // defaultValue={data?.isActive ?? true}
              // control={control}
              render={({ field }) => <RadioButtonGroup {...field} />}
            />
          </FormControl>

          <Stack tw="flex flex-col sm:flex-row">
            <Item tw="w-full">
              <FormControl required>
                <FormLabel>Password</FormLabel>
                <Controller
                  name="password"
                  defaultValue=""
                  // control={control}
                  render={({ field }) => (
                    <Input {...field} type="password" placeholder="Password" />
                  )}
                />
              </FormControl>
            </Item>
            <Item tw="w-full">
              <FormControl required>
                <FormLabel>Re-Type Password</FormLabel>
                <Controller
                  name="retypePassword"
                  defaultValue=""
                  // control={control}
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
