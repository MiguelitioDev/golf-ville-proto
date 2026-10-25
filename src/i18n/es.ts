import type { Dictionary } from './types.ts'

function formatIsoDateEs(iso: string): string {
  const parts = iso.split('-')
  if (parts.length === 3 && parts[0] && parts[1] && parts[2]) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`
  }
  return iso
}

export const es: Dictionary = {
  nav: {
    property: 'Propiedad',
    facilities: 'Instalaciones',
    accommodations: 'Alojamiento',
    gallery: 'Galería',
    location: 'Ubicación',
    faq: 'Preguntas',
  },
  header: {
    skipLink: 'Ir al contenido',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    languageLabel: 'Idioma',
    conceptTag: 'Concepto MJ Studios',
  },
  ctas: {
    inquire: 'Hacer consulta',
    exploreProperty: 'Conocer la propiedad',
    openWhatsApp: 'Abrir conversación en WhatsApp',
    sendEmail: 'Enviar por correo',
  },
  hero: {
    title: 'Su próximo momento de tranquilidad comienza aquí.',
    lede: 'Piscinas, jardines y el campo de golf, en Porto das Dunas, Aquiraz (CE).',
    atlasLegendHeading: 'Vista desde lo alto',
  },
  intro: {
    title: 'Un lugar organizado en torno al verde y al agua',
    body: 'En Porto das Dunas, Golf Ville se dibuja entre piscinas, palmeras y áreas de juego. Desde los senderos de madera hasta el lago, el espacio es abierto y pensado para caminar sin prisa.',
  },
  facilities: {
    title: 'Áreas para quedarse',
    photoCaptionSuffix: 'Foto de referencia',
    items: {
      pools: {
        title: 'Piscinas',
        text: 'Varios espejos de agua conectados por pasarelas y jardines.',
      },
      golf: {
        title: 'Campo de golf',
        text: 'Los edificios se encuentran al borde de un campo de golf.',
      },
      lake: {
        title: 'Lago',
        text: 'Un lago con plataformas de madera y zona de descanso.',
      },
      paths: {
        title: 'Senderos y jardines',
        text: 'Decks de madera, pérgolas y vegetación tropical.',
      },
    },
  },
  accommodation: {
    title: 'Alojamiento',
    lede: 'Apartamentos dentro del condominio. Los tipos, capacidades y fotos se presentarán aquí en cuanto el hotel confirme el inventario.',
    rows: {
      capacity: 'Capacidad',
      bedrooms: 'Dormitorios',
      amenities: 'Comodidades',
    },
    pendingValue: 'Por confirmar',
  },
  gallery: {
    title: 'Galería',
    lightbox: {
      zoomPhoto: 'Ampliar foto',
      close: 'Cerrar',
      previousPhoto: 'Foto anterior',
      nextPhoto: 'Foto siguiente',
      counterTemplate: '{current} de {total}',
    },
  },
  location: {
    title: 'Ubicación',
    addressLabel: 'Dirección',
    openInMap: 'Abrir en el mapa',
    unverifiedNote: 'Dirección por confirmar con el hotel.',
  },
  inquiry: {
    title: 'Cuéntenos sobre su viaje',
    helper:
      'Este formulario no consulta disponibilidad ni confirma reservas. Abre una conversación en WhatsApp con los datos completados.',
    fields: {
      name: 'Nombre',
      checkIn: 'Llegada',
      checkOut: 'Salida',
      adults: 'Adultos',
      children: 'Niños',
      notes: 'Observaciones (opcional)',
    },
    errors: {
      summaryHeading: 'Corrija los campos a continuación',
      nameRequired: 'Indique su nombre.',
      checkInRequired: 'Indique la fecha de llegada.',
      checkOutRequired: 'Indique la fecha de salida.',
      checkOutOrder: 'La salida debe ser posterior a la llegada.',
      checkInPast: 'La llegada no puede ser en el pasado.',
      adultsRange: 'Indique de 1 a 10 adultos.',
      childrenRange: 'Indique de 0 a 10 niños.',
    },
    status: {
      whatsappOpened: 'Conversación abierta en WhatsApp',
      unverifiedNote: 'Número de demostración. Se confirmará con el hotel.',
    },
    message: {
      greeting: '¡Hola! Me gustaría recibir información sobre una estadía',
      emailSubject: 'Consulta de estadía — Golf Ville Resort Suites',
      nameLabel: 'Nombre',
      notesLabel: 'Observaciones',
    },
  },
  faq: {
    title: 'Preguntas frecuentes',
    items: [
      {
        question: '¿Este sitio realiza reservas?',
        answer:
          'No. Reúne la información de la propiedad y prepara un mensaje de consulta para WhatsApp.',
      },
      {
        question: '¿Aparecen aquí los precios y la disponibilidad?',
        answer:
          'No. Las tarifas y fechas disponibles son informadas por quien atiende la consulta.',
      },
      {
        question: '¿Las fotos son oficiales?',
        answer:
          'Son fotos de referencia de anuncios públicos, utilizadas solo para esta presentación. Serán reemplazadas por fotos aprobadas por el hotel.',
      },
      {
        question: '¿Es este el sitio oficial de Golf Ville?',
        answer: 'No. Es un prototipo conceptual creado por MJ Studios.',
      },
    ],
  },
  footer: {
    notice:
      'Prototipo conceptual creado por MJ Studios. No es el sitio oficial de Golf Ville Resort Suites.',
    contactHeading: 'Contacto',
    imageRightsNotice: 'Fotos de referencia, derechos de uso pendientes.',
  },
  formatGuests(adults: number, children: number): string {
    const adultsText = adults === 1 ? '1 adulto' : `${adults} adultos`
    if (children <= 0) {
      return `para ${adultsText}`
    }
    const childrenText = children === 1 ? '1 niño' : `${children} niños`
    return `para ${adultsText} y ${childrenText}`
  },
  formatPeriod(checkIn: string, checkOut: string): string {
    return `del ${formatIsoDateEs(checkIn)} al ${formatIsoDateEs(checkOut)}`
  },
}
