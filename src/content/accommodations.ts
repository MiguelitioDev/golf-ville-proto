import type { AccommodationType } from './types.ts'

export const accommodations: readonly AccommodationType[] = [
  {
    id: 'apartments',
    name: {
      'pt-BR': 'Apartamentos no condomínio',
      en: 'Resort apartments',
      es: 'Apartamentos en el condominio',
    },
    verified: false,
    imageId: 'pools-golf-view',
    facts: [
      {
        key: 'capacity',
        label: {
          'pt-BR': 'Capacidade',
          en: 'Capacity',
          es: 'Capacidad',
        },
        value: 'pending',
      },
      {
        key: 'bedrooms',
        label: {
          'pt-BR': 'Dormitórios',
          en: 'Bedrooms',
          es: 'Dormitorios',
        },
        value: 'pending',
      },
      {
        key: 'amenities',
        label: {
          'pt-BR': 'Comodidades',
          en: 'Amenities',
          es: 'Comodidades',
        },
        value: 'pending',
      },
    ],
  },
] as const
