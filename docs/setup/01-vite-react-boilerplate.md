VITE REACT BOILERPLATE - STACKBOARD SETUP
Vite, Typescript, ESlint, and Prettier

# Vite

Init Vite

```
pnpm create vite
```

Create .npmrc to auto install peer dependencies

[.npmrc]

```
auto-install-peers=true
```

```
pnpm i
```

Add vite-tsconfig-paths plugin
Give vite the ability to resolve imports using TypeScript's path mapping.
https://www.npmjs.com/package/vite-tsconfig-paths

```
pnpm add -D vite-tsconfig-paths
```

Inject vite-tsconfig-paths using the vite.config.ts module

[vite.config.ts]

```
...
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    ...
    tsconfigPaths(), // Add this line
    react(),
    ],
})
```

## Primary source directories

Create folling folder at ./src

```
mkdir -p ./src/config
mkdir -p ./src/features
mkdir -p ./src/libs
mkdir -p ./src/models
mkdir -p ./src/utils

mkdir -p ./generated/gql
```

# TypeScript

Config TypeScript custom path

[tsconfig.json]

```
{
  "compilerOptions": {

     // Add these lines
    "baseUrl": "./src",
    "paths": {
      "@config/*": ["config/*"],
      "@features/*": ["features/*/index", "features/*"],
      "@libs/*": ["libs/*"],
      "@models/*": ["models/*"],
      "@nui/*": ["nui/*"],
      "@utils": ["utils/index"],
      "@/*": ["*"],
      "@gql/*": ["../generated/gql/*"],
    },
  }
}
```

# ESLint

```
pnpm add -D eslint
pnpm dlx eslint --init
```

? How would you like to use ESLint?
❯ To check syntax, find problems, and enforce code style

? What type of modules does your project use?
❯ JavaScript modules (import/export)

? Which framework does your project use? …
❯ React

? Does your project use TypeScript? › Yes

? Where does your code run?
✔ Browser

? How would you like to define a style for your project?
❯ Answer questions about your style

? What format do you want your config file to be in? …
❯ JavaScript

✔ What style of indentation do you use? · spaces
✔ What quotes do you use for strings? · single
✔ What line endings do you use? · unix
✔ Do you require semicolons? · No

? Would you like to install them now? › Yes

? Which package manager do you want to use?
❯ pnpm

## AirBNB Code Styling Guide

https://www.npmjs.com/package/eslint-config-airbnb

```
npm info "eslint-config-airbnb@latest" peerDependencies
```

Install peer dependencies

```
pnpm add -D eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks eslint-config-airbnb
```

Edit .eslintrc.cjs
[.eslintrc.cjs]

```
module.exports = {
  ...
  "extends": [
      [-] "eslint:recommended",

       // Add these lines
      "airbnb",
      "airbnb/hooks",
  ],
  ...
```

AirBNB ESLint TypeScript support
https://www.npmjs.com/package/eslint-config-airbnb-typescript

```
pnpm add -D eslint-config-airbnb-typescript
```

Create tsconfig.eslint.json
[tsconfig.eslint.json]

```
{
  "include": [
    ".eslintrc.cjs",
    "tailwind.config.cjs",
    "vite.config.ts"
  ]
}
```

Edit .eslintrc.cjs
[.eslintrc.cjs]

```
module.exports = {
  ...
  "extends": [
      "airbnb",
      "airbnb-typescript", // Add this line
      "airbnb/hooks",
  ],
  ...
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.eslint.json'], // Modify this line
  }
  ...
}
```

Path mapping for '@' to './src'
https://stackoverflow.com/questions/67835072/vue-3-on-vite-js-with-eslint-unable-to-resolve-path-to-module-eslintimport-no/68908814#68908814

```
pnpm add -D eslint-import-resolver-alias
```

Edit ESlint config

[.eslintrc.cjs]

```
module.exports = {
  ...
  // Add this lines
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  ...
}
```

## ESLint rules

Override ESLint rules

[.eslintrc.cjs]

```
module.exports = {
  rules: {
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    // indent: ['error', 2, { ignoreNodes: ['ConditionalExpression'] }],
    'no-console': 0,
    'no-param-reassign': ['error', { props: false }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'import/prefer-default-export': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-unknown-property': ['error', { ignore: ['tw', 'css'] }],
    'react/require-default-props': 0,
  },
}
```

# Prettier

Install prettier

```
pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier
```

Create prettier config
https://prettier.io/docs/en/configuration.html

[.prettierrc.cjs]

```
module.exports = {
  trailingComma: "es5",
  tabWidth: 2,
  semi: false,
  singleQuote: true,
}
```

Edit .eslintrc.cjs

[.eslintrc.cjs]

```
module.exports = {
  ...
  "extends": [
      [+] "plugin:prettier/recommended", //Must be last
  ],
  ...
}
```

Prettier plugins

## Sort imports

```
pnpm add -D @trivago/prettier-plugin-sort-imports
```

[.prettierrc.cjs]

```
module.exports = {
  ...
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  ...
  // @trivago/prettier-plugin-sort-imports
  importOrder: [
    '^@(config|libs|nui|utils)?/(.*)$',
    '^@(features|models|gql)/(.*)$',
    '^[./]',
  ],
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderSeparation: true,
}
```
