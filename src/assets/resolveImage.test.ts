import { assetManifest } from './manifest.ts'
import { resolveImage } from './resolveImage.ts'

function extractWidths(srcSet: string): number[] {
  return srcSet.split(',').map((entry) => {
    const match = /\s(\d+)w$/.exec(entry.trim())
    return match?.[1] ? Number(match[1]) : NaN
  })
}

describe('resolveImage', () => {
  it('generates srcsets with ${w}w entries that never exceed intrinsic width and a .jpg fallbackSrc', () => {
    for (const asset of assetManifest) {
      const resolved = resolveImage(asset)

      expect(resolved.fallbackSrc.endsWith('.jpg')).toBe(true)
      expect(resolved.width).toBe(asset.width)
      expect(resolved.height).toBe(asset.height)

      for (const srcSet of [resolved.avifSrcSet, resolved.webpSrcSet, resolved.jpgSrcSet]) {
        const widths = extractWidths(srcSet)
        expect(widths.length).toBeGreaterThan(0)
        for (const w of widths) {
          expect(Number.isInteger(w)).toBe(true)
          expect(w).toBeGreaterThan(0)
          expect(w).toBeLessThanOrEqual(asset.width)
        }
      }
    }
  })
})
