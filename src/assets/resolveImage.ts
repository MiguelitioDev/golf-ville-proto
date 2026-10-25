import generatedImages from './images.generated.json'
import type { ImageAsset } from './types.ts'

export interface ResolvedImage {
  readonly avifSrcSet: string
  readonly webpSrcSet: string
  readonly jpgSrcSet: string
  readonly fallbackSrc: string
  readonly width: number
  readonly height: number
}

interface GeneratedImageRecord {
  readonly width: number
  readonly height: number
  readonly placeholderColor: string
  readonly widths: readonly number[]
  readonly basePath: string
}

const imageMap = generatedImages as Record<string, GeneratedImageRecord>

function buildSrcSet(basePath: string, widths: readonly number[], ext: 'avif' | 'webp' | 'jpg'): string {
  return widths.map((w) => `${basePath}-${w}.${ext} ${w}w`).join(', ')
}

export function resolveImage(asset: ImageAsset): ResolvedImage {
  const entry = imageMap[asset.id]
  if (!entry || entry.widths.length === 0) {
    throw new Error(`Missing generated image variants for asset "${asset.id}"`)
  }

  const sortedWidths = [...entry.widths].sort((a, b) => a - b)
  const largestWidth = sortedWidths[sortedWidths.length - 1] ?? asset.width

  return {
    avifSrcSet: buildSrcSet(entry.basePath, sortedWidths, 'avif'),
    webpSrcSet: buildSrcSet(entry.basePath, sortedWidths, 'webp'),
    jpgSrcSet: buildSrcSet(entry.basePath, sortedWidths, 'jpg'),
    fallbackSrc: `${entry.basePath}-${largestWidth}.jpg`,
    width: entry.width,
    height: entry.height,
  }
}
