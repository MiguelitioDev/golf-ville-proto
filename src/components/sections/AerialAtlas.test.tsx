import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { getAsset } from '../../assets/manifest.ts'
import { hotspots } from '../../content/hotspots.ts'
import { I18nProvider } from '../../i18n/I18nProvider.tsx'
import { AerialAtlas } from './AerialAtlas.tsx'

const heroAsset = getAsset('aerial-pools-golf')

describe('AerialAtlas', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders one marker button and one legend button per hotspot with matching labels', () => {
    render(
      <I18nProvider>
        <AerialAtlas image={heroAsset} hotspots={hotspots} legendHeading="Vista do alto" />
      </I18nProvider>,
    )

    const legendList = screen.getByRole('list')
    const legendButtons = within(legendList).getAllByRole('button')
    expect(legendButtons).toHaveLength(hotspots.length)

    for (const hotspot of hotspots) {
      const label = hotspot.label['pt-BR']
      const matchingButtons = screen.getAllByRole('button', { name: label })
      expect(matchingButtons).toHaveLength(2)
    }
  })

  it('marks the matching legend item aria-current="true" when a marker is hovered or focused', async () => {
    const user = userEvent.setup()
    render(
      <I18nProvider>
        <AerialAtlas image={heroAsset} hotspots={hotspots} legendHeading="Vista do alto" />
      </I18nProvider>,
    )

    const legendList = screen.getByRole('list')
    const dunesLegendButton = within(legendList).getByRole('button', { name: 'Dunas' })
    const allDunesButtons = screen.getAllByRole('button', { name: 'Dunas' })
    const markerButton = allDunesButtons.find((btn) => btn !== dunesLegendButton)
    expect(markerButton).toBeDefined()

    expect(dunesLegendButton).not.toHaveAttribute('aria-current')

    if (markerButton) {
      await user.hover(markerButton)
      expect(dunesLegendButton).toHaveAttribute('aria-current', 'true')

      await user.unhover(markerButton)
      expect(dunesLegendButton).not.toHaveAttribute('aria-current')

      fireEvent.focus(markerButton)
      expect(dunesLegendButton).toHaveAttribute('aria-current', 'true')

      fireEvent.blur(markerButton)
      expect(dunesLegendButton).not.toHaveAttribute('aria-current')
    }
  })

  it('updates data-ready to "true" when the image fires load', () => {
    const { container } = render(
      <I18nProvider>
        <AerialAtlas image={heroAsset} hotspots={hotspots} legendHeading="Vista do alto" />
      </I18nProvider>,
    )

    const wrapper = container.firstElementChild
    expect(wrapper).toHaveAttribute('data-ready', 'false')

    const img = screen.getByRole('img')
    fireEvent.load(img)

    expect(wrapper).toHaveAttribute('data-ready', 'true')
  })
})
