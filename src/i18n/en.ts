import type { Dictionary } from './types.ts'

export const en: Dictionary = {
  nav: {
    property: 'Property',
    facilities: 'Grounds',
    accommodations: 'Accommodations',
    gallery: 'Gallery',
    location: 'Location',
    faq: 'Questions',
  },
  header: {
    skipLink: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    languageLabel: 'Language',
    conceptTag: 'MJ Studios Concept',
  },
  ctas: {
    inquire: 'Send inquiry',
    exploreProperty: 'Explore the property',
    openWhatsApp: 'Open chat in WhatsApp',
    sendEmail: 'Send via email',
  },
  hero: {
    title: 'Your next quiet moment starts here.',
    lede: 'Pools, gardens and the golf course in Porto das Dunas, Aquiraz (CE).',
    atlasLegendHeading: 'View from above',
  },
  intro: {
    title: 'A place arranged around greenery and water',
    body: 'In Porto das Dunas, Golf Ville unfolds among pools, palm trees and playing fields. From timber walkways to the lake, the grounds are open and made for unhurried walks.',
  },
  facilities: {
    title: 'Places to linger',
    photoCaptionSuffix: 'Reference photo',
    items: {
      pools: {
        title: 'Pools',
        text: 'Several water basins linked by footbridges and gardens.',
      },
      golf: {
        title: 'Golf course',
        text: 'The buildings sit right along a golf course.',
      },
      lake: {
        title: 'Lake',
        text: 'A calm lake with timber decks and resting spots.',
      },
      paths: {
        title: 'Walkways and gardens',
        text: 'Timber decks, pergolas and tropical planting.',
      },
    },
  },
  accommodation: {
    title: 'Accommodations',
    lede: 'Apartments within the residential resort. Unit types, capacities and photography will be presented here once the hotel confirms the inventory.',
    rows: {
      capacity: 'Capacity',
      bedrooms: 'Bedrooms',
      amenities: 'Amenities',
    },
    pendingValue: 'To be confirmed',
  },
  gallery: {
    title: 'Gallery',
    lightbox: {
      zoomPhoto: 'Enlarge photo',
      close: 'Close',
      previousPhoto: 'Previous photo',
      nextPhoto: 'Next photo',
      counterTemplate: '{current} of {total}',
    },
  },
  location: {
    title: 'Location',
    addressLabel: 'Address',
    openInMap: 'Open in map',
    unverifiedNote: 'Address to be confirmed with the hotel.',
  },
  inquiry: {
    title: 'Tell us about your stay',
    helper:
      'This form does not check availability or confirm bookings. It opens a WhatsApp chat with your details pre-filled.',
    fields: {
      name: 'Name',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      adults: 'Adults',
      children: 'Children',
      notes: 'Notes (optional)',
    },
    errors: {
      summaryHeading: 'Please review the fields below',
      nameRequired: 'Please enter your name.',
      checkInRequired: 'Please enter a check-in date.',
      checkOutRequired: 'Please enter a check-out date.',
      checkOutOrder: 'Check-out must be after check-in.',
      checkInPast: 'Check-in cannot be in the past.',
      adultsRange: 'Please enter between 1 and 10 adults.',
      childrenRange: 'Please enter between 0 and 10 children.',
    },
    status: {
      whatsappOpened: 'Chat opened in WhatsApp',
      unverifiedNote: 'Demonstration number. Will be confirmed with the hotel.',
    },
    message: {
      greeting: 'Hello! I would like information about a stay',
      emailSubject: 'Stay inquiry — Golf Ville Resort Suites',
      nameLabel: 'Name',
      notesLabel: 'Notes',
    },
  },
  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        question: 'Does this website take bookings?',
        answer:
          'No. It brings together property information and prepares an inquiry message for WhatsApp.',
      },
      {
        question: 'Are rates and availability shown here?',
        answer:
          'No. Rates and open dates are provided directly by the person handling your inquiry.',
      },
      {
        question: 'Are the photos official?',
        answer:
          'They are reference photos from public listings, used solely for this presentation. They will be replaced with hotel-approved photography.',
      },
      {
        question: 'Is this the official Golf Ville website?',
        answer: 'No. It is a concept prototype created by MJ Studios.',
      },
    ],
  },
  footer: {
    notice:
      'Concept prototype created by MJ Studios. Not the official website of Golf Ville Resort Suites.',
    contactHeading: 'Contact',
    imageRightsNotice: 'Reference photography, usage rights pending.',
  },
  formatGuests(adults: number, children: number): string {
    const adultsText = adults === 1 ? '1 adult' : `${adults} adults`
    if (children <= 0) {
      return `for ${adultsText}`
    }
    const childrenText = children === 1 ? '1 child' : `${children} children`
    return `for ${adultsText} and ${childrenText}`
  },
  formatPeriod(checkIn: string, checkOut: string): string {
    return `from ${checkIn} to ${checkOut}`
  },
}
