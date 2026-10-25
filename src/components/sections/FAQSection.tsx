import { Plus } from 'lucide-react'
import { siteConfig } from '../../config/site.ts'
import { useI18n } from '../../i18n/useI18n.ts'
import { Container } from '../ui/Container.tsx'
import { Section } from '../ui/Section.tsx'
import styles from './FAQSection.module.css'

export function FAQSection() {
  const { t } = useI18n()

  if (!siteConfig.flags.showFaq) {
    return null
  }

  return (
    <Section id="perguntas" tone="paper" ariaLabelledBy="faq-title">
      <Container className={styles.grid}>
        <div className={styles.column}>
          <h2 id="faq-title" className={styles.title}>
            {t.faq.title}
          </h2>

          <div className={styles.list}>
            {t.faq.items.map((item) => (
              <details key={item.question} className={styles.item}>
                <summary className={styles.summary}>
                  <span>{item.question}</span>
                  <Plus size={20} aria-hidden="true" className={styles.icon} />
                </summary>
                <p className={`prose ${styles.answer}`}>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
