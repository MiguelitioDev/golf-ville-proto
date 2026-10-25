export type Locale = 'pt-BR' | 'en' | 'es'

export const LOCALES: readonly Locale[] = ['pt-BR', 'en', 'es'] as const

export type Localized = Record<Locale, string>

export interface FacilityCopy {
  readonly title: string
  readonly text: string
}

export interface FaqItemCopy {
  readonly question: string
  readonly answer: string
}

export interface Dictionary {
  readonly nav: {
    readonly property: string
    readonly facilities: string
    readonly accommodations: string
    readonly gallery: string
    readonly location: string
    readonly faq: string
  }
  readonly header: {
    readonly skipLink: string
    readonly openMenu: string
    readonly closeMenu: string
    readonly languageLabel: string
    readonly conceptTag: string
  }
  readonly ctas: {
    readonly inquire: string
    readonly exploreProperty: string
    readonly openWhatsApp: string
    readonly sendEmail: string
  }
  readonly hero: {
    readonly title: string
    readonly lede: string
    readonly atlasLegendHeading: string
  }
  readonly intro: {
    readonly title: string
    readonly body: string
  }
  readonly facilities: {
    readonly title: string
    readonly photoCaptionSuffix: string
    readonly items: {
      readonly pools: FacilityCopy
      readonly golf: FacilityCopy
      readonly lake: FacilityCopy
      readonly paths: FacilityCopy
    }
  }
  readonly accommodation: {
    readonly title: string
    readonly lede: string
    readonly rows: {
      readonly capacity: string
      readonly bedrooms: string
      readonly amenities: string
    }
    readonly pendingValue: string
  }
  readonly gallery: {
    readonly title: string
    readonly lightbox: {
      readonly zoomPhoto: string
      readonly close: string
      readonly previousPhoto: string
      readonly nextPhoto: string
      readonly counterTemplate: string
    }
  }
  readonly location: {
    readonly title: string
    readonly addressLabel: string
    readonly openInMap: string
    readonly unverifiedNote: string
  }
  readonly inquiry: {
    readonly title: string
    readonly helper: string
    readonly fields: {
      readonly name: string
      readonly checkIn: string
      readonly checkOut: string
      readonly adults: string
      readonly children: string
      readonly notes: string
    }
    readonly errors: {
      readonly summaryHeading: string
      readonly nameRequired: string
      readonly checkInRequired: string
      readonly checkOutRequired: string
      readonly checkOutOrder: string
      readonly checkInPast: string
      readonly adultsRange: string
      readonly childrenRange: string
    }
    readonly status: {
      readonly whatsappOpened: string
      readonly unverifiedNote: string
    }
    readonly message: {
      readonly greeting: string
      readonly emailSubject: string
      readonly nameLabel: string
      readonly notesLabel: string
    }
  }
  readonly faq: {
    readonly title: string
    readonly items: readonly FaqItemCopy[]
  }
  readonly footer: {
    readonly notice: string
    readonly contactHeading: string
    readonly imageRightsNotice: string
  }
  formatGuests(adults: number, children: number): string
  formatPeriod(checkIn: string, checkOut: string): string
}
