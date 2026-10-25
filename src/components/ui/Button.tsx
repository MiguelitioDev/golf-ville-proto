import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'ghost'

interface BaseButtonProps {
  readonly variant?: ButtonVariant
  readonly onDark?: boolean
  readonly className?: string | undefined
  readonly children: ReactNode
}

export type ButtonAsButtonProps = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps | 'href'> & {
    readonly href?: undefined
  }

export type ButtonAsAnchorProps = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps | 'href'> & {
    readonly href: string
  }

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps

export function Button(props: ButtonProps) {
  const { variant = 'primary', onDark = false, className, children } = props

  const classes = [
    styles.button,
    variant === 'primary' ? styles.primary : styles.ghost,
    onDark ? `${styles.onDark} on-dark` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (typeof props.href === 'string') {
    const {
      variant: _variant,
      onDark: _onDark,
      className: _className,
      children: _children,
      href,
      ...anchorRest
    } = props
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    )
  }

  const {
    variant: _variant,
    onDark: _onDark,
    className: _className,
    children: _children,
    href: _href,
    type = 'button',
    ...buttonRest
  } = props
  return (
    <button type={type} className={classes} {...buttonRest}>
      {children}
    </button>
  )
}
