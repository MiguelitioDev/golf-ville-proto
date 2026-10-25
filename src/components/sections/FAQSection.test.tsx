import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { I18nProvider } from '../../i18n/I18nProvider.tsx'
import { ptBR } from '../../i18n/pt-BR.ts'
import { FAQSection } from './FAQSection.tsx'

describe('FAQSection', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders 4 details elements whose summary texts match the PT-BR questions', () => {
    const { container } = render(
      <I18nProvider>
        <FAQSection />
      </I18nProvider>,
    )

    const detailsElements = container.querySelectorAll('details')
    expect(detailsElements.length).toBe(4)

    ptBR.faq.items.forEach((item, index) => {
      const summary = detailsElements[index]?.querySelector('summary')
      expect(summary).toHaveTextContent(item.question)
      expect(screen.getByText(item.answer)).toBeInTheDocument()
    })
  })
})
