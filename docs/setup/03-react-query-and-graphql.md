REACT QUERY AND GRAPHQL - STACKBOARD SETUP

# React Query

TanStack Query
Powerful asynchronous state management for TS/JS, React, Solid, Vue and Svelte

Install react-query

```
pnpm add @tanstack/react-query
```

# GraphQL

## GraphQL client

Minimal GraphQL client supporting Node and browsers for scripts or simple apps

```
pnpm add graphql-request graphql
```

## GraphQL Code Generator

GraphQL Code Generator is a plugin-based tool that helps you get the best out of your GraphQL stack.
https://the-guild.dev/graphql/codegen/docs/getting-started

Install codegen

```
pnpm add graphql @graphql-typed-document-node/core
pnpm add -D typescript ts-node @graphql-codegen/cli @graphql-codegen/client-preset dotenv
```

Codegen init

```
pnpm graphql-code-generator init
? What type of application are you building? Application built with React
? Where is your schema?: (path or url) http://localhost:4000/graphql
? Where are your operations and fragments?: src/**/*.tsx
? Where to write the output: ./generated/gql/
? Do you want to generate an introspection file? No
? How to name the config file? codegen.ts
? What script in package.json should run the codegen? codegen
```

Config codegen

[codegen.ts]

```
import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4000/graphql',
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
```

Modify dev script on package.json

[package.json]

```
"scripts": {
  ...
  "dev": "concurrently -c auto --names \"vite,codegen\" \"vite\" \"pnpm codegen --watch\"",
  ...
  "codegen": "graphql-codegen --require dotenv/config --config codegen.ts"
  ...
}
```

## VSCode - Graphql LSP

Install graphql-config

```
pnpm add graphql-config
```

Install VSCode addon: Graphql LSP
Create config file on the root directory

[graphql.config.cjs]

```
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
1
module.exports = {
  projects: {
    app: {
      schema: process.env.VITE_GQL_ENDPOINT,
      documents: 'src/**/*.gql',
    },
  },
}
```

Include this file to tsconfig.eslint.json

```
{
  "include": [
    ...
    "graphql.config.cjs",
    ...
  ],
}
```
