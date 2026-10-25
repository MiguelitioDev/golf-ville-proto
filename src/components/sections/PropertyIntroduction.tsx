import type { CSSProperties } from 'react'
import type { ImageAsset } from '../../assets/types.ts'
import { useI18n } from '../../i18n/useI18n.ts'
import { Container } from '../ui/Container.tsx'
import { ResponsiveImage } from '../ui/ResponsiveImage.tsx'
import { Section } from '../ui/Section.tsx'
import styles from './PropertyIntroduction.module.css'

export interface PropertyIntroductionProps {
  readonly wideImage: ImageAsset
  readonly insetImage: ImageAsset
}

export function PropertyIntroduction({ wideImage, insetImage }: PropertyIntroductionProps) {
  const { t } = useI18n()

  const wideStyle: CSSProperties = {
    maxWidth: `${wideImage.width}px`,
  }

  const insetStyle: CSSProperties = {
    maxWidth: `${Math.min(insetImage.width, 300)}px`,
  }

  return (
    <Section id="propriedade" tone="paper" ariaLabelledBy="intro-title">
      <Container className={styles.grid}>
        <div className={styles.textColumn}>
          <h2 id="intro-title" className={styles.title}>
            {t.intro.title}
          </h2>
          <p className={`prose ${styles.body}`}>{t.intro.body}</p>
        </div>

        <div className={styles.mediaColumn}>
          <div className={styles.wideMedia} style={wideStyle}>
            <ResponsiveImage
              asset={wideImage}
              sizes="(min-width: 1024px) 58vw, 100vw"
              showCredit={false}
            />
          </div>

          <div className={styles.insetMedia} style={insetStyle}>
            <ResponsiveImage
              asset={insetImage}
              sizes="300px"
              showCredit={false}
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}
