import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { getAsset } from '../../assets/manifest.ts'
import { accommodations } from '../../content/accommodations.ts'
import { I18nProvider } from '../../i18n/I18nProvider.tsx'
import { ptBR } from '../../i18n/pt-BR.ts'
import { AccommodationSection } from './AccommodationSection.tsx'

const accommodationType = accommodations[0]!
const accommodationImage = getAsset('pools-golf-view')

describe('AccommodationSection', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders pending value text for each fact row and contains no forbidden price terms', () => {
    const { container } = render(
      <I18nProvider>
        <AccommodationSection type={accommodationType} image={accommodationImage} />
      </I18nProvider>,
    )

    const heading = screen.getByRole('heading', { level: 2, name: ptBR.accommodation.title })
    expect(heading).toBeInTheDocument()

    const pendingItems = screen.getAllByText(ptBR.accommodation.pendingValue)
    expect(pendingItems).toHaveLength(accommodationType.facts.length)

    const textContent = (container.textContent ?? '').toLowerCase()
    expect(textContent).not.toContain('r$')
    expect(textContent).not.toContain('preço')
    expect(textContent).not.toContain('price')
    expect(textContent).not.toContain('diária')
  })
})
