export const nuiColors = {
  white: '#fff',
  transparent: 'transparent',
  gray: {
    25: '#fcfcfd',
    50: '#f9fafb',
    100: '#f2f4f7',
    200: '#eaecf0',
    300: '#d0d5dd',
    400: '#98a2b3',
    500: '#667085',
    600: '#475467',
    700: '#344054',
    800: '#1d2939',
    900: '#101828',
  },
  neutral: {
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#eee',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
  },
  primary: {
    100: '#BDE9F2',
    300: '#66C5E0',
    400: '#33AFD6',
    500: '#0099CC',
    600: '#0077A6',
    700: '#00608A',
    800: '#004C6D',
    900: '#003B52',
  },
  success: {
    600: '#039855',
  },
  warning: {
    600: '#dc6803',
  },
  danger: {
    200: '#fecdca',
    400: '#f97066',
    500: '#f04438',
    600: '#d92d20',
  },
  blue: {
    body: 'blue',
  },
} as const

export const nuiColorVars = {
  white: 'var(--nui-color-white)',
  transparent: 'var(--nui-color-transparent)',
  gray: {
    25: 'var(--nui-color-gray-25)',
    50: 'var(--nui-color-gray-50)',
    100: 'var(--nui-color-gray-100)',
    200: 'var(--nui-color-gray-200)',
    300: 'var(--nui-color-gray-300)',
    400: 'var(--nui-color-gray-400)',
    500: 'var(--nui-color-gray-500)',
    600: 'var(--nui-color-gray-600)',
    700: 'var(--nui-color-gray-700)',
    800: 'var(--nui-color-gray-800)',
    900: 'var(--nui-color-gray-900)',
  },
  neutral: {
    100: 'var(--nui-color-neutral-100)',
    200: 'var(--nui-color-neutral-200)',
    300: 'var(--nui-color-neutral-300)',
    400: 'var(--nui-color-neutral-400)',
    500: 'var(--nui-color-neutral-500)',
    600: 'var(--nui-color-neutral-600)',
  },
  primary: {
    100: 'var(--nui-color-primary-100)',
    300: 'var(--nui-color-primary-300)',
    400: 'var(--nui-color-primary-400)',
    500: 'var(--nui-color-primary-500)',
    600: 'var(--nui-color-primary-600)',
    700: 'var(--nui-color-primary-700)',
    800: 'var(--nui-color-primary-800)',
    900: 'var(--nui-color-primary-900)',
  },
  success: {
    600: 'var(--nui-color-success-600)',
  },
  warning: {
    600: 'var(--nui-color-warning-600)',
  },
  danger: {
    200: 'var(--nui-color-danger-200)',
    400: 'var(--nui-color-danger-400)',
    500: 'var(--nui-color-danger-500)',
    600: 'var(--nui-color-danger-600)',
  },
  blue: {
    body: 'var(--nui-color-blue-body)',
  },
} as const

function flattenColorVars(
  value: Record<string, unknown>,
  prefix = '--nui-color'
): string[] {
  return Object.entries(value).flatMap(([key, color]) => {
    const varName = `${prefix}-${key}`

    if (typeof color === 'string') {
      return `${varName}: ${color};`
    }

    return flattenColorVars(color as Record<string, unknown>, varName)
  })
}

export const nuiColorCssVariables = flattenColorVars(nuiColors).join('\n')
