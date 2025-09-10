import { GraphQLClient } from 'graphql-request'
import { assign } from 'lodash'

import { getToken, isTokenValid } from '@/components/auth/helpers'
import { gqlErrorMessage, throwError } from '@utils'

const client = new GraphQLClient(import.meta.env.VITE_GQL_ENDPOINT, {
  requestMiddleware: async (request) => {
    const token = getToken() || ''

    if (isTokenValid(token)) {
      assign(request.headers, {
        Authorization: `Bearer ${token}`,
      })
    }

    return request
  },
  responseMiddleware(response) {
    if (response instanceof Error) {
      const error = gqlErrorMessage(response)
      throwError(error.statusCode, error.message)
    }

    return response
  },
})

export default client
