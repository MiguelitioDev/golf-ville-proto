import { en } from '../i18n/en.ts'
import { es } from '../i18n/es.ts'
import { ptBR } from '../i18n/pt-BR.ts'
import type { FaqEntry } from './types.ts'

export const faqEntries: readonly FaqEntry[] = ptBR.faq.items.map((item, idx) => ({
  id: `faq-${idx + 1}`,
  index: idx,
  question: {
    'pt-BR': item.question,
    en: en.faq.items[idx]?.question ?? item.question,
    es: es.faq.items[idx]?.question ?? item.question,
  },
  answer: {
    'pt-BR': item.answer,
    en: en.faq.items[idx]?.answer ?? item.answer,
    es: es.faq.items[idx]?.answer ?? item.answer,
  },
}))
