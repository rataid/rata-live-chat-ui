import { createGlobalStyle } from 'styled-components'
import { nuiColorCssVariables } from '@nui/theme/colors'

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
