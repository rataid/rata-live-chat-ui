/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_ENDPOINT: string
  readonly VITE_RECAPTCHA_SITE_KEY: string
  readonly VITE_RECAPTCHA_ENABLED: string
  readonly VITE_WHATSAPP_NUMBER_CONTACT_US: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
