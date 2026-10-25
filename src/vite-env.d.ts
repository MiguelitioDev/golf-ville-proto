/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_INQUIRY_WHATSAPP?: string
  readonly VITE_INQUIRY_EMAIL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
