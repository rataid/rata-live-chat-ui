import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import '@/styles/main.css'

import App from './_app'
import './features/home/install-prompt'
import { prepareWebPush } from './features/livechat/push/push-client'
import './styles/cropper.css'
import GlobalStyles from './styles/global-styles'
import './styles/slick-theme.css'

void prepareWebPush().catch(() => undefined)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <GlobalStyles />
    <App />
  </StrictMode>
)
