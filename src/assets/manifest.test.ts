import { LOCALES } from '../i18n/types.ts'
import { assetManifest, getAsset, includedAssets } from './manifest.ts'

describe('assetManifest', () => {
  it('has unique asset ids', () => {
    const ids = assetManifest.map((asset) => asset.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('ensures every included asset has non-empty alt in all three locales, credit, sourceUrl and dimensions > 0', () => {
    const included = includedAssets()
    expect(included.length).toBeGreaterThan(0)

    for (const asset of included) {
      for (const locale of LOCALES) {
        expect(asset.alt[locale].trim().length).toBeGreaterThan(0)
      }
      expect(asset.credit.trim().length).toBeGreaterThan(0)
      expect(asset.sourceUrl.trim().length).toBeGreaterThan(0)
      expect(asset.width).toBeGreaterThan(0)
      expect(asset.height).toBeGreaterThan(0)
    }
  })

  it('marks unit-interior-living as included: false', () => {
    const unitInterior = getAsset('unit-interior-living')
    expect(unitInterior.included).toBe(false)
  })

  it('has no asset with rights set to approved yet', () => {
    for (const asset of assetManifest) {
      expect(asset.rights).not.toBe('approved')
    }
  })

  it('throws when getAsset is called with an unknown id', () => {
    expect(() => getAsset('non-existent-asset-id')).toThrow(/Unknown image asset id/)
  })
})
