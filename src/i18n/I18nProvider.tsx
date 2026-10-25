import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { dictionaries } from './dictionaries.ts'
import { LOCALES, type Locale } from './types.ts'
import { I18nContext } from './useI18n.ts'

const STORAGE_KEY = 'golfville_locale'

function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value)
}

function readInitialLocale(defaultLocale: Locale): Locale {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (isLocale(saved)) {
        return saved
      }
    }
  } catch {
    // Ignore storage errors in restricted environments
  }
  return defaultLocale
}

export interface I18nProviderProps {
  readonly children: ReactNode
  readonly initialLocale?: Locale
}

export function I18nProvider({ children, initialLocale = 'pt-BR' }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => readInitialLocale(initialLocale))

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale)
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, nextLocale)
      }
    } catch {
      // Ignore storage errors
    }
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
  }, [locale])

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: dictionaries[locale],
    }),
    [locale, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
