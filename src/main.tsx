import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import '@/styles/main.css'

import App from './_app'
import './styles/cropper.css'
import GlobalStyles from './styles/global-styles'
import './styles/slick-theme.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <GlobalStyles />
    <App />
  </StrictMode>
)
