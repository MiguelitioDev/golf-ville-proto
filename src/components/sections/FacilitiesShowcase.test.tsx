import { render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { facilities } from '../../content/facilities.ts'
import { I18nProvider } from '../../i18n/I18nProvider.tsx'
import { ptBR } from '../../i18n/pt-BR.ts'
import { FacilitiesShowcase } from './FacilitiesShowcase.tsx'

describe('FacilitiesShowcase', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders h2 and 4 h3 headings with PT-BR titles, each with an image', () => {
    render(
      <I18nProvider>
        <FacilitiesShowcase items={facilities} />
      </I18nProvider>,
    )

    const h2 = screen.getByRole('heading', { level: 2, name: ptBR.facilities.title })
    expect(h2).toBeInTheDocument()

    const h3Headings = screen.getAllByRole('heading', { level: 3 })
    expect(h3Headings).toHaveLength(4)

    const articles = screen.getAllByRole('article')
    expect(articles).toHaveLength(4)

    for (const item of facilities) {
      const expectedTitle = ptBR.facilities.items[item.titleKey].title
      const heading = screen.getByRole('heading', { level: 3, name: expectedTitle })
      expect(heading).toBeInTheDocument()
    }

    for (const article of articles) {
      const img = within(article).getByRole('img')
      expect(img).toBeInTheDocument()
    }
  })
})
