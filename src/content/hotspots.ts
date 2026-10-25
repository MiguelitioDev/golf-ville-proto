import type { Hotspot } from './types.ts'

export const hotspots: readonly Hotspot[] = [
  {
    id: 'dunes',
    label: {
      'pt-BR': 'Dunas',
      en: 'Dunes',
      es: 'Dunas',
    },
    x: 28,
    y: 15,
    labelSide: 'right',
  },
  {
    id: 'golf',
    label: {
      'pt-BR': 'Campo de golfe',
      en: 'Golf course',
      es: 'Campo de golf',
    },
    x: 36,
    y: 32,
    labelSide: 'right',
  },
  {
    id: 'lake',
    label: {
      'pt-BR': 'Lago',
      en: 'Lake',
      es: 'Lago',
    },
    x: 22,
    y: 36,
    labelSide: 'left',
  },
  {
    id: 'pools',
    label: {
      'pt-BR': 'Piscinas',
      en: 'Pools',
      es: 'Piscinas',
    },
    x: 50,
    y: 70,
    labelSide: 'right',
  },
  {
    id: 'buildings',
    label: {
      'pt-BR': 'Edifícios',
      en: 'Buildings',
      es: 'Edificios',
    },
    x: 78,
    y: 18,
    labelSide: 'left',
  },
] as const
