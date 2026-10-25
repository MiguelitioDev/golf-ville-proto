import type { CSSProperties } from 'react'
import { getAsset } from './assets/manifest.ts'
import { MobileInquiryBar } from './components/layout/MobileInquiryBar.tsx'
import { SiteFooter } from './components/layout/SiteFooter.tsx'
import { SiteHeader } from './components/layout/SiteHeader.tsx'
import { AccommodationSection } from './components/sections/AccommodationSection.tsx'
import { FAQSection } from './components/sections/FAQSection.tsx'
import { FacilitiesShowcase } from './components/sections/FacilitiesShowcase.tsx'
import { HeroSection } from './components/sections/HeroSection.tsx'
import { InquirySection } from './components/sections/InquirySection.tsx'
import { LocationSection } from './components/sections/LocationSection.tsx'
import { PropertyGallery } from './components/sections/PropertyGallery.tsx'
import { PropertyIntroduction } from './components/sections/PropertyIntroduction.tsx'
import { accommodations } from './content/accommodations.ts'
import { facilities } from './content/facilities.ts'
import { galleryItems } from './content/gallery.ts'
import { hotspots } from './content/hotspots.ts'
import { dictionaries } from './i18n/dictionaries.ts'
import { createInquiryChannels } from './services/inquiry/index.ts'
import { useScrollState } from './hooks/useScrollState.ts'
import { I18nProvider } from './i18n/I18nProvider.tsx'
import { useI18n } from './i18n/useI18n.ts'

const heroAsset = getAsset('aerial-pools-golf')
const introWideAsset = getAsset('pool-palms-wide')
const introInsetAsset = getAsset('entrance-golf-ball')
const accommodationAsset = getAsset('pools-golf-view')
const accommodationType = accommodations[0]!
const { whatsapp, mailto } = createInquiryChannels(dictionaries)

const sentinelStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '1px',
  height: '48px',
  pointerEvents: 'none',
  visibility: 'hidden',
}

function AppContent() {
  const { t } = useI18n()
  const { scrolled, sentinelRef } = useScrollState()

  return (
    <>
      <a className="skip-link" href="#main">
        {t.header.skipLink}
      </a>
      <div ref={sentinelRef} aria-hidden="true" style={sentinelStyle} />
      <SiteHeader scrolled={scrolled} />
      <main id="main">
        <HeroSection image={heroAsset} hotspots={hotspots} />
        <PropertyIntroduction wideImage={introWideAsset} insetImage={introInsetAsset} />
        <FacilitiesShowcase items={facilities} />
        <AccommodationSection type={accommodationType} image={accommodationAsset} />
        <PropertyGallery items={galleryItems} />
        <LocationSection />
        <InquirySection whatsappChannel={whatsapp} mailtoChannel={mailto} />
        <FAQSection />
      </main>
      <SiteFooter />
      <MobileInquiryBar scrolled={scrolled} />
    </>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  )
}
