/* eslint-disable global-require */
import plugin from 'tailwindcss/plugin'

import colors from './src/config/tailwind/colors.cjs'

/** @type {import('tailwindcss').Config} */
export const content = [
  './src/pages/**/*.{js,ts,jsx,tsx}',
  './src/components/**/*.{js,ts,jsx,tsx}',
]

export const theme = {
  extend: {
    fontFamily: {
      sans: [
        'Plus Jakarta Sans',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
      ],
    },
    fontSize: {
      '2xs': '0.68rem',
    },
    colors,
  },
}

export const plugins = [
  require('@tailwindcss/typography'),
  require.resolve('@tailwindcss/line-clamp'),
  plugin(({ addComponents }) => {
    addComponents({
      '.rounded-border': {
        borderRadius: '0.5rem',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgb(229 231 235 / 1)',
      },
    })
  }),
]
