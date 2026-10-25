import type { Localized } from '../i18n/types.ts'

export type RightsStatus = 'approved' | 'unknown' | 'restricted'
export type AssetOrigin = 'client' | 'omnibees-gallery' | 'hotels-cdn'
export type AssetSubject = 'shared-grounds' | 'specific-unit' | 'entrance'

export interface ImageAsset {
  id: string
  included: boolean
  sourcePage: string
  sourceUrl: string
  origin: AssetOrigin
  rights: RightsStatus
  subject: AssetSubject
  width: number
  height: number
  placeholderColor: string
  alt: Localized
  caption?: Localized
  credit: string
}
