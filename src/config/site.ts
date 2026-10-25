export type AssetMode = 'presentation' | 'production'

export interface ContactConfig {
  readonly whatsappE164: string
  readonly email: string
  readonly verified: false
}

export interface AddressConfig {
  readonly line: string
  readonly area: string
  readonly city: string
  readonly state: string
  readonly country: string
  readonly verified: false
}

const address: AddressConfig = {
  line: 'Av. Oceano Índico, 255',
  area: 'Porto das Dunas',
  city: 'Aquiraz',
  state: 'CE',
  country: 'BR',
  verified: false,
} as const

// pending client verification
const contact: ContactConfig = {
  whatsappE164: import.meta.env.VITE_INQUIRY_WHATSAPP ?? '5585991085454',
  email: import.meta.env.VITE_INQUIRY_EMAIL ?? 'comercial@golfvilleresortsuites.com.br',
  verified: false,
} as const

const assetMode: AssetMode =
  import.meta.env.MODE === 'production' ? 'production' : 'presentation'

const fullAddressQuery = `${address.line}, ${address.area}, ${address.city} - ${address.state}, ${address.country}`

export const siteConfig = {
  name: 'Golf Ville Resort Suites',
  studio: 'MJ Studios',
  locale: 'pt-BR',
  assetMode,
  // pending client verification
  contact,
  address,
  mapSearchUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddressQuery)}`,
  flags: {
    showFaq: true,
    showUnitInterior: false,
  },
} as const
