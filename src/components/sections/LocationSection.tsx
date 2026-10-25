import { siteConfig } from '../../config/site.ts'
import { useI18n } from '../../i18n/useI18n.ts'
import { Button } from '../ui/Button.tsx'
import { Container } from '../ui/Container.tsx'
import { Section } from '../ui/Section.tsx'
import styles from './LocationSection.module.css'

export function LocationSection() {
  const { t } = useI18n()
  const { address, mapSearchUrl } = siteConfig

  return (
    <Section id="localizacao" tone="paper" ariaLabelledBy="location-title">
      <Container className={styles.grid}>
        <div className={styles.leftColumn}>
          <h2 id="location-title" className={styles.title}>
            {t.location.title}
          </h2>
          <p className={styles.areaDisplay}>{address.area}</p>
          <p className={`lede ${styles.cityLede}`}>
            {address.city} ({address.state})
          </p>
        </div>

        <div className={styles.rightColumn}>
          <address className={styles.addressBlock}>
            <span className={styles.addressLabel}>{t.location.addressLabel}</span>
            <span className={styles.streetLine}>{address.line}</span>
            {!address.verified && (
              <small className={styles.unverifiedNote}>{t.location.unverifiedNote}</small>
            )}
          </address>

          <Button
            href={mapSearchUrl}
            variant="ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.location.openInMap}
          </Button>
        </div>
      </Container>
    </Section>
  )
}
