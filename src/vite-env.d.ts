/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_ENDPOINT: string
  // Socket.IO server (no path) and its HTTP path, e.g. /crm/socket.io behind the gateway
  readonly VITE_SOCKET_ENDPOINT: string
  readonly VITE_SOCKET_PATH: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
