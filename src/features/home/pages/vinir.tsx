import { BrandFaq } from '../components/brand-faq'
import { BrandIntro } from '../components/brand-intro'
import { BrandTips } from '../components/brand-tips'

export function HomeVinirPage() {
  return (
    <>
      <BrandIntro brand="vinir" />
      <BrandTips brand="vinir" />
      <BrandFaq brand="vinir" />
    </>
  )
}
