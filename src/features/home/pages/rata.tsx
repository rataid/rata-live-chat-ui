import { AlignerTracker } from '../components/aligner-tracker'
import { BrandFaq } from '../components/brand-faq'
import { BrandIntro } from '../components/brand-intro'
import { TrackerGrid } from '../components/home.style'
import { RemovalTracker } from '../components/removal-tracker'

export function HomeRataPage() {
  return (
    <>
      <BrandIntro brand="rata" />
      {/* @todo: show the trackers only to patients with an active RATA treatment */}
      <TrackerGrid>
        <AlignerTracker />
        <RemovalTracker />
      </TrackerGrid>
      <BrandFaq brand="rata" />
    </>
  )
}
