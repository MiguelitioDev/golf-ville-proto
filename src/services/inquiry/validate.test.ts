import { ptBR } from '../../i18n/pt-BR.ts'
import type { InquiryInput } from './types.ts'
import { validateInquiry } from './validate.ts'

describe('validateInquiry', () => {
  const today = new Date(2026, 9, 25, 14, 30, 0) // 2026-10-25 local
  const errorsDict = ptBR.inquiry.errors

  const validInput: InquiryInput = {
    name: 'Carlos Mendes',
    checkIn: '2026-10-25',
    checkOut: '2026-10-28',
    adults: 2,
    children: 0,
    locale: 'pt-BR',
  }

  it('returns empty errors for valid input including check-in on today', () => {
    expect(validateInquiry(validInput, errorsDict, today)).toEqual({})
  })

  it('requires trimmed non-empty name', () => {
    const res = validateInquiry({ ...validInput, name: '   ' }, errorsDict, today)
    expect(res.name).toBe(errorsDict.nameRequired)
  })

  it('validates checkIn and checkOut required and valid yyyy-mm-dd', () => {
    const emptyDates = validateInquiry(
      { ...validInput, checkIn: '', checkOut: '' },
      errorsDict,
      today,
    )
    expect(emptyDates.checkIn).toBe(errorsDict.checkInRequired)
    expect(emptyDates.checkOut).toBe(errorsDict.checkOutRequired)

    const malformedDates = validateInquiry(
      { ...validInput, checkIn: '25/10/2026', checkOut: '2026-02-30' },
      errorsDict,
      today,
    )
    expect(malformedDates.checkIn).toBe(errorsDict.checkInRequired)
    expect(malformedDates.checkOut).toBe(errorsDict.checkOutRequired)
  })

  it('rejects checkIn before injectable today with checkInPast', () => {
    const past = validateInquiry(
      { ...validInput, checkIn: '2026-10-24', checkOut: '2026-10-28' },
      errorsDict,
      today,
    )
    expect(past.checkIn).toBe(errorsDict.checkInPast)
  })

  it('rejects same-day or earlier checkOut with checkOutOrder on checkOut', () => {
    const sameDay = validateInquiry(
      { ...validInput, checkIn: '2026-10-25', checkOut: '2026-10-25' },
      errorsDict,
      today,
    )
    expect(sameDay.checkOut).toBe(errorsDict.checkOutOrder)

    const beforeCheckIn = validateInquiry(
      { ...validInput, checkIn: '2026-10-27', checkOut: '2026-10-26' },
      errorsDict,
      today,
    )
    expect(beforeCheckIn.checkOut).toBe(errorsDict.checkOutOrder)
  })

  it('enforces adults integer boundary values (0, 1, 10, 11)', () => {
    expect(validateInquiry({ ...validInput, adults: 0 }, errorsDict, today).adults).toBe(
      errorsDict.adultsRange,
    )
    expect(validateInquiry({ ...validInput, adults: 1 }, errorsDict, today).adults).toBeUndefined()
    expect(validateInquiry({ ...validInput, adults: 10 }, errorsDict, today).adults).toBeUndefined()
    expect(validateInquiry({ ...validInput, adults: 11 }, errorsDict, today).adults).toBe(
      errorsDict.adultsRange,
    )
    expect(validateInquiry({ ...validInput, adults: 2.5 }, errorsDict, today).adults).toBe(
      errorsDict.adultsRange,
    )
  })

  it('enforces children integer boundary values (0, 10, 11)', () => {
    expect(validateInquiry({ ...validInput, children: -1 }, errorsDict, today).children).toBe(
      errorsDict.childrenRange,
    )
    expect(
      validateInquiry({ ...validInput, children: 0 }, errorsDict, today).children,
    ).toBeUndefined()
    expect(
      validateInquiry({ ...validInput, children: 10 }, errorsDict, today).children,
    ).toBeUndefined()
    expect(validateInquiry({ ...validInput, children: 11 }, errorsDict, today).children).toBe(
      errorsDict.childrenRange,
    )
    expect(validateInquiry({ ...validInput, children: 1.2 }, errorsDict, today).children).toBe(
      errorsDict.childrenRange,
    )
  })
})
