import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

function parseHexChannel(hex: string): number {
  const sRGB = parseInt(hex, 16) / 255
  return sRGB <= 0.03928 ? sRGB / 12.92 : ((sRGB + 0.055) / 1.055) ** 2.4
}

function relativeLuminance(hex: string): number {
  const clean = hex.replace(/^#/, '')
  const normalized =
    clean.length === 3
      ? `${clean[0]}${clean[0]}${clean[1]}${clean[1]}${clean[2]}${clean[2]}`
      : clean
  const r = parseHexChannel(normalized.slice(0, 2))
  const g = parseHexChannel(normalized.slice(2, 4))
  const b = parseHexChannel(normalized.slice(4, 6))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrastRatio(hexA: string, hexB: string): number {
  const lumA = relativeLuminance(hexA)
  const lumB = relativeLuminance(hexB)
  const lighter = Math.max(lumA, lumB)
  const darker = Math.min(lumA, lumB)
  return (lighter + 0.05) / (darker + 0.05)
}

function loadTokens(): Record<string, string> {
  const currentDir = dirname(fileURLToPath(import.meta.url))
  const css = readFileSync(resolve(currentDir, './tokens.css'), 'utf8')
  const tokens: Record<string, string> = {}
  const re = /--([a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{3,6})\b/g
  let match = re.exec(css)
  while (match !== null) {
    const name = match[1]
    const value = match[2]
    if (name && value) {
      tokens[name] = value
    }
    match = re.exec(css)
  }
  return tokens
}

function getToken(tokens: Record<string, string>, name: string): string {
  const value = tokens[name]
  if (!value) {
    throw new Error(`Missing color token --${name} in tokens.css`)
  }
  return value
}

describe('color token WCAG contrast', () => {
  const tokens = loadTokens()

  it('meets WCAG AA (>= 4.5:1) for required text/surface pairs', () => {
    expect(contrastRatio(getToken(tokens, 'charcoal-800'), getToken(tokens, 'paper-50'))).toBeGreaterThanOrEqual(4.5)
    expect(contrastRatio(getToken(tokens, 'charcoal-800'), getToken(tokens, 'sand-200'))).toBeGreaterThanOrEqual(4.5)
    expect(contrastRatio(getToken(tokens, 'paper-50'), getToken(tokens, 'green-900'))).toBeGreaterThanOrEqual(4.5)
    expect(contrastRatio(getToken(tokens, 'brass-300'), getToken(tokens, 'green-900'))).toBeGreaterThanOrEqual(4.5)
    expect(contrastRatio(getToken(tokens, 'green-900'), getToken(tokens, 'paper-50'))).toBeGreaterThanOrEqual(4.5)
    expect(contrastRatio(getToken(tokens, 'green-900'), getToken(tokens, 'sand-200'))).toBeGreaterThanOrEqual(4.5)
  })

  it('documents that brass-500 on paper-50 is < 3 (decorative only on light backgrounds)', () => {
    expect(contrastRatio(getToken(tokens, 'brass-500'), getToken(tokens, 'paper-50'))).toBeLessThan(3)
  })
})
