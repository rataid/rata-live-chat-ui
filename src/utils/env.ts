/* eslint-disable @typescript-eslint/no-empty-interface */

/* eslint-disable @typescript-eslint/no-namespace */
import { z } from 'zod'

const envVars = z.object({
  VITE_APP_TITLE: z.string(),
  VITE_APP_URL: z.string(),

  VITE_MIDTRANS_IS_PRODUCTION: z.string(),
  VITE_MIDTRANS_CLIENT_KEY: z.string(),
  VITE_MIDTRANS_PAYMENT_REQUEST_URL: z.string(),

  VITE_GQL_ENDPOINT: z.string(),
  VITE_GQL_UPLOAD_ENDPOINT: z.string(),
  VITE_GQL_CODEGEN_ENDPOINT: z.string(),
})

envVars.parse(process.env)

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVars> {}
  }
}
