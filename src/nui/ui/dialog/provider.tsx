import {
  createContext,
  isValidElement,
  useContext,
  useMemo,
  useState,
} from 'react'

import Button from '@nui/ui/button'
import { ButtonVariant } from '@nui/ui/button/types'

import { Dialog, DialogClose } from './dialog'
import { DialogBody, DialogFooter, DialogHeader } from './dialog.style'
import { DialogSize } from './types'

export type DialogAction = {
  label: string
  // Defaults to 'primary'
  variant?: ButtonVariant
  danger?: boolean
  onClick?: () => void
  // Set to false to keep the popup open after the click
  closeOnClick?: boolean
}

export type DialogConfig = {
  title: React.ReactNode
  message?: React.ReactNode
  // Show the X button in the header
  closable?: boolean
  actions?: DialogAction[]
}

type OpenDialogOptions = {
  size?: DialogSize
}

type DialogContextValue = {
  // Pass a config for the standard title/message/buttons layout,
  // or a React element for custom content
  openDialog: (
    content: DialogConfig | React.ReactElement,
    options?: OpenDialogOptions
  ) => void
  closeDialog: () => void
}

const DialogGlobalContext = createContext<DialogContextValue | null>(null)

export const useDialog = () => {
  const context = useContext(DialogGlobalContext)

  if (!context) {
    throw new Error('useDialog must be used inside <DialogProvider>')
  }

  return context
}

function DialogConfigContent({
  config,
  onClose,
}: {
  config: DialogConfig
  onClose: () => void
}) {
  const { title, message, closable, actions } = config
  const hasActions = !!actions?.length

  return (
    <>
      <DialogHeader>
        {title}
        {closable && <DialogClose />}
      </DialogHeader>
      {message && (
        <DialogBody className={hasActions ? undefined : '!border-b-0'}>
          {message}
        </DialogBody>
      )}
      {hasActions && (
        <DialogFooter>
          {actions.map((action) => (
            <Button
              key={action.label}
              variant={action.variant ?? 'primary'}
              danger={action.danger}
              fontWeight="medium"
              onClick={() => {
                action.onClick?.()
                if (action.closeOnClick !== false) onClose()
              }}
            >
              {action.label}
            </Button>
          ))}
        </DialogFooter>
      )}
    </>
  )
}

// Mounted once in _app.tsx as the pathless root route, so popup content can use
// router hooks (Button relies on useNavigation)
export function DialogProvider({ children }: React.PropsWithChildren) {
  const [content, setContent] = useState<
    DialogConfig | React.ReactElement | null
  >(null)
  const [size, setSize] = useState<DialogSize>('md')

  // Kept separate from `content` so it stays rendered while the dialog fades out
  const [open, setOpen] = useState(false)

  const value = useMemo<DialogContextValue>(
    () => ({
      openDialog: (nextContent, options) => {
        setContent(nextContent)
        setSize(options?.size ?? 'md')
        setOpen(true)
      },
      closeDialog: () => setOpen(false),
    }),
    []
  )

  return (
    <DialogGlobalContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen} size={size}>
        {content && !isValidElement(content) ? (
          <DialogConfigContent
            config={content as DialogConfig}
            onClose={value.closeDialog}
          />
        ) : (
          content
        )}
      </Dialog>
    </DialogGlobalContext.Provider>
  )
}
