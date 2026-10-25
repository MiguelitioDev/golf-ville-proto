import type { Dictionary, Localized } from '../i18n/types.ts'

export interface Hotspot {
  readonly id: string
  readonly label: Localized
  readonly x: number
  readonly y: number
  readonly labelSide: 'left' | 'right'
}

export type FacilityKey = keyof Dictionary['facilities']['items']
export type FacilityRatioHint = 'square' | 'portrait' | 'landscape'

export interface FacilityItem {
  readonly id: FacilityKey
  readonly imageId: string
  readonly ratioHint: FacilityRatioHint
  readonly titleKey: FacilityKey
  readonly textKey: FacilityKey
}

export type AccommodationFactRowKey = keyof Dictionary['accommodation']['rows']

export interface AccommodationFact {
  readonly key: AccommodationFactRowKey
  readonly label: Localized
  readonly value: Localized | 'pending'
}

export interface AccommodationType {
  readonly id: string
  readonly name: Localized
  readonly verified: boolean
  readonly facts: readonly AccommodationFact[]
  readonly imageId?: string
}

export type GalleryLayoutHint = 'wide' | 'tall' | 'square'

export interface GalleryItem {
  readonly imageId: string
  readonly layoutHint: GalleryLayoutHint
}

export interface FaqEntry {
  readonly id: string
  readonly index: number
  readonly question: Localized
  readonly answer: Localized
}
