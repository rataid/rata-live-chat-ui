import { BRAND_INFO } from '@/constants/brand'

import { BrandIntroTone, BrandIntroWrapper } from './home.style'

// @todo: move to the brand data JSON if this text needs translating
const introText: Record<BrandIntroTone, string> = {
  rata: 'Apabila kamu pasien Rata, gunakan pelacak dan FAQ di bawah untuk memandu pemakaian alignermu setiap hari.',
  tanam:
    'Apabila kamu pasien Tanam, gunakan FAQ di bawah untuk memandu perawatan implanmu, dari hari tindakan sampai pemulihan.',
  vinir:
    'Apabila kamu pasien Vinir, gunakan FAQ di bawah untuk memandu perawatan veneermu, sebelum dan sesudah pemasangan.',
}

// Banner at the top of a brand homepage, in the brand's color
export function BrandIntro({ brand }: { brand: BrandIntroTone }) {
  const { Logo } = BRAND_INFO[brand]

  return (
    <BrandIntroWrapper $tone={brand}>
      <Logo className="h-8 w-auto shrink-0" />
      <p>{introText[brand]}</p>
    </BrandIntroWrapper>
  )
}
