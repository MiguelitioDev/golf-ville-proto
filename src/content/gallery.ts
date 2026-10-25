import type { GalleryItem } from './types.ts'

export const galleryItems: readonly GalleryItem[] = [
  {
    imageId: 'aerial-pools-golf',
    layoutHint: 'wide',
  },
  {
    imageId: 'pools-beach-aerial',
    layoutHint: 'square',
  },
  {
    imageId: 'lake-kayak',
    layoutHint: 'tall',
  },
  {
    imageId: 'pool-palms-wide',
    layoutHint: 'wide',
  },
  {
    imageId: 'pools-golf-view',
    layoutHint: 'square',
  },
  {
    imageId: 'boardwalk-pergolas',
    layoutHint: 'wide',
  },
  {
    imageId: 'entrance-golf-ball',
    layoutHint: 'wide',
  },
] as const
