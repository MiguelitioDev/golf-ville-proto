import { useEffect, useState } from 'react'
import { useI18n } from '../../i18n/useI18n.ts'
import { Button } from '../ui/Button.tsx'
import styles from './MobileInquiryBar.module.css'

export interface MobileInquiryBarProps {
  readonly scrolled: boolean
}

export function MobileInquiryBar({ scrolled }: MobileInquiryBarProps) {
  const { t } = useI18n()
  const [inquiryInView, setInquiryInView] = useState(false)

  useEffect(() => {
    if (
      typeof document === 'undefined' ||
      typeof window === 'undefined' ||
      typeof window.IntersectionObserver !== 'function'
    ) {
      return
    }

    const target = document.getElementById('consulta')
    if (!target) {
      return
    }

    const observer = new window.IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        setInquiryInView(entry.isIntersecting)
      }
    })

    observer.observe(target)
    return () => {
      observer.disconnect()
    }
  }, [scrolled])

  const visible = scrolled && !inquiryInView

  const classes = [styles.bar, visible ? styles.visible : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={classes}
      aria-hidden={!visible}
      inert={!visible}
      data-visible={visible ? 'true' : 'false'}
    >
      <Button
        href="#consulta"
        variant="primary"
        onDark={false}
        className={styles.cta}
        tabIndex={visible ? 0 : -1}
      >
        {t.ctas.inquire}
      </Button>
    </div>
  )
}
