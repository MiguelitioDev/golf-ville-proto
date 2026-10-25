import { dictionaries } from '../../i18n/dictionaries.ts'
import { createMailtoChannel } from './mailtoChannel.ts'
import type { InquiryChannel, InquiryInput } from './types.ts'
import { createWhatsAppChannel } from './whatsappChannel.ts'

const channels: readonly { name: string; channel: InquiryChannel }[] = [
  {
    name: 'whatsapp',
    channel: createWhatsAppChannel({ whatsappE164: '5585991085454' }, dictionaries),
  },
  {
    name: 'mailto',
    channel: createMailtoChannel(
      { email: 'comercial@golfvilleresortsuites.com.br' },
      dictionaries,
    ),
  },
]

describe.each(channels)('InquiryChannel contract ($name)', ({ name, channel }) => {
  const validInput: InquiryInput = {
    name: 'Mariana Costa',
    checkIn: '2099-11-10',
    checkOut: '2099-11-15',
    adults: 2,
    children: 1,
    notes: 'Perto da piscina',
    locale: 'pt-BR',
  }

  it('exposes the expected channel id', () => {
    expect(channel.id).toBe(name)
  })

  it('returns ok: true with a non-empty url string for valid input', () => {
    const result = channel.prepare(validInput)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(typeof result.url).toBe('string')
      expect(result.url.length).toBeGreaterThan(0)
      expect('errors' in result).toBe(false)
    }
  })

  it('returns ok: false with errors and no url for invalid input without throwing', () => {
    const invalidInput: InquiryInput = {
      name: '   ',
      checkIn: '2099-11-15',
      checkOut: '2099-11-10',
      adults: 0,
      children: 12,
      locale: 'pt-BR',
    }

    expect(() => channel.prepare(invalidInput)).not.toThrow()
    const result = channel.prepare(invalidInput)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.name).toBeDefined()
      expect(result.errors.checkOut).toBeDefined()
      expect(result.errors.adults).toBeDefined()
      expect(result.errors.children).toBeDefined()
      expect('url' in result).toBe(false)
    }
  })
})
