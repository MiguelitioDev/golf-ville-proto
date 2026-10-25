import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { I18nProvider } from '../../i18n/I18nProvider.tsx'
import { MobileInquiryBar } from './MobileInquiryBar.tsx'

describe('MobileInquiryBar', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('is hidden with aria-hidden and inert when scrolled is false, and visible when scrolled is true and #consulta is absent', () => {
    const { container, rerender } = render(
      <I18nProvider>
        <MobileInquiryBar scrolled={false} />
      </I18nProvider>,
    )

    const bar = container.firstElementChild
    expect(bar).toHaveAttribute('aria-hidden', 'true')
    expect(bar).toHaveAttribute('inert')
    expect(bar).toHaveAttribute('data-visible', 'false')

    rerender(
      <I18nProvider>
        <MobileInquiryBar scrolled={true} />
      </I18nProvider>,
    )

    expect(bar).toHaveAttribute('aria-hidden', 'false')
    expect(bar).not.toHaveAttribute('inert')
    expect(bar).toHaveAttribute('data-visible', 'true')
    expect(screen.getByRole('link', { name: 'Fazer consulta' })).toHaveAttribute(
      'href',
      '#consulta',
    )
  })
})
