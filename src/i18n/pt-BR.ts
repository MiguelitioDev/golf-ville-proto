import type { Dictionary } from './types.ts'

function formatIsoDatePtBr(iso: string): string {
  const parts = iso.split('-')
  if (parts.length === 3 && parts[0] && parts[1] && parts[2]) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`
  }
  return iso
}

export const ptBR: Dictionary = {
  nav: {
    property: 'Propriedade',
    facilities: 'Estrutura',
    accommodations: 'Acomodações',
    gallery: 'Galeria',
    location: 'Localização',
    faq: 'Perguntas',
  },
  header: {
    skipLink: 'Ir para o conteúdo',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    languageLabel: 'Idioma',
    conceptTag: 'Conceito MJ Studios',
  },
  ctas: {
    inquire: 'Fazer consulta',
    exploreProperty: 'Conhecer a propriedade',
    openWhatsApp: 'Abrir conversa no WhatsApp',
    sendEmail: 'Enviar por e-mail',
  },
  hero: {
    title: 'Seu próximo momento de tranquilidade começa aqui.',
    lede: 'Piscinas, jardins e o campo de golfe, em Porto das Dunas, Aquiraz (CE).',
    atlasLegendHeading: 'Vista do alto',
  },
  intro: {
    title: 'Um lugar organizado em torno do verde e da água',
    body: 'Em Porto das Dunas, o Golf Ville se desenha entre piscinas, palmeiras e áreas de jogo. Dos caminhos de madeira ao lago, o espaço é aberto e pensado para andar sem pressa.',
  },
  facilities: {
    title: 'Áreas para ficar',
    photoCaptionSuffix: 'Foto de referência',
    items: {
      pools: {
        title: 'Piscinas',
        text: "Vários espelhos d'água ligados por passarelas e jardins.",
      },
      golf: {
        title: 'Campo de golfe',
        text: 'Os edifícios ficam à beira de um campo de golfe.',
      },
      lake: {
        title: 'Lago',
        text: 'Um lago com decks e área de descanso.',
      },
      paths: {
        title: 'Caminhos e jardins',
        text: 'Decks de madeira, pérgolas e vegetação tropical.',
      },
    },
  },
  accommodation: {
    title: 'Acomodações',
    lede: 'Apartamentos dentro do condomínio. Tipos, capacidades e fotos serão apresentados aqui assim que o hotel confirmar o inventário.',
    rows: {
      capacity: 'Capacidade',
      bedrooms: 'Dormitórios',
      amenities: 'Comodidades',
    },
    pendingValue: 'A confirmar',
  },
  gallery: {
    title: 'Galeria',
    lightbox: {
      zoomPhoto: 'Ampliar foto',
      close: 'Fechar',
      previousPhoto: 'Foto anterior',
      nextPhoto: 'Próxima foto',
      counterTemplate: '{current} de {total}',
    },
  },
  location: {
    title: 'Localização',
    addressLabel: 'Endereço',
    openInMap: 'Abrir no mapa',
    unverifiedNote: 'Endereço a confirmar com o hotel.',
  },
  inquiry: {
    title: 'Conte sobre a sua viagem',
    helper:
      'Este formulário não consulta disponibilidade nem confirma reservas. Ele abre uma conversa no WhatsApp com os dados preenchidos.',
    fields: {
      name: 'Nome',
      checkIn: 'Chegada',
      checkOut: 'Saída',
      adults: 'Adultos',
      children: 'Crianças',
      notes: 'Observações (opcional)',
    },
    errors: {
      summaryHeading: 'Corrija os campos abaixo',
      nameRequired: 'Informe o seu nome.',
      checkInRequired: 'Informe a data de chegada.',
      checkOutRequired: 'Informe a data de saída.',
      checkOutOrder: 'A saída deve ser depois da chegada.',
      checkInPast: 'A chegada não pode ser no passado.',
      adultsRange: 'Informe de 1 a 10 adultos.',
      childrenRange: 'Informe de 0 a 10 crianças.',
    },
    status: {
      whatsappOpened: 'Conversa aberta no WhatsApp',
      unverifiedNote: 'Número de demonstração. Será confirmado com o hotel.',
    },
    message: {
      greeting: 'Olá! Gostaria de informações sobre uma estadia',
      emailSubject: 'Consulta de estadia — Golf Ville Resort Suites',
      nameLabel: 'Nome',
      notesLabel: 'Observações',
    },
  },
  faq: {
    title: 'Perguntas frequentes',
    items: [
      {
        question: 'Este site faz reservas?',
        answer:
          'Não. Ele reúne as informações da propriedade e prepara uma mensagem de consulta para o WhatsApp.',
      },
      {
        question: 'Os preços e a disponibilidade aparecem aqui?',
        answer:
          'Não. Valores e datas disponíveis são informados por quem atende a consulta.',
      },
      {
        question: 'As fotos são oficiais?',
        answer:
          'São fotos de referência de anúncios públicos, usadas apenas para esta apresentação. Serão substituídas por fotos aprovadas pelo hotel.',
      },
      {
        question: 'Este é o site oficial do Golf Ville?',
        answer: 'Não. É um protótipo de conceito criado pela MJ Studios.',
      },
    ],
  },
  footer: {
    notice:
      'Protótipo de conceito criado pela MJ Studios. Não é o site oficial do Golf Ville Resort Suites.',
    contactHeading: 'Contato',
    imageRightsNotice: 'Fotos de referência, direitos de uso pendentes.',
  },
  formatGuests(adults: number, children: number): string {
    const adultsText = adults === 1 ? '1 adulto' : `${adults} adultos`
    if (children <= 0) {
      return `para ${adultsText}`
    }
    const childrenText = children === 1 ? '1 criança' : `${children} crianças`
    return `para ${adultsText} e ${childrenText}`
  },
  formatPeriod(checkIn: string, checkOut: string): string {
    return `de ${formatIsoDatePtBr(checkIn)} a ${formatIsoDatePtBr(checkOut)}`
  },
}
