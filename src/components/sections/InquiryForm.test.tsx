import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { dictionaries } from '../../i18n/dictionaries.ts'
import { I18nProvider } from '../../i18n/I18nProvider.tsx'
import { createInquiryChannels } from '../../services/inquiry/index.ts'
import { InquiryForm } from './InquiryForm.tsx'

describe('InquiryForm', () => {
  const channels = createInquiryChannels(dictionaries)

  beforeEach(() => {
    window.localStorage.clear()
    vi.restoreAllMocks()
  })

  it('shows the error summary with PT-BR messages, focuses the summary, and marks fields aria-invalid on empty submit', async () => {
    const user = userEvent.setup()
    render(
      <I18nProvider>
        <InquiryForm channel={channels.whatsapp} fallbackChannel={channels.mailto} />
      </I18nProvider>,
    )

    const submitButton = screen.getByRole('button', { name: 'Abrir conversa no WhatsApp' })
    await user.click(submitButton)

    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('Corrija os campos abaixo')
    expect(alert).toHaveTextContent('Informe o seu nome.')
    expect(alert).toHaveTextContent('Informe a data de chegada.')
    expect(alert).toHaveTextContent('Informe a data de saída.')

    await waitFor(() => {
      expect(alert).toHaveFocus()
    })

    expect(screen.getByLabelText('Nome')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Chegada')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText('Saída')).toHaveAttribute('aria-invalid', 'true')
  })

  it('calls window.open once with a wa.me URL and renders the status and fallback anchor on valid submit', async () => {
    const user = userEvent.setup()
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

    render(
      <I18nProvider>
        <InquiryForm channel={channels.whatsapp} fallbackChannel={channels.mailto} />
      </I18nProvider>,
    )

    await user.type(screen.getByLabelText('Nome'), 'Ana Costa')
    await user.type(screen.getByLabelText('Chegada'), '2099-03-12')
    await user.type(screen.getByLabelText('Saída'), '2099-03-15')

    const submitButton = screen.getByRole('button', { name: 'Abrir conversa no WhatsApp' })
    await user.click(submitButton)

    expect(openSpy).toHaveBeenCalledTimes(1)
    const calledUrl = String(openSpy.mock.calls[0]?.[0] ?? '')
    expect(calledUrl.startsWith('https://wa.me/5585991085454?text=')).toBe(true)

    const status = screen.getByRole('status')
    expect(status).toHaveTextContent('Conversa aberta no WhatsApp')

    const fallbackLink = screen.getByRole('link', { name: 'Abrir conversa no WhatsApp' })
    expect(fallbackLink).toHaveAttribute('href', calledUrl)
    expect(fallbackLink).toHaveAttribute('target', '_blank')
    expect(fallbackLink.getAttribute('rel')).toContain('noopener')
  })

  it('shows the order error on the checkOut field when checkOut is before checkIn', async () => {
    const user = userEvent.setup()
    render(
      <I18nProvider>
        <InquiryForm channel={channels.whatsapp} />
      </I18nProvider>,
    )

    await user.type(screen.getByLabelText('Nome'), 'Ana Costa')
    await user.type(screen.getByLabelText('Chegada'), '2099-05-10')
    await user.type(screen.getByLabelText('Saída'), '2099-05-08')

    await user.click(screen.getByRole('button', { name: 'Abrir conversa no WhatsApp' }))

    const checkOutField = screen.getByLabelText('Saída')
    expect(checkOutField).toHaveAttribute('aria-invalid', 'true')
    const describedById = checkOutField.getAttribute('aria-describedby')
    expect(describedById).toBeTruthy()
    const errorEl = describedById ? document.getElementById(describedById) : null
    expect(errorEl).toHaveTextContent('A saída deve ser depois da chegada.')
  })

  it('never contains forbidden price, availability or reservation confirmation phrases', () => {
    const { container } = render(
      <I18nProvider>
        <InquiryForm channel={channels.whatsapp} fallbackChannel={channels.mailto} />
      </I18nProvider>,
    )

    const text = (container.textContent ?? '').toLowerCase()
    expect(text).not.toContain('r$')
    expect(text).not.toContain('preço')
    expect(text).not.toContain('disponibilidade confirmada')
    expect(text).not.toContain('reserva confirmada')
  })
})
