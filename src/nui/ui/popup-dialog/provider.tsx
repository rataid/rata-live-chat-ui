import {
  createContext,
  isValidElement,
  useContext,
  useMemo,
  useState,
} from 'react'

import Button from '@nui/ui/button'
import { ButtonVariant } from '@nui/ui/button/types'

import { PopupDialog, PopupDialogClose } from './popup-dialog'
import {
  PopupDialogBody,
  PopupDialogFooter,
  PopupDialogHeader,
} from './popup-dialog.style'
import { PopupDialogSize } from './types'

export type PopupDialogAction = {
  label: string
  // Defaults to 'primary'
  variant?: ButtonVariant
  danger?: boolean
  onClick?: () => void
  // Set to false to keep the popup open after the click
  closeOnClick?: boolean
}

export type PopupDialogConfig = {
  title: React.ReactNode
  message?: React.ReactNode
  // Show the X button in the header
  closable?: boolean
  actions?: PopupDialogAction[]
}

type OpenPopupOptions = {
  size?: PopupDialogSize
}

type PopupDialogContextValue = {
  // Pass a config for the standard title/message/buttons layout,
  // or a React element for custom content
  openPopup: (
    content: PopupDialogConfig | React.ReactElement,
    options?: OpenPopupOptions
  ) => void
  closePopup: () => void
}

const PopupDialogGlobalContext = createContext<PopupDialogContextValue | null>(
  null
)

export const usePopupDialog = () => {
  const context = useContext(PopupDialogGlobalContext)

  if (!context) {
    throw new Error('usePopupDialog must be used inside <PopupDialogProvider>')
  }

  return context
}

function PopupDialogConfigContent({
  config,
  onClose,
}: {
  config: PopupDialogConfig
  onClose: () => void
}) {
  const { title, message, closable, actions } = config
  const hasActions = !!actions?.length

  return (
    <>
      <PopupDialogHeader>
        {title}
        {closable && <PopupDialogClose />}
      </PopupDialogHeader>
      {message && (
        <PopupDialogBody className={hasActions ? undefined : '!border-b-0'}>
          {message}
        </PopupDialogBody>
      )}
      {hasActions && (
        <PopupDialogFooter>
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
        </PopupDialogFooter>
      )}
    </>
  )
}

// Mounted once in _app.tsx as the pathless root route, so popup content can use
// router hooks (Button relies on useNavigation)
export function PopupDialogProvider({ children }: React.PropsWithChildren) {
  const [content, setContent] = useState<
    PopupDialogConfig | React.ReactElement | null
  >(null)
  const [size, setSize] = useState<PopupDialogSize>('md')

  // Kept separate from `content` so it stays rendered while the dialog fades out
  const [open, setOpen] = useState(false)

  const value = useMemo<PopupDialogContextValue>(
    () => ({
      openPopup: (nextContent, options) => {
        setContent(nextContent)
        setSize(options?.size ?? 'md')
        setOpen(true)
      },
      closePopup: () => setOpen(false),
    }),
    []
  )

  return (
    <PopupDialogGlobalContext.Provider value={value}>
      {children}
      <PopupDialog open={open} onOpenChange={setOpen} size={size}>
        {content && !isValidElement(content) ? (
          <PopupDialogConfigContent
            config={content as PopupDialogConfig}
            onClose={value.closePopup}
          />
        ) : (
          content
        )}
      </PopupDialog>
    </PopupDialogGlobalContext.Provider>
  )
}
