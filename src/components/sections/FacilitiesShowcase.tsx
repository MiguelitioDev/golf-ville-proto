import type { CSSProperties } from 'react'
import { getAsset } from '../../assets/manifest.ts'
import type { FacilityItem } from '../../content/types.ts'
import { useInView } from '../../hooks/useInView.ts'
import { useI18n } from '../../i18n/useI18n.ts'
import { Container } from '../ui/Container.tsx'
import { ResponsiveImage } from '../ui/ResponsiveImage.tsx'
import { Section } from '../ui/Section.tsx'
import styles from './FacilitiesShowcase.module.css'

export interface FacilitiesShowcaseProps {
  readonly items: readonly FacilityItem[]
}

const SIZES_BY_ID: Record<FacilityItem['id'], string> = {
  pools: '(min-width: 1024px) 48vw, 100vw',
  golf: '(min-width: 1024px) 48vw, 100vw',
  lake: '(min-width: 1024px) 32vw, 100vw',
  paths: '(min-width: 1024px) 62vw, 100vw',
}

interface FacilityArticleProps {
  readonly item: FacilityItem
}

function FacilityArticle({ item }: FacilityArticleProps) {
  const { t } = useI18n()
  const [revealRef, inView] = useInView<HTMLDivElement>({
    once: true,
    rootMargin: '0px 0px -10% 0px',
  })

  const asset = getAsset(item.imageId)
  const title = t.facilities.items[item.titleKey].title
  const text = t.facilities.items[item.textKey].text
  const sizes = SIZES_BY_ID[item.id]

  const figureStyle: CSSProperties = {
    maxWidth: `${asset.width}px`,
  }

  const articleClasses = [styles.article, styles[item.id]].filter(Boolean).join(' ')

  return (
    <article className={articleClasses} data-facility={item.id}>
      <figure className={styles.figure} style={figureStyle}>
        <div
          ref={revealRef}
          className={styles.mediaWrapper}
          data-revealed={inView ? 'true' : 'false'}
        >
          <ResponsiveImage
            asset={asset}
            sizes={sizes}
            showCredit={false}
            className={styles.image}
          />
        </div>
        <figcaption className={styles.caption}>{t.facilities.photoCaptionSuffix}</figcaption>
      </figure>

      <div className={styles.textBlock}>
        <h3 className={styles.itemTitle}>{title}</h3>
        <p className={`prose ${styles.itemText}`}>{text}</p>
      </div>
    </article>
  )
}

export function FacilitiesShowcase({ items }: FacilitiesShowcaseProps) {
  const { t } = useI18n()

  return (
    <Section id="estrutura" tone="sand" ariaLabelledBy="facilities-title">
      <Container className={styles.container}>
        <h2 id="facilities-title" className={styles.title}>
          {t.facilities.title}
        </h2>

        <div className={styles.list}>
          {items.map((item) => (
            <FacilityArticle key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
