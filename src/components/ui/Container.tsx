import type { HTMLAttributes, ReactNode } from 'react'
import styles from './Container.module.css'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode
}

export function Container({ className, children, ...rest }: ContainerProps) {
  const classes = [styles.container, className].filter(Boolean).join(' ')
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
