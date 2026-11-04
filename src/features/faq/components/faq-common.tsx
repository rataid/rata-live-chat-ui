import { useEffect, useRef } from 'react'

import { Brand } from '@/constants/brand'
import { ContactUsButton } from '@/features/home/components/contact-us-button'
import Icon from '@nui/ui/icon'

import { AskMoreRow, FaqBackLink } from './faq.style'

export function BackToHomepage({ brand }: { brand: Brand }) {
  return (
    <FaqBackLink to={`/home/${brand}`}>
      <Icon icon="lucide-arrow-left" size="xs" />
      Kembali ke Beranda
    </FaqBackLink>
  )
}

export function AskMore() {
  return (
    <AskMoreRow>
      Masih punya pertanyaan?
      <ContactUsButton />
    </AskMoreRow>
  )
}

export function FaqAnswer({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.querySelectorAll('img').forEach((img) => {
      const show = () => img.setAttribute('data-loaded', '')
      if (img.complete) return show()
      img.addEventListener('load', show, { once: true })
      img.addEventListener('error', show, { once: true })
    })
  }, [html])

  // eslint-disable-next-line react/no-danger
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />
}
