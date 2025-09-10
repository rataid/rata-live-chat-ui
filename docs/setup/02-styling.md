STYLING - STACKBOARD SETUP
Tailwind, Styled Components, and Twin.Macro

# Tailwind

A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.

## Tailwind Plugins

- @tailwindcss/line-clamp
  https://github.com/tailwindlabs/tailwindcss-line-clamp

  ```
  pnpm add -D @tailwindcss/line-clamp
  ```

  [tailwind.config.js]

  ```
  module.exports = {
    theme: {
      // ...
    },
    plugins: [
      require('@tailwindcss/line-clamp'),
      // ...
    ],
  }
  ```

# Styled Components / Twin.Macro

Install styled components, twin.macro and other required packages.
https://github.com/ben-rogerson/twin.examples/tree/master/vite-styled-components-typescript

```
pnpm add styled-components
pnpm add -D @types/styled-components

pnpm add -D twin.macro babel-plugin-styled-components babel-plugin-macros tailwindcss
```

Add the global styles

[src/styles/global-styles.tsx]

```
import { createGlobalStyle } from 'styled-components'
import tw, { GlobalStyles as BaseStyles, theme } from 'twin.macro'

const CustomStyles = createGlobalStyle({
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...tw`antialiased`,
  },
})

function GlobalStyles() {
  return (
    <>
      <BaseStyles />
      <CustomStyles />
    </>
  )
}

export default GlobalStyles
```

Add to package.json

[package.json]

```
"babelMacros": {
  "twin": {
    "preset": "styled-components"
  }
},
```

Add the following to your vite config:

[vite.config.ts]

```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  ...
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  esbuild: {
    // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-macros', 'babel-plugin-styled-components'],
      },
    }),
  ],
  ...
})
```

Create a types/twin.d.ts file and add these declarations:

[src/types/twin.d.ts]

```
import styledImport, { CSSProp, css as cssImport } from 'styled-components'
import 'twin.macro'

declare module 'twin.macro' {
  // The styled and css imports
  const styled: typeof styledImport
  const css: typeof cssImport
}

declare module 'react' {
  // The css prop
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp
    tw?: string
  }
  // The inline svg css prop
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface SVGProps<T> extends SVGProps<SVGSVGElement> {
    css?: CSSProp
    tw?: string
  }
}

// The 'as' prop on styled components
declare global {
  namespace JSX {
    interface IntrinsicAttributes<T> extends DOMAttributes<T> {
      as?: string | Element
    }
  }
}

```

Create tailwind config for tailwind plugin installation later (optional)
https://github.com/ben-rogerson/twin.macro/blob/master/docs/customizing-config.md

```
pnpm dlx tailwindcss init -p
```

Then, remove postcss.config.cjs

Install VSCode plugin for twin
https://github.com/ben-rogerson/twin.macro/discussions/227

1. Tailwind CSS IntelliSense
2. Tailwind Twin IntelliSense

Install Babel Plugin Twin
https://github.com/ben-rogerson/babel-plugin-twin

This plugin automatically adds the tw prop from twin.macro - no import required:

```
pnpm add -D babel-plugin-twin
```

Then add the plugin to your babel config:

[vite.config.ts]

```
export default defineConfig({
  ...
  plugins: [
    ...
    react({
      babel: {
        plugins: [
          ...
          // Add these line
          [
            'babel-plugin-twin',
            {
              exclude: [
                // https://github.com/ben-rogerson/babel-plugin-twin/issues/9
                '\x00commonjsHelpers.js', // Avoid build error
              ],
            },
          ],
          ...
        ],
      },
    }),
    ...
  ],
})
```

Edit ESLint to ignore 'tw' on HTML props
[.eslintrc.cjs]

```
module.exports = {
  ...
  rules: {
    ...
    'react/no-unknown-property': ['error', { ignore: ['tw', 'css'] }],
    ...
  },
  ...
}
```

Install Prettier for Tailwind and Twin

```
pnpm add -D prettier-plugin-tailwindcss prettier-plugin-twin.macro
```

Edit Prettier config

[.prettierrc.cjs]

```
module.exports = {
  ...
  plugins: [
    // Add these lines
    // !!! Place before prettier-plugin-sort-imports !!!
    require.resolve('prettier-plugin-twin.macro'),
    require.resolve('prettier-plugin-tailwindcss'),
  ],
  ...
}
```
