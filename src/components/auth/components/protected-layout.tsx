import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'

import { AuthProvider } from '../provider'
import { AuthProtectedLayoutProps, AuthenticatedUser } from '../types'
import { AuthGuard } from './guard'

export function AuthProtectedLayout({ children }: AuthProtectedLayoutProps) {
  // const { userData } = useLoaderData() as { userData: AuthenticatedUser }

  return (
    <Suspense>
      <Await resolve={false}>
        {(user) => (
          <AuthProvider userData={user ?? null}>
            <AuthGuard>{children}</AuthGuard>
          </AuthProvider>
        )}
      </Await>
    </Suspense>
  )
}
