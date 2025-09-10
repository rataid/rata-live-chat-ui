import { Controller } from 'react-hook-form'
import { useActionData } from 'react-router-dom'

import { LogoSmiledental } from '@/assets'
import {
  Form,
  FormAction,
  FormControl,
  FormLabel,
  FormMain,
  Input,
  InputIcase,
} from '@nui/form'
import useFormHelper from '@nui/hooks/use-form-helper'
import Button from '@nui/ui/button'
import Typo from '@nui/ui/typo'

import { loginSchema } from '@models/user/user'

import {
  AuthFormLoginForm,
  AuthFormLoginHeading,
  AuthFormLoginMain,
  AuthFormLoginMainImage,
  AuthFormLoginMainInner,
  AuthFormLoginSubtitle,
  AuthFormLoginTitle,
} from './form-login.style'

export default function AuthFormLogin() {
  const { success, message } =
    (useActionData() as { success: boolean; message: string }) ?? {}

  const { methods, onSubmit } = useFormHelper({
    schema: loginSchema,
  })

  const {
    control,
    formState: { errors },
  } = methods

  return (
    <AuthFormLoginMain>
      <AuthFormLoginMainInner>
        <AuthFormLoginMainImage>
          <div tw="w-[8.125rem]">
            <LogoSmiledental />
          </div>
        </AuthFormLoginMainImage>
        <AuthFormLoginHeading>
          <AuthFormLoginTitle>Welcome back</AuthFormLoginTitle>
          <AuthFormLoginSubtitle>
            Please enter your credential to login
          </AuthFormLoginSubtitle>
        </AuthFormLoginHeading>
        <AuthFormLoginForm>
          {success === false && (
            <div tw="text-red-500 text-sm my-4">{message}</div>
          )}
          <Form onSubmit={onSubmit}>
            <FormMain gap="xs">
              <FormControl error={errors.email} required>
                <FormLabel>Email</FormLabel>
                <Controller
                  name="email"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <InputIcase
                      displayCase="lower"
                      allowSpace={false}
                      {...field}
                    />
                  )}
                />
              </FormControl>
              <FormControl error={errors.password} required>
                <FormLabel>Password</FormLabel>
                <Controller
                  name="password"
                  defaultValue=""
                  control={control}
                  render={({ field }) => <Input type="password" {...field} />}
                />
              </FormControl>
              {/* <AuthFormLoginMore>
                <FormInline>
                  <Controller
                    name="remember"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <Checkbox {...field}>Remember me</Checkbox>
                    )}
                  />
                </FormInline>
                <Button
                  variant="link"
                  size="sm"
                  noPadding
                  to="/forgot-password"
                >
                  Forgot password?
                </Button>
              </AuthFormLoginMore> */}
            </FormMain>
            <FormAction>
              <Button type="submit" wider="full">
                Signin
              </Button>
            </FormAction>
          </Form>
        </AuthFormLoginForm>
        <Typo tw="text-center">© 2023 - Rata Apps</Typo>
      </AuthFormLoginMainInner>
    </AuthFormLoginMain>
  )
}
