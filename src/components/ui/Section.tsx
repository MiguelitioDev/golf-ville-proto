import type { HTMLAttributes, ReactNode } from 'react'
import styles from './Section.module.css'

export type SectionTone = 'paper' | 'sand' | 'green'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  readonly id?: string
  readonly ariaLabelledBy?: string
  readonly tone?: SectionTone
  readonly children: ReactNode
}

export function Section({
  id,
  ariaLabelledBy,
   'aria-labelledby': ariaLabelledByProp,
  tone = 'paper',
  className,
  children,
  ...rest
}: SectionProps) {
  const labelledBy = ariaLabelledBy ?? ariaLabelledByProp
  const toneClass =
    tone === 'green' ? `${styles.green} on-dark` : tone === 'sand' ? styles.sand : styles.paper
  const classes = [styles.section, toneClass, className].filter(Boolean).join(' ')

  return (
    <section
      {...(id !== undefined ? { id } : {})}
      {...(labelledBy !== undefined ? { 'aria-labelledby': labelledBy } : {})}
      className={classes}
      {...rest}
    >
      {children}
    </section>
  )
}
