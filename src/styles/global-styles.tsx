import { createGlobalStyle } from 'styled-components'
import tw, { GlobalStyles as BaseStyles } from 'twin.macro'

const CustomStyles = createGlobalStyle({
  body: {
    WebkitTapHighlightColor: 'transparent',
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
