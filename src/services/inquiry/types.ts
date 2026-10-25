import type { Locale } from '../../i18n/types.ts'

export interface InquiryInput {
  name: string
  checkIn: string /* yyyy-mm-dd */
  checkOut: string
  adults: number
  children: number
  notes?: string | undefined
  locale: Locale
}

export type InquiryField = 'name' | 'checkIn' | 'checkOut' | 'adults' | 'children'

export type InquiryErrors = Partial<Record<InquiryField, string>>

export type InquiryResult = { ok: true; url: string } | { ok: false; errors: InquiryErrors }

export interface InquiryChannel {
  readonly id: string
  prepare(input: InquiryInput): InquiryResult
}
