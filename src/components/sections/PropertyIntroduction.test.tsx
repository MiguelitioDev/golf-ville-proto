import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { getAsset } from '../../assets/manifest.ts'
import { I18nProvider } from '../../i18n/I18nProvider.tsx'
import { ptBR } from '../../i18n/pt-BR.ts'
import { PropertyIntroduction } from './PropertyIntroduction.tsx'

const wideImage = getAsset('pool-palms-wide')
const insetImage = getAsset('entrance-golf-ball')

describe('PropertyIntroduction', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders h2 and paragraph', () => {
    render(
      <I18nProvider>
        <PropertyIntroduction wideImage={wideImage} insetImage={insetImage} />
      </I18nProvider>,
    )

    const heading = screen.getByRole('heading', { level: 2, name: ptBR.intro.title })
    expect(heading).toBeInTheDocument()

    const paragraph = screen.getByText(ptBR.intro.body)
    expect(paragraph).toBeInTheDocument()

    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(2)
  })
})
