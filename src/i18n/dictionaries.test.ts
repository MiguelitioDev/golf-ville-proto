import { dictionaries } from './dictionaries.ts'
import { LOCALES } from './types.ts'

function collectKeys(obj: unknown, prefix = ''): string[] {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    return []
  }
  const keys: string[] = []
  for (const key of Object.keys(obj).sort()) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    const value = (obj as Record<string, unknown>)[key]
    if (typeof value === 'function') {
      keys.push(`${fullKey}()`)
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(fullKey, ...collectKeys(value, fullKey))
    } else {
      keys.push(fullKey)
    }
  }
  return keys
}

function collectStrings(obj: unknown, path = ''): { path: string; value: string }[] {
  if (typeof obj === 'string') {
    return [{ path, value: obj }]
  }
  if (Array.isArray(obj)) {
    return obj.flatMap((item, idx) => collectStrings(item, `${path}[${idx}]`))
  }
  if (typeof obj === 'object' && obj !== null) {
    return Object.entries(obj).flatMap(([k, v]) =>
      collectStrings(v, path ? `${path}.${k}` : k),
    )
  }
  return []
}

describe('dictionaries', () => {
  it('shares the exact same recursive key structure across pt-BR, en and es', () => {
    const ptKeys = collectKeys(dictionaries['pt-BR'])
    const enKeys = collectKeys(dictionaries.en)
    const esKeys = collectKeys(dictionaries.es)

    expect(enKeys).toEqual(ptKeys)
    expect(esKeys).toEqual(ptKeys)
  })

  it('contains no empty strings in any locale', () => {
    for (const locale of LOCALES) {
      const entries = collectStrings(dictionaries[locale], locale)
      expect(entries.length).toBeGreaterThan(0)
      for (const entry of entries) {
        expect(entry.value.trim().length, `Empty string at ${entry.path}`).toBeGreaterThan(0)
      }
    }
  })

  it('has 4 FAQ items in each locale', () => {
    for (const locale of LOCALES) {
      expect(dictionaries[locale].faq.items).toHaveLength(4)
    }
  })
})
