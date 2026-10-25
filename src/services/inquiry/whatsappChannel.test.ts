import { dictionaries } from '../../i18n/dictionaries.ts'
import { buildInquiryMessage } from './buildInquiryMessage.ts'
import type { InquiryInput } from './types.ts'
import { createWhatsAppChannel } from './whatsappChannel.ts'

describe('whatsappChannel', () => {
  const validInput: InquiryInput = {
    name: 'Beatriz Lima',
    checkIn: '2099-07-01',
    checkOut: '2099-07-05',
    adults: 2,
    children: 1,
    notes: 'Andar térreo',
    locale: 'pt-BR',
  }

  it('produces a wa.me URL starting with https://wa.me/5585991085454?text= and matching buildInquiryMessage', () => {
    const channel = createWhatsAppChannel({ whatsappE164: '5585991085454' }, dictionaries)
    const result = channel.prepare(validInput)

    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.url.startsWith('https://wa.me/5585991085454?text=')).toBe(true)
      const encodedText = result.url.slice('https://wa.me/5585991085454?text='.length)
      const decodedText = decodeURIComponent(encodedText)
      expect(decodedText).toBe(buildInquiryMessage(validInput, dictionaries))
    }
  })

  it('strips non-digits from the configured WhatsApp phone number', () => {
    const channel = createWhatsAppChannel(
      { whatsappE164: '+55 (85) 99108-5454' },
      dictionaries,
    )
    const result = channel.prepare(validInput)

    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.url.startsWith('https://wa.me/5585991085454?text=')).toBe(true)
    }
  })
})
