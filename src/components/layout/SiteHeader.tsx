import { Menu, X } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { LOCALES } from '../../i18n/types.ts'
import { useI18n } from '../../i18n/useI18n.ts'
import { Button } from '../ui/Button.tsx'
import { Container } from '../ui/Container.tsx'
import { LanguageSwitcher } from './LanguageSwitcher.tsx'
import styles from './SiteHeader.module.css'

export interface SiteHeaderProps {
  readonly scrolled: boolean
}

export function SiteHeader({ scrolled }: SiteHeaderProps) {
  const { locale, setLocale, t } = useI18n()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const panelId = useId()

  const closeMenu = useCallback((restoreFocus = false) => {
    setMenuOpen(false)
    if (restoreFocus) {
      menuButtonRef.current?.focus()
    }
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }
    const root = document.documentElement
    if (menuOpen) {
      root.classList.add('menu-open')
    } else {
      root.classList.remove('menu-open')
    }
    return () => {
      root.classList.remove('menu-open')
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen || typeof window === 'undefined') {
      return
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen, closeMenu])

  const navItems = [
    { href: '#propriedade', label: t.nav.property },
    { href: '#estrutura', label: t.nav.facilities },
    { href: '#acomodacoes', label: t.nav.accommodations },
    { href: '#galeria', label: t.nav.gallery },
    { href: '#localizacao', label: t.nav.location },
  ] as const

  const headerClasses = [
    styles.header,
    scrolled ? styles.scrolled : 'on-dark',
  ]
    .filter(Boolean)
    .join(' ')

  const panelClasses = [
    styles.mobilePanel,
    'on-dark',
    menuOpen ? styles.mobilePanelOpen : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={headerClasses} data-scrolled={scrolled ? 'true' : 'false'}>
      <Container className={styles.bar}>
        <a
          href="#top"
          className={styles.wordmark}
          onClick={() => {
            if (menuOpen) {
              closeMenu(false)
            }
          }}
        >
          <span className={styles.wordmarkPrimary}>Golf Ville</span>
          <span className={styles.wordmarkSecondary}>Resort Suites</span>
        </a>

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.desktopActions}>
          <LanguageSwitcher
            locale={locale}
            locales={LOCALES}
            onChange={setLocale}
            label={t.header.languageLabel}
          />
          <span className={styles.conceptTag}>{t.header.conceptTag}</span>
          <Button href="#consulta" variant="primary" onDark={!scrolled}>
            {t.ctas.inquire}
          </Button>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls={panelId}
          aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </Container>

      <div
        id={panelId}
        className={panelClasses}
        hidden={!menuOpen}
        inert={!menuOpen}
      >
        <Container className={styles.mobilePanelInner}>
          <nav aria-label="Mobile">
            <ul className={styles.mobileNavList}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={styles.mobileNavLink}
                    onClick={() => closeMenu(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.mobileFooter}>
            <LanguageSwitcher
              locale={locale}
              locales={LOCALES}
              onChange={setLocale}
              label={t.header.languageLabel}
            />
            <Button
              href="#consulta"
              variant="primary"
              onDark
              onClick={() => closeMenu(false)}
            >
              {t.ctas.inquire}
            </Button>
            <span className={styles.conceptTag}>{t.header.conceptTag}</span>
          </div>
        </Container>
      </div>
    </header>
  )
}
