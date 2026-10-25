import { useCallback, useState, type CSSProperties } from 'react'
import type { ImageAsset } from '../../assets/types.ts'
import type { Hotspot } from '../../content/types.ts'
import { useReducedMotion } from '../../hooks/useReducedMotion.ts'
import { useI18n } from '../../i18n/useI18n.ts'
import { ResponsiveImage } from '../ui/ResponsiveImage.tsx'
import styles from './AerialAtlas.module.css'

export interface AerialAtlasProps {
  readonly image: ImageAsset
  readonly hotspots: readonly Hotspot[]
  readonly legendHeading: string
  readonly onReady?: () => void
}

type IndexedStyle = CSSProperties & {
  readonly '--i'?: number
}

export function AerialAtlas({ image, hotspots, legendHeading, onReady }: AerialAtlasProps) {
  const { locale } = useI18n()
  const reducedMotion = useReducedMotion()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  const isReady = reducedMotion || imageLoaded

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
    onReady?.()
  }, [onReady])

  const viewBoxHeight = Number(((100 * image.height) / image.width).toFixed(4))
  const frameStyle: CSSProperties = {
    aspectRatio: `${image.width} / ${image.height}`,
  }

  return (
    <div className={styles.wrapper} data-ready={isReady ? 'true' : 'false'}>
      <div className={styles.frame} style={frameStyle}>
        <ResponsiveImage
          asset={image}
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          showCredit={false}
          objectPosition="30% 50%"
          className={styles.image}
          onLoad={handleImageLoad}
        />

        <svg
          className={styles.svgOverlay}
          viewBox={`0 0 100 ${viewBoxHeight}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {hotspots.map((hotspot, index) => {
            const ySvg = (hotspot.y * viewBoxHeight) / 100
            const x2 = hotspot.labelSide === 'right' ? hotspot.x + 7 : hotspot.x - 7
            const lineStyle: IndexedStyle = { '--i': index }
            return (
              <line
                key={hotspot.id}
                x1={hotspot.x}
                y1={ySvg}
                x2={x2}
                y2={ySvg}
                className={styles.leaderLine}
                style={lineStyle}
              />
            )
          })}
        </svg>

        {hotspots.map((hotspot, index) => {
          const label = hotspot.label[locale]
          const isActive = activeId === hotspot.id
          const markerStyle: IndexedStyle = {
            left: `${hotspot.x}%`,
            top: `${hotspot.y}%`,
            '--i': index,
          }
          const markerClasses = [styles.marker, isActive ? styles.markerActive : '']
            .filter(Boolean)
            .join(' ')
          const labelClasses = [
            styles.labelChip,
            hotspot.labelSide === 'right' ? styles.labelRight : styles.labelLeft,
          ].join(' ')

          return (
            <button
              key={hotspot.id}
              type="button"
              className={markerClasses}
              style={markerStyle}
              aria-label={label}
              onMouseEnter={() => setActiveId(hotspot.id)}
              onMouseLeave={() => setActiveId((prev) => (prev === hotspot.id ? null : prev))}
              onFocus={() => setActiveId(hotspot.id)}
              onBlur={() => setActiveId((prev) => (prev === hotspot.id ? null : prev))}
              onClick={() => setActiveId(hotspot.id)}
            >
              <span className={styles.ring} aria-hidden="true" />
              <span className={labelClasses} aria-hidden="true">
                {label}
              </span>
            </button>
          )
        })}
      </div>

      <div className={styles.meta}>
        <small className={styles.credit}>{image.credit}</small>
        <div className={styles.legend}>
          <span className={styles.legendHeading}>{legendHeading}</span>
          <ul className={styles.legendList}>
            {hotspots.map((hotspot) => {
              const label = hotspot.label[locale]
              const isActive = activeId === hotspot.id
              return (
                <li key={hotspot.id}>
                  <button
                    type="button"
                    className={styles.legendButton}
                    {...(isActive ? { 'aria-current': 'true' } : {})}
                    onMouseEnter={() => setActiveId(hotspot.id)}
                    onMouseLeave={() => setActiveId((prev) => (prev === hotspot.id ? null : prev))}
                    onFocus={() => setActiveId(hotspot.id)}
                    onBlur={() => setActiveId((prev) => (prev === hotspot.id ? null : prev))}
                    onClick={() => setActiveId(hotspot.id)}
                  >
                    {label}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
