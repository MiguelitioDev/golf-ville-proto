import { en } from './en.ts'
import { es } from './es.ts'
import { ptBR } from './pt-BR.ts'
import type { Dictionary, Locale } from './types.ts'

export const dictionaries: Record<Locale, Dictionary> = {
  'pt-BR': ptBR,
  en,
  es,
}
