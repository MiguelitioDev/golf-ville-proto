import { siteConfig } from '../../config/site.ts'
import type { Dictionary, Locale } from '../../i18n/types.ts'
import { createMailtoChannel } from './mailtoChannel.ts'
import type { InquiryChannel } from './types.ts'
import { createWhatsAppChannel } from './whatsappChannel.ts'

export type {
  InquiryChannel,
  InquiryErrors,
  InquiryField,
  InquiryInput,
  InquiryResult,
} from './types.ts'
export { buildInquiryMessage } from './buildInquiryMessage.ts'
export { createMailtoChannel } from './mailtoChannel.ts'
export { validateInquiry } from './validate.ts'
export { createWhatsAppChannel } from './whatsappChannel.ts'

export function createInquiryChannels(dictionaries: Record<Locale, Dictionary>): {
  readonly whatsapp: InquiryChannel
  readonly mailto: InquiryChannel
} {
  return {
    whatsapp: createWhatsAppChannel(siteConfig.contact, dictionaries),
    mailto: createMailtoChannel(siteConfig.contact, dictionaries),
  }
}
