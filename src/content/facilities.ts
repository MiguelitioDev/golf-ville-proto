import type { FacilityItem } from './types.ts'

export const facilities: readonly FacilityItem[] = [
  {
    id: 'pools',
    imageId: 'pools-beach-aerial',
    ratioHint: 'square',
    titleKey: 'pools',
    textKey: 'pools',
  },
  {
    id: 'golf',
    imageId: 'pools-golf-view',
    ratioHint: 'square',
    titleKey: 'golf',
    textKey: 'golf',
  },
  {
    id: 'lake',
    imageId: 'lake-kayak',
    ratioHint: 'portrait',
    titleKey: 'lake',
    textKey: 'lake',
  },
  {
    id: 'paths',
    imageId: 'boardwalk-pergolas',
    ratioHint: 'landscape',
    titleKey: 'paths',
    textKey: 'paths',
  },
] as const
