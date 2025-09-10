import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema:
    process.env.VITE_GQL_CODEGEN_ENDPOINT ?? process.env.VITE_GQL_ENDPOINT,
  documents: ['src/**/*.tsx', 'src/**/*.gql'],
  ignoreNoDocuments: true,
  generates: {
    './generated/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
