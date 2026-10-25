import type { Locale } from '../../i18n/types.ts'
import styles from './LanguageSwitcher.module.css'

export interface LanguageSwitcherProps {
  readonly locale: Locale
  readonly locales: readonly Locale[]
  readonly onChange: (l: Locale) => void
  readonly label: string
}

const SHORT_CODES: Record<Locale, 'PT' | 'EN' | 'ES'> = {
  'pt-BR': 'PT',
  en: 'EN',
  es: 'ES',
}

export function LanguageSwitcher({ locale, locales, onChange, label }: LanguageSwitcherProps) {
  return (
    <fieldset className={styles.group}>
      <legend className="visually-hidden">{label}</legend>
      {locales.map((item) => {
        const isPressed = item === locale
        return (
          <button
            key={item}
            type="button"
            lang={item}
            aria-pressed={isPressed}
            className={styles.button}
            onClick={() => {
              if (!isPressed) {
                onChange(item)
              }
            }}
          >
            {SHORT_CODES[item]}
          </button>
        )
      })}
    </fieldset>
  )
}
