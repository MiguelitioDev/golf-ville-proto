import { siteConfig } from '../../config/site.ts'
import { useI18n } from '../../i18n/useI18n.ts'
import { formatPhoneBR } from '../../lib/formatPhone.ts'
import { Container } from '../ui/Container.tsx'
import styles from './SiteFooter.module.css'

export function SiteFooter() {
  const { t } = useI18n()
  const { contact, address } = siteConfig
  const whatsappUrl = `https://wa.me/${contact.whatsappE164}`
  const formattedPhone = formatPhoneBR(contact.whatsappE164)

  return (
    <footer className={`${styles.footer} on-dark`}>
      <Container className={styles.inner}>
        <div className={styles.topGrid}>
          <div className={styles.brandColumn}>
            <div className={styles.wordmark}>
              <span className={styles.wordmarkPrimary}>Golf Ville</span>
              <span className={styles.wordmarkSecondary}>Resort Suites</span>
            </div>
            <p className={`prose ${styles.notice}`}>{t.footer.notice}</p>
          </div>

          <div className={styles.contactColumn}>
            <h2 className="visually-hidden">{t.footer.contactHeading}</h2>
            <p className={styles.contactHeading}>{t.footer.contactHeading}</p>
            <ul className={styles.contactList}>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  {formattedPhone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className={styles.contactLink}>
                  {contact.email}
                </a>
              </li>
              <li className={styles.addressLine}>
                {address.line} — {address.area}, {address.city} ({address.state})
              </li>
            </ul>
            {!contact.verified && (
              <p className={styles.unverifiedNote}>{t.inquiry.status.unverifiedNote}</p>
            )}
          </div>
        </div>

        <div className={styles.bottomBar}>
          <small className={styles.rightsNotice}>{t.footer.imageRightsNotice}</small>
          <span className={styles.conceptTag}>{t.header.conceptTag}</span>
        </div>
      </Container>
    </footer>
  )
}
