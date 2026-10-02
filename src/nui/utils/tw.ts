import styled, { css } from 'styled-components'

/**
 * Runtime Tailwind template tag.
 *
 * This helper returns Tailwind class names as a plain string so the global
 * stylesheet (src/styles/main.css) applies them. Every usage in this codebase is
 * a static literal, but interpolation and falsy filtering are supported for
 * safety.
 */
export type TwStyle = string

export function tw(
  strings: TemplateStringsArray,
  ...values: unknown[]
): TwStyle {
  const parts: string[] = []

  strings.forEach((str, i) => {
    parts.push(str)
    if (i < values.length) {
      const value = values[i]
      if (typeof value === 'string' && value.trim().length > 0) {
        parts.push(value)
      }
    }
  })

  return parts.join('').split(/\s+/).filter(Boolean).join(' ')
}

export { css, styled }
export default tw
