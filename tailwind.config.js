/* eslint-disable global-require */
import plugin from 'tailwindcss/plugin'
import colors from './src/config/tailwind/colors.cjs'
import twColors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
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
      colors: {
        ...twColors,
        ...colors,
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          ...colors.primary,
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-animate'),
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
  ],
}
