import { AlignerTracker } from '../components/aligner-tracker'
import { BrandFaq } from '../components/brand-faq'
import { BrandIntro } from '../components/brand-intro'
import { TrackerGrid } from '../components/home.style'
import { RemovalTracker } from '../components/removal-tracker'

export function HomeRataPage() {
  return (
    <>
      <BrandIntro brand="rata" />
      <TrackerGrid>
        <AlignerTracker />
        <RemovalTracker />
      </TrackerGrid>
      <BrandFaq brand="rata" />
    </>
  )
}
