import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { I18nProvider } from '../../i18n/I18nProvider.tsx'
import { SiteHeader } from './SiteHeader.tsx'

describe('SiteHeader', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.classList.remove('menu-open')
  })

  it('toggles mobile menu aria-expanded and closes on Escape returning focus to menu button', async () => {
    const user = userEvent.setup()
    render(
      <I18nProvider>
        <SiteHeader scrolled={false} />
      </I18nProvider>,
    )

    const menuButton = screen.getByRole('button', { name: 'Abrir menu' })
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    await user.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    expect(menuButton).toHaveAccessibleName('Fechar menu')
    expect(document.documentElement.classList.contains('menu-open')).toBe(true)

    await user.keyboard('{Escape}')
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    expect(menuButton).toHaveFocus()
    expect(document.documentElement.classList.contains('menu-open')).toBe(false)
  })

  it('closes the mobile menu when a navigation link inside the panel is clicked', async () => {
    const user = userEvent.setup()
    render(
      <I18nProvider>
        <SiteHeader scrolled={false} />
      </I18nProvider>,
    )

    const menuButton = screen.getByRole('button', { name: 'Abrir menu' })
    await user.click(menuButton)
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')

    const mobileNav = screen.getByRole('navigation', { name: 'Mobile' })
    const links = mobileNav.querySelectorAll('a')
    expect(links.length).toBeGreaterThan(0)
    const firstLink = links[0]
    if (firstLink) {
      await user.click(firstLink)
    }

    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('exposes the scrolled styling hook on the header element', () => {
    const { rerender } = render(
      <I18nProvider>
        <SiteHeader scrolled={false} />
      </I18nProvider>,
    )

    const header = screen.getByRole('banner')
    expect(header).toHaveAttribute('data-scrolled', 'false')

    rerender(
      <I18nProvider>
        <SiteHeader scrolled={true} />
      </I18nProvider>,
    )

    expect(header).toHaveAttribute('data-scrolled', 'true')
  })
})
