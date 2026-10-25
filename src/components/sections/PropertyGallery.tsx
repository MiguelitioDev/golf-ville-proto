import { lazy, Suspense, useMemo, useState, type CSSProperties } from 'react'
import { getAsset } from '../../assets/manifest.ts'
import type { GalleryItem } from '../../content/types.ts'
import { useInView } from '../../hooks/useInView.ts'
import { useI18n } from '../../i18n/useI18n.ts'
import { Container } from '../ui/Container.tsx'
import { ResponsiveImage } from '../ui/ResponsiveImage.tsx'
import { Section } from '../ui/Section.tsx'
import styles from './PropertyGallery.module.css'

const LazyLightboxGallery = lazy(() => import('../gallery/LightboxGallery.tsx'))

export interface PropertyGalleryProps {
  readonly items: readonly GalleryItem[]
}

type IndexedButtonStyle = CSSProperties & {
  readonly '--i'?: number
}

export function PropertyGallery({ items }: PropertyGalleryProps) {
  const { locale, t } = useI18n()
  const [gridRef, inView] = useInView<HTMLDivElement>({
    once: true,
    rootMargin: '0px 0px -10% 0px',
  })
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [hasOpened, setHasOpened] = useState(false)

  const assets = useMemo(() => items.map((item) => getAsset(item.imageId)), [items])

  const handleOpen = (index: number) => {
    setHasOpened(true)
    setLightboxIndex(index)
  }

  const handleClose = () => {
    setLightboxIndex(null)
  }

  return (
    <Section id="galeria" tone="green" ariaLabelledBy="gallery-title">
      <Container className={styles.container}>
        <h2 id="gallery-title" className={styles.title}>
          {t.gallery.title}
        </h2>

        <div
          ref={gridRef}
          className={styles.masonry}
          data-revealed={inView ? 'true' : 'false'}
        >
          {assets.map((asset, index) => {
            const itemStyle: IndexedButtonStyle = {
              '--i': index,
              maxWidth: `${asset.width}px`,
            }
            const ariaLabel = `${t.gallery.lightbox.zoomPhoto}: ${asset.alt[locale]}`

            return (
              <button
                key={asset.id}
                type="button"
                className={styles.itemButton}
                style={itemStyle}
                aria-label={ariaLabel}
                onClick={() => handleOpen(index)}
              >
                <ResponsiveImage
                  asset={asset}
                  sizes="(min-width: 1024px) 32vw, 48vw"
                  showCredit={false}
                  className={styles.image}
                />
              </button>
            )
          })}
        </div>
      </Container>

      {hasOpened ? (
        <Suspense fallback={null}>
          <LazyLightboxGallery
            items={assets}
            index={lightboxIndex}
            onClose={handleClose}
            onIndexChange={setLightboxIndex}
          />
        </Suspense>
      ) : null}
    </Section>
  )
}
