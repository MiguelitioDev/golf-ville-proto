import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { I18nProvider } from '../../i18n/I18nProvider.tsx'
import { SiteFooter } from './SiteFooter.tsx'

describe('SiteFooter', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders the concept notice, WhatsApp link, mailto link, and unverified note', () => {
    render(
      <I18nProvider>
        <SiteFooter />
      </I18nProvider>,
    )

    expect(
      screen.getByText(
        'Protótipo de conceito criado pela MJ Studios. Não é o site oficial do Golf Ville Resort Suites.',
      ),
    ).toBeInTheDocument()

    const whatsappLink = screen.getByRole('link', { name: '+55 85 99108-5454' })
    expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/5585991085454')

    const emailLink = screen.getByRole('link', {
      name: 'comercial@golfvilleresortsuites.com.br',
    })
    expect(emailLink).toHaveAttribute(
      'href',
      'mailto:comercial@golfvilleresortsuites.com.br',
    )

    expect(
      screen.getByText('Número de demonstração. Será confirmado com o hotel.'),
    ).toBeInTheDocument()
  })
})
