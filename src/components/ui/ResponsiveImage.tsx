import { useCallback, type CSSProperties } from 'react'
import { resolveImage } from '../../assets/resolveImage.ts'
import type { ImageAsset } from '../../assets/types.ts'
import { useI18n } from '../../i18n/useI18n.ts'
import styles from './ResponsiveImage.module.css'

export interface ResponsiveImageProps {
  readonly asset: ImageAsset
  readonly sizes: string
  readonly priority?: boolean
  readonly className?: string | undefined
  readonly showCredit?: boolean
  readonly objectPosition?: string | undefined
  readonly onLoad?: (() => void) | undefined
}

export function ResponsiveImage({
  asset,
  sizes,
  priority = false,
  className,
  showCredit = false,
  objectPosition,
  onLoad,
}: ResponsiveImageProps) {
  if (!asset.included) {
    throw new Error(`Attempted to render excluded image asset "${asset.id}"`)
  }

  const { locale } = useI18n()
  const resolved = resolveImage(asset)
  // Cached images can finish loading before React attaches `onLoad`.
  const imgRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (node && node.complete && node.naturalWidth > 0) onLoad?.()
    },
    [onLoad],
  )

  const imgStyle: CSSProperties = {
    backgroundColor: asset.placeholderColor,
    ...(objectPosition !== undefined ? { objectPosition } : {}),
  }

  const pictureElement = (
    <picture className={ showCredit ? styles.picture : [styles.picture, className].filter(Boolean).join(' ') }>
      <source type="image/avif" srcSet={resolved.avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={resolved.webpSrcSet} sizes={sizes} />
      <img
        ref={imgRef}
        className={styles.image}
        src={resolved.fallbackSrc}
        srcSet={resolved.jpgSrcSet}
        sizes={sizes}
        width={resolved.width}
        height={resolved.height}
        alt={asset.alt[locale]}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        style={imgStyle}
        {...(onLoad !== undefined ? { onLoad } : {})}
      />
    </picture>
  )

  if (!showCredit) {
    return pictureElement
  }

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      {pictureElement}
      <small className={styles.credit}>{asset.credit}</small>
    </div>
  )
}
