import { BrandFaq } from '../components/brand-faq'
import { BrandIntro } from '../components/brand-intro'
import { BrandTips } from '../components/brand-tips'

export function HomeTanamPage() {
  return (
    <>
      <BrandIntro brand="tanam" />
      <BrandTips brand="tanam" />
      <BrandFaq brand="tanam" />
    </>
  )
}
