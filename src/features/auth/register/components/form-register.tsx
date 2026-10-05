import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { useActionData, useNavigation } from 'react-router-dom'

import { registerSchema } from '@/model/user'
import {
  Form,
  FormAction,
  FormControl,
  FormLabel,
  FormMain,
  Input,
  InputIcase,
} from '@nui/form'
import { InputPhone } from '@nui/form/input/components/phone'
import useFormHelper from '@nui/hooks/use-form-helper'
import Button from '@nui/ui/button'
import Icon from '@nui/ui/icon'
import { usePopupDialog } from '@nui/ui/popup-dialog'

import {
  AuthBackLink,
  AuthCard,
  AuthHeading,
  AuthSubtitle,
  AuthTitle,
} from '../../components/auth.style'
import {
  AuthRegisterActionData,
  REGISTER_ERROR_CUSTOMER_NOT_FOUND,
} from '../pages/register.route'

export default function AuthFormRegister() {
  const actionData = useActionData() as AuthRegisterActionData | undefined

  const isNotFound = actionData?.code === REGISTER_ERROR_CUSTOMER_NOT_FOUND

  const { openPopup } = usePopupDialog()

  // Reopen on every submit that returns the not found error
  useEffect(() => {
    if (!isNotFound) return

    openPopup({
      title: 'Data Not Found',
      message:
        "We couldn't find your details in our system. Live Chat is for registered patients only. Feel free to contact us if you think this is a mistake.",
      closable: true,
    })
  }, [actionData, isNotFound, openPopup])

  const isSubmitting = useNavigation().state !== 'idle'

  const { methods, onSubmit } = useFormHelper({
    schema: registerSchema,
  })

  const {
    control,
    watch,
    formState: { errors },
  } = methods

  const values = watch([
    'name',
    'email',
    'phone',
    'password',
    'password_confirmation',
  ])

  const isFilled = values.every(Boolean)

  return (
    <AuthCard>
      <AuthBackLink to="/login">
        <Icon icon="lucide-arrow-left" size="2xs" />
        Back to Login
      </AuthBackLink>
      <AuthHeading>
        <AuthTitle>Account Activation</AuthTitle>
        <AuthSubtitle>
          Enter your registered clinic details and create a password to get
          started.
        </AuthSubtitle>
      </AuthHeading>
      <Form onSubmit={onSubmit}>
        <FormMain gap="sm">
          <FormControl required error={errors.name}>
            <FormLabel>Fullname</FormLabel>
            <Controller
              name="name"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="e.g. Budi Santoso"
                  autoComplete="name"
                  {...field}
                />
              )}
            />
          </FormControl>
          <FormControl required error={errors.email}>
            <FormLabel>Email</FormLabel>
            <Controller
              name="email"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <InputIcase
                  displayCase="lower"
                  allowSpace={false}
                  placeholder="you@email.com"
                  autoComplete="email"
                  {...field}
                />
              )}
            />
          </FormControl>
          <FormControl required error={errors.phone}>
            <FormLabel>Phone Number</FormLabel>
            <Controller
              name="phone"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <InputPhone placeholder="8XX-XXXX-XXXX" {...field} />
              )}
            />
          </FormControl>
          <FormControl required error={errors.password}>
            <FormLabel>Password</FormLabel>
            <Controller
              name="password"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...field}
                />
              )}
            />
          </FormControl>
          <FormControl required error={errors.password_confirmation}>
            <FormLabel>Confirm Password</FormLabel>
            <Controller
              name="password_confirmation"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  {...field}
                />
              )}
            />
          </FormControl>
        </FormMain>
        <FormAction className="!pt-3">
          <Button
            type="submit"
            wider="full"
            fontWeight="medium"
            disabled={!isFilled || isSubmitting}
          >
            {isSubmitting ? 'Activating...' : 'Activate Account'}
          </Button>
        </FormAction>
      </Form>
    </AuthCard>
  )
}
