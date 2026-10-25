import type { Dictionary } from '../../i18n/types.ts'
import type { InquiryErrors, InquiryInput } from './types.ts'

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/

function parseIsoLocalDate(iso: string): Date | null {
  if (!ISO_DATE_RE.test(iso)) {
    return null
  }
  const parts = iso.split('-')
  const year = Number(parts[0])
  const month = Number(parts[1])
  const day = Number(parts[2])
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return null
  }
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null
  }
  const date = new Date(year, month - 1, day)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null
  }
  return date
}

function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function validateInquiry(
  input: InquiryInput,
  dictionary: Dictionary['inquiry']['errors'],
  today: Date = new Date(),
): InquiryErrors {
  const errors: InquiryErrors = {}

  if (!input.name || input.name.trim().length === 0) {
    errors.name = dictionary.nameRequired
  }

  const checkInDate = parseIsoLocalDate(input.checkIn)
  const todayStart = startOfLocalDay(today)

  if (!checkInDate) {
    errors.checkIn = dictionary.checkInRequired
  } else if (checkInDate.getTime() < todayStart.getTime()) {
    errors.checkIn = dictionary.checkInPast
  }

  const checkOutDate = parseIsoLocalDate(input.checkOut)
  if (!checkOutDate) {
    errors.checkOut = dictionary.checkOutRequired
  } else if (checkInDate && checkOutDate.getTime() <= checkInDate.getTime()) {
    errors.checkOut = dictionary.checkOutOrder
  }

  if (!Number.isInteger(input.adults) || input.adults < 1 || input.adults > 10) {
    errors.adults = dictionary.adultsRange
  }

  if (!Number.isInteger(input.children) || input.children < 0 || input.children > 10) {
    errors.children = dictionary.childrenRange
  }

  return errors
}
