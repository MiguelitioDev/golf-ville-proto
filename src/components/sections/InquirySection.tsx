import { useI18n } from '../../i18n/useI18n.ts'
import type { InquiryChannel } from '../../services/inquiry/types.ts'
import { Container } from '../ui/Container.tsx'
import { Section } from '../ui/Section.tsx'
import { InquiryForm } from './InquiryForm.tsx'
import styles from './InquirySection.module.css'

export interface InquirySectionProps {
  readonly whatsappChannel: InquiryChannel
  readonly mailtoChannel: InquiryChannel
}

export function InquirySection({ whatsappChannel, mailtoChannel }: InquirySectionProps) {
  const { t } = useI18n()

  return (
    <Section id="consulta" tone="sand" ariaLabelledBy="inquiry-title">
      <Container className={styles.grid}>
        <div className={styles.leftColumn}>
          <h2 id="inquiry-title" className={styles.title}>
            {t.inquiry.title}
          </h2>
          <p className={`prose ${styles.helper}`}>{t.inquiry.helper}</p>
        </div>

        <div className={styles.rightColumn}>
          <InquiryForm channel={whatsappChannel} fallbackChannel={mailtoChannel} />
        </div>
      </Container>
    </Section>
  )
}
