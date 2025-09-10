import { forwardRef } from 'react'
import { Form as ReactRouterForm } from 'react-router-dom'

export type FormProps = React.ComponentProps<typeof ReactRouterForm> &
  React.PropsWithChildren

export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  { method = 'post', children, ...props },
  forwadedRef
) {
  return (
    <ReactRouterForm ref={forwadedRef} method={method} {...props}>
      {children}
    </ReactRouterForm>
  )
})
