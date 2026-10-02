import { createGlobalStyle } from 'styled-components'
import { nuiColorCssVariables } from '@nui/theme/colors'

// Default text color (#23262d, gray-900 in colors.cjs) is set on body in main.css
const CustomStyles = createGlobalStyle`
  :root {
    ${nuiColorCssVariables}
  }

  body {
    -webkit-tap-highlight-color: var(--nui-color-transparent);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

function GlobalStyles() {
  return (
    <>
      <CustomStyles />
    </>
  )
}

export default GlobalStyles
