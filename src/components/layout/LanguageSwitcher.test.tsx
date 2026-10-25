import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { I18nProvider } from '../../i18n/I18nProvider.tsx'
import { LOCALES } from '../../i18n/types.ts'
import { LanguageSwitcher } from './LanguageSwitcher.tsx'

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders three locale buttons with literal short codes and reflects aria-pressed', () => {
    const onChange = vi.fn()
    render(
      <I18nProvider>
        <LanguageSwitcher
          locale="pt-BR"
          locales={LOCALES}
          onChange={onChange}
          label="Idioma"
        />
      </I18nProvider>,
    )

    const group = screen.getByRole('group', { name: 'Idioma' })
    expect(group).toBeInTheDocument()

    const ptBtn = screen.getByRole('button', { name: 'PT' })
    const enBtn = screen.getByRole('button', { name: 'EN' })
    const esBtn = screen.getByRole('button', { name: 'ES' })

    expect(ptBtn).toHaveAttribute('aria-pressed', 'true')
    expect(enBtn).toHaveAttribute('aria-pressed', 'false')
    expect(esBtn).toHaveAttribute('aria-pressed', 'false')

    expect(ptBtn).toHaveAttribute('lang', 'pt-BR')
    expect(enBtn).toHaveAttribute('lang', 'en')
    expect(esBtn).toHaveAttribute('lang', 'es')
  })

  it('calls onChange with the selected locale when clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <I18nProvider>
        <LanguageSwitcher
          locale="pt-BR"
          locales={LOCALES}
          onChange={onChange}
          label="Idioma"
        />
      </I18nProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'EN' }))
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('en')
  })
})
