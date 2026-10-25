import { dictionaries } from '../../i18n/dictionaries.ts'
import { buildInquiryMessage } from './buildInquiryMessage.ts'
import type { InquiryInput } from './types.ts'

describe('buildInquiryMessage', () => {
  const baseInput: InquiryInput = {
    name: 'Ana Silva',
    checkIn: '2027-03-12',
    checkOut: '2027-03-15',
    adults: 2,
    children: 1,
    locale: 'pt-BR',
  }

  it('builds localized message in pt-BR, en and es', () => {
    const ptMsg = buildInquiryMessage({ ...baseInput, locale: 'pt-BR' }, dictionaries)
    expect(ptMsg.split('\n')).toEqual([
      'Olá! Gostaria de informações sobre uma estadia',
      'de 12/03/2027 a 15/03/2027',
      'para 2 adultos e 1 criança',
      'Nome: Ana Silva',
    ])

    const enMsg = buildInquiryMessage({ ...baseInput, locale: 'en' }, dictionaries)
    expect(enMsg.split('\n')).toEqual([
      'Hello! I would like information about a stay',
      'from 2027-03-12 to 2027-03-15',
      'for 2 adults and 1 child',
      'Name: Ana Silva',
    ])

    const esMsg = buildInquiryMessage({ ...baseInput, locale: 'es' }, dictionaries)
    expect(esMsg.split('\n')).toEqual([
      '¡Hola! Me gustaría recibir información sobre una estadía',
      'del 12/03/2027 al 15/03/2027',
      'para 2 adultos y 1 niño',
      'Nombre: Ana Silva',
    ])
  })

  it('formats singular and plural guests properly', () => {
    const singleAdult = buildInquiryMessage(
      { ...baseInput, adults: 1, children: 0, locale: 'pt-BR' },
      dictionaries,
    )
    expect(singleAdult).toContain('para 1 adulto\n')
    expect(singleAdult).not.toContain('criança')

    const pluralGuestsPt = buildInquiryMessage(
      { ...baseInput, adults: 3, children: 2, locale: 'pt-BR' },
      dictionaries,
    )
    expect(pluralGuestsPt).toContain('para 3 adultos e 2 crianças')

    const singleAdultEn = buildInquiryMessage(
      { ...baseInput, adults: 1, children: 0, locale: 'en' },
      dictionaries,
    )
    expect(singleAdultEn).toContain('for 1 adult\n')

    const pluralGuestsEn = buildInquiryMessage(
      { ...baseInput, adults: 2, children: 3, locale: 'en' },
      dictionaries,
    )
    expect(pluralGuestsEn).toContain('for 2 adults and 3 children')

    const pluralGuestsEs = buildInquiryMessage(
      { ...baseInput, adults: 1, children: 2, locale: 'es' },
      dictionaries,
    )
    expect(pluralGuestsEs).toContain('para 1 adulto y 2 niños')
  })

  it('includes notes only when non-empty after trim', () => {
    const withoutNotes = buildInquiryMessage({ ...baseInput, notes: '   ' }, dictionaries)
    expect(withoutNotes.split('\n')).toHaveLength(4)
    expect(withoutNotes).not.toContain('Observações:')

    const withNotes = buildInquiryMessage(
      { ...baseInput, notes: '  Vista para o jardim  ' },
      dictionaries,
    )
    expect(withNotes.split('\n')).toHaveLength(5)
    expect(withNotes).toContain('Observações: Vista para o jardim')
  })

  it('never contains forbidden pricing, availability or booking confirmation words', () => {
    const forbidden = [
      'price',
      'preço',
      'precio',
      'disponível',
      'disponibilidad',
      'available',
      'reserva confirmada',
    ]
    for (const locale of ['pt-BR', 'en', 'es'] as const) {
      const msg = buildInquiryMessage(
        { ...baseInput, locale, notes: 'Chegada no fim da tarde' },
        dictionaries,
      ).toLowerCase()
      for (const word of forbidden) {
        expect(msg).not.toContain(word)
      }
    }
  })
})
