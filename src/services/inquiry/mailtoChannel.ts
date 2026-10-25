import type { Dictionary, Locale } from '../../i18n/types.ts'
import { buildInquiryMessage } from './buildInquiryMessage.ts'
import type { InquiryChannel, InquiryInput, InquiryResult } from './types.ts'
import { validateInquiry } from './validate.ts'

export function createMailtoChannel(
  config: { email: string },
  dictionaries: Record<Locale, Dictionary>,
): InquiryChannel {
  const email = config.email.trim()

  return {
    id: 'mailto',
    prepare(input: InquiryInput): InquiryResult {
      const dict = dictionaries[input.locale]
      const errors = validateInquiry(input, dict.inquiry.errors)
      if (Object.keys(errors).length > 0) {
        return { ok: false, errors }
      }
      const message = buildInquiryMessage(input, dictionaries)
      const subject = encodeURIComponent(dict.inquiry.message.emailSubject)
      const body = encodeURIComponent(message)
      const url = `mailto:${email}?subject=${subject}&body=${body}`
      return { ok: true, url }
    },
  }
}
