import type { CSSProperties } from 'react'
import type { ImageAsset } from '../../assets/types.ts'
import type { AccommodationType } from '../../content/types.ts'
import { useI18n } from '../../i18n/useI18n.ts'
import { Container } from '../ui/Container.tsx'
import { ResponsiveImage } from '../ui/ResponsiveImage.tsx'
import { Section } from '../ui/Section.tsx'
import styles from './AccommodationSection.module.css'

export interface AccommodationSectionProps {
  readonly type: AccommodationType
  readonly image: ImageAsset
}

export function AccommodationSection({ type, image }: AccommodationSectionProps) {
  const { locale, t } = useI18n()

  const mediaStyle: CSSProperties = {
    maxWidth: `${image.width}px`,
  }

  return (
    <Section id="acomodacoes" tone="paper" ariaLabelledBy="accommodation-title">
      <Container className={styles.grid}>
        <div className={styles.mediaColumn} style={mediaStyle}>
          <ResponsiveImage
            asset={image}
            sizes="(min-width: 1024px) 48vw, 100vw"
            showCredit={false}
          />
        </div>

        <div className={styles.textColumn}>
          <h2 id="accommodation-title" className={styles.title}>
            {t.accommodation.title}
          </h2>
          <p className={`lede ${styles.lede}`}>{t.accommodation.lede}</p>

          <dl className={styles.factsList}>
            {type.facts.map((fact) => {
              const label = t.accommodation.rows[fact.key]
              const value =
                fact.value === 'pending' ? t.accommodation.pendingValue : fact.value[locale]
              return (
                <div key={fact.key} className={styles.factRow}>
                  <dt className={styles.factTerm}>{label}</dt>
                  <dd className={styles.factValue}>{value}</dd>
                </div>
              )
            })}
          </dl>
        </div>
      </Container>
    </Section>
  )
}
