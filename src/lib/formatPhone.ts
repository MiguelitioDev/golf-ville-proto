export function formatPhoneBR(e164: string): string {
  const digits = e164.replace(/\D/g, '')
  if (digits.length === 13 && digits.startsWith('55')) {
    const area = digits.slice(2, 4)
    const part1 = digits.slice(4, 9)
    const part2 = digits.slice(9, 13)
    return `+55 ${area} ${part1}-${part2}`
  }
  return `+${digits}`
}
