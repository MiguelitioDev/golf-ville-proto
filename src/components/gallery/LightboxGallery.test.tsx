import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { beforeEach, describe, expect, it } from 'vitest'
import { includedAssets } from '../../assets/manifest.ts'
import { I18nProvider } from '../../i18n/I18nProvider.tsx'
import { LightboxGallery } from './LightboxGallery.tsx'

const assets = includedAssets()

function ControlledLightbox({ initialIndex = null }: { readonly initialIndex?: number | null }) {
  const [index, setIndex] = useState<number | null>(initialIndex)

  return (
    <div>
      <button type="button" onClick={() => setIndex(0)}>
        Open first photo
      </button>
      <LightboxGallery
        items={assets}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </div>
  )
}

describe('LightboxGallery', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.classList.remove('lightbox-open')
  })

  it('opens the dialog, navigates with ArrowRight and ArrowLeft wrap-around, and closes on Escape returning focus', async () => {
    const user = userEvent.setup()
    render(
      <I18nProvider>
        <ControlledLightbox />
      </I18nProvider>,
    )

    const triggerButton = screen.getByRole('button', { name: 'Open first photo' })
    await user.click(triggerButton)

    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveAttribute('open')
    expect(screen.getByText('1 de 7')).toBeInTheDocument()

    fireEvent.keyDown(dialog, { key: 'ArrowRight' })
    expect(screen.getByText('2 de 7')).toBeInTheDocument()

    fireEvent.keyDown(dialog, { key: 'ArrowLeft' })
    expect(screen.getByText('1 de 7')).toBeInTheDocument()

    fireEvent.keyDown(dialog, { key: 'ArrowLeft' })
    expect(screen.getByText('7 de 7')).toBeInTheDocument()

    fireEvent.keyDown(dialog, { key: 'Escape' })
    expect(dialog).not.toHaveAttribute('open')
    expect(triggerButton).toHaveFocus()
  })
})
