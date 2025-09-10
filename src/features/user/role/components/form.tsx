import { Controller } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import PermissionChecklist, {
  PermissionChecklistProvider,
} from '@/components/permission-checklist'
import {
  ColorPicker,
  FormAction,
  FormActionButton,
  FormControl,
  FormLabel,
  FormMain,
  FormSection,
  Input,
} from '@nui/form'
import { InputIcase } from '@nui/form/input/components/icase'
import useFormHelper from '@nui/hooks/use-form-helper'
import Item from '@nui/ui/item'
import Stack from '@nui/ui/stack'
import Typo from '@nui/ui/typo'

import { Role } from '@gql/graphql'
import { roleQuery, roleSchema } from '@models/role/role'

import { roleArgs } from '../pages/edit.route'

export default function RoleForm() {
  const { id } = useParams()

  const { data, formContext } = useFormHelper<Role>({
    args: roleArgs(id),
    query: roleQuery,
    schema: roleSchema,
  })

  const {
    control,
    formState: { errors },
  } = formContext

  return (
    <>
      <FormMain>
        <FormSection>
          <Stack>
            <Item tw="basis-[70%] sm:basis-1/2">
              <FormControl error={errors.title} required>
                <FormLabel>Name</FormLabel>
                <Controller
                  name="title"
                  defaultValue={data?.title ?? ''}
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Title" />
                  )}
                />
              </FormControl>
            </Item>

            <Item tw="basis-[30%] sm:basis-1/2">
              <FormControl error={errors.abbr} required>
                <FormLabel>Abbr</FormLabel>
                <Controller
                  name="abbr"
                  defaultValue={data?.abbr ?? ''}
                  control={control}
                  render={({ field }) => (
                    <InputIcase
                      allowSpace={false}
                      {...field}
                      placeholder="Abbr"
                    />
                  )}
                />
              </FormControl>
            </Item>
          </Stack>

          <Stack>
            <Item tw="basis-[70%] sm:basis-1/2">
              <FormControl error={errors.color} required>
                <FormLabel>Color</FormLabel>
                <Controller
                  name="color"
                  defaultValue={data?.color ?? '#9e77ed'}
                  control={control}
                  render={({ field }) => (
                    <ColorPicker {...field} placeholder="Color" />
                  )}
                />
              </FormControl>
            </Item>
            <Item tw="basis-[30%] sm:basis-1/2">
              <div />
            </Item>
          </Stack>

          <FormControl error={errors.permissionItems} required>
            <FormLabel>
              <Typo fontWeight="bold" size="md" color="gray-900">
                PERMISSIONS
              </Typo>
            </FormLabel>
            <Controller
              name="permissionItems"
              defaultValue="[]"
              control={control}
              render={({ field }) => (
                <PermissionChecklistProvider defaultItems={data?.permissions}>
                  <PermissionChecklist {...field} />
                </PermissionChecklistProvider>
              )}
            />
          </FormControl>
        </FormSection>
      </FormMain>
      <FormAction>
        <FormActionButton />
      </FormAction>
    </>
  )
}
