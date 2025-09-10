import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function TopbarPortal({ children }: React.PropsWithChildren) {
  const [domReady, setDomReady] = useState(false)

  useEffect(() => {
    setDomReady(true)
  }, [])

  const container = document.getElementById('topbarPortal') as HTMLElement

  return domReady ? createPortal(<div>{children}</div>, container) : null
}
