import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { siteConfig } from '../../config/site.ts'
import { I18nProvider } from '../../i18n/I18nProvider.tsx'
import { LocationSection } from './LocationSection.tsx'

describe('LocationSection', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders the map link with href equal to siteConfig.mapSearchUrl and rel containing noopener', () => {
    render(
      <I18nProvider>
        <LocationSection />
      </I18nProvider>,
    )

    const mapLink = screen.getByRole('link', { name: 'Abrir no mapa' })
    expect(mapLink).toHaveAttribute('href', siteConfig.mapSearchUrl)
    expect(mapLink.getAttribute('rel')).toContain('noopener')
    expect(screen.getByText('Porto das Dunas')).toBeInTheDocument()
    expect(screen.getByText('Aquiraz (CE)')).toBeInTheDocument()
    expect(screen.getByText('Endereço a confirmar com o hotel.')).toBeInTheDocument()
  })
})
