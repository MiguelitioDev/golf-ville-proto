import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { galleryItems } from '../../content/gallery.ts'
import { I18nProvider } from '../../i18n/I18nProvider.tsx'
import { PropertyGallery } from './PropertyGallery.tsx'

describe('PropertyGallery', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.classList.remove('lightbox-open')
  })

  it('opens the lightbox on clicking the first gallery item, navigates with arrows and restores focus on close', async () => {
    const user = userEvent.setup()
    render(
      <I18nProvider>
        <PropertyGallery items={galleryItems} />
      </I18nProvider>,
    )

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(7)

    const firstButton = buttons[0]!
    await user.click(firstButton)

    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveAttribute('open')
    expect(screen.getByText('1 de 7')).toBeInTheDocument()

    fireEvent.keyDown(dialog, { key: 'ArrowRight' })
    expect(screen.getByText('2 de 7')).toBeInTheDocument()

    fireEvent.keyDown(dialog, { key: 'ArrowLeft' })
    fireEvent.keyDown(dialog, { key: 'ArrowLeft' })
    expect(screen.getByText('7 de 7')).toBeInTheDocument()

    const closeButton = screen.getByRole('button', { name: 'Fechar' })
    await user.click(closeButton)

    expect(dialog).not.toHaveAttribute('open')
    expect(firstButton).toHaveFocus()
  })
})
