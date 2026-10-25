import type { Dictionary, Locale } from '../../i18n/types.ts'
import { buildInquiryMessage } from './buildInquiryMessage.ts'
import type { InquiryChannel, InquiryInput, InquiryResult } from './types.ts'
import { validateInquiry } from './validate.ts'

export function createWhatsAppChannel(
  config: { whatsappE164: string },
  dictionaries: Record<Locale, Dictionary>,
): InquiryChannel {
  const digits = config.whatsappE164.replace(/\D/g, '')

  return {
    id: 'whatsapp',
    prepare(input: InquiryInput): InquiryResult {
      const dict = dictionaries[input.locale]
      const errors = validateInquiry(input, dict.inquiry.errors)
      if (Object.keys(errors).length > 0) {
        return { ok: false, errors }
      }
      const message = buildInquiryMessage(input, dictionaries)
      const url = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
      return { ok: true, url }
    },
  }
}
