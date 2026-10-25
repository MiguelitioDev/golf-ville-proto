import type { Dictionary, Locale } from '../../i18n/types.ts'
import type { InquiryInput } from './types.ts'

export function buildInquiryMessage(
  input: InquiryInput,
  dictionaries: Record<Locale, Dictionary>,
): string {
  const dict = dictionaries[input.locale]
  const lines: string[] = [
    dict.inquiry.message.greeting,
    dict.formatPeriod(input.checkIn.trim(), input.checkOut.trim()),
    dict.formatGuests(input.adults, input.children),
    `${dict.inquiry.message.nameLabel}: ${input.name.trim()}`,
  ]

  const trimmedNotes = input.notes?.trim()
  if (trimmedNotes) {
    lines.push(`${dict.inquiry.message.notesLabel}: ${trimmedNotes}`)
  }

  return lines.join('\n')
}
