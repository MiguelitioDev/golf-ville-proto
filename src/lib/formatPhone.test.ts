import { describe, expect, it } from 'vitest'
import { formatPhoneBR } from './formatPhone.ts'

describe('formatPhoneBR', () => {
  it('formats a 13-digit Brazilian E.164 mobile number with spaces and hyphen', () => {
    expect(formatPhoneBR('5585991085454')).toBe('+55 85 99108-5454')
  })

  it('strips non-digit characters before formatting', () => {
    expect(formatPhoneBR('+55 (85) 99108-5454')).toBe('+55 85 99108-5454')
  })

  it('falls back to +digits for other lengths or non-BR prefixes', () => {
    expect(formatPhoneBR('14155552671')).toBe('+14155552671')
    expect(formatPhoneBR('558532221111')).toBe('+558532221111')
  })
})
