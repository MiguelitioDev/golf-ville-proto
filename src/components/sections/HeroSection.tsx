import { useCallback, useState } from 'react'
import type { ImageAsset } from '../../assets/types.ts'
import type { Hotspot } from '../../content/types.ts'
import { useReducedMotion } from '../../hooks/useReducedMotion.ts'
import { useI18n } from '../../i18n/useI18n.ts'
import { Button } from '../ui/Button.tsx'
import { Container } from '../ui/Container.tsx'
import { AerialAtlas } from './AerialAtlas.tsx'
import styles from './HeroSection.module.css'

export interface HeroSectionProps {
  readonly image: ImageAsset
  readonly hotspots: readonly Hotspot[]
}

export function HeroSection({ image, hotspots }: HeroSectionProps) {
  const { t } = useI18n()
  const reducedMotion = useReducedMotion()
  const [atlasReady, setAtlasReady] = useState(false)

  const handleAtlasReady = useCallback(() => {
    setAtlasReady(true)
  }, [])

  const isReady = reducedMotion || atlasReady

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className={`${styles.hero} on-dark`}
      data-ready={isReady ? 'true' : 'false'}
    >
      <Container className={styles.grid}>
        <div className={styles.textColumn}>
          <h1 id="hero-title" className={styles.title}>
            {t.hero.title}
          </h1>
          <p className={`lede ${styles.lede}`}>{t.hero.lede}</p>
          <div className={styles.actions}>
            <Button href="#consulta" variant="primary" onDark>
              {t.ctas.inquire}
            </Button>
            <Button href="#propriedade" variant="ghost" onDark>
              {t.ctas.exploreProperty}
            </Button>
          </div>
        </div>

        <div className={styles.atlasColumn}>
          <AerialAtlas
            image={image}
            hotspots={hotspots}
            legendHeading={t.hero.atlasLegendHeading}
            onReady={handleAtlasReady}
          />
        </div>
      </Container>
    </section>
  )
}
