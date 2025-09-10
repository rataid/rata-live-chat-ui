/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

module.exports = {
  projects: {
    app: {
      schema: process.env.VITE_GQL_ENDPOINT,
      documents: 'src/**/*.gql',
    },
  },
}
