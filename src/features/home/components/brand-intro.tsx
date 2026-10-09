import { BRAND_INFO } from '@/constants/brand'
import { getIntro } from '@/data/intro'

import { BrandIntroTone, BrandIntroWrapper } from './home.style'

// Banner at the top of a brand homepage, in the brand's color
export function BrandIntro({ brand }: { brand: BrandIntroTone }) {
  const { label, logo } = BRAND_INFO[brand]
  const intro = getIntro(brand)

  return (
    <BrandIntroWrapper $tone={brand}>
      <img src={logo} alt={label} className="h-6 w-auto shrink-0 sm:h-8" />
      <p>{intro?.text}</p>
    </BrandIntroWrapper>
  )
}
