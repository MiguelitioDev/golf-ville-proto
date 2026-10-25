import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import type { ImageAsset } from '../../assets/types.ts'
import { useI18n } from '../../i18n/useI18n.ts'
import { ResponsiveImage } from '../ui/ResponsiveImage.tsx'
import styles from './LightboxGallery.module.css'

export interface LightboxGalleryProps {
  readonly items: readonly ImageAsset[]
  readonly index: number | null
  readonly onClose: () => void
  readonly onIndexChange: (index: number) => void
}

export function LightboxGallery({
  items,
  index,
  onClose,
  onIndexChange,
}: LightboxGalleryProps) {
  const { t } = useI18n()
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const pointerStartRef = useRef<{ readonly x: number; readonly y: number } | null>(null)

  const total = items.length
  const isOpen = index !== null && total > 0
  const currentAsset = isOpen && index !== null ? items[index] : undefined

  const restoreFocus = useCallback(() => {
    const previous = previousFocusRef.current
    previousFocusRef.current = null
    if (previous && typeof previous.focus === 'function' && document.contains(previous)) {
      previous.focus()
    }
  }, [])

  const triggerClose = useCallback(() => {
    onClose()
    restoreFocus()
  }, [onClose, restoreFocus])

  const goPrevious = useCallback(() => {
    if (index === null || total === 0) {
      return
    }
    const nextIndex = (index - 1 + total) % total
    onIndexChange(nextIndex)
  }, [index, total, onIndexChange])

  const goNext = useCallback(() => {
    if (index === null || total === 0) {
      return
    }
    const nextIndex = (index + 1) % total
    onIndexChange(nextIndex)
  }, [index, total, onIndexChange])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) {
      return
    }

    if (isOpen) {
      if (!dialog.hasAttribute('open')) {
        const active = document.activeElement
        if (active instanceof HTMLElement && active !== document.body && !dialog.contains(active)) {
          previousFocusRef.current = active
        }
        if (typeof dialog.showModal === 'function') {
          try {
            dialog.showModal()
          } catch {
            dialog.setAttribute('open', '')
          }
        } else {
          dialog.setAttribute('open', '')
        }
        closeButtonRef.current?.focus()
      }
    } else {
      if (dialog.hasAttribute('open')) {
        if (typeof dialog.close === 'function') {
          try {
            dialog.close()
          } catch {
            dialog.removeAttribute('open')
          }
        } else {
          dialog.removeAttribute('open')
        }
      }
      restoreFocus()
    }
  }, [isOpen, restoreFocus])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) {
      return
    }

    const handleNativeCancel = (event: Event) => {
      event.preventDefault()
      triggerClose()
    }

    const handleNativeClose = () => {
      triggerClose()
    }

    dialog.addEventListener('cancel', handleNativeCancel)
    dialog.addEventListener('close', handleNativeClose)

    return () => {
      dialog.removeEventListener('cancel', handleNativeCancel)
      dialog.removeEventListener('close', handleNativeClose)
    }
  }, [triggerClose])

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }
    const root = document.documentElement
    if (isOpen) {
      root.classList.add('lightbox-open')
    } else {
      root.classList.remove('lightbox-open')
    }
    return () => {
      root.classList.remove('lightbox-open')
    }
  }, [isOpen])

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDialogElement>) => {
    if (!isOpen) {
      return
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goPrevious()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      goNext()
    } else if (event.key === 'Escape') {
      event.preventDefault()
      triggerClose()
    }
  }

  const handleDialogClick = (event: ReactMouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      triggerClose()
    }
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointerStartRef.current = { x: event.clientX, y: event.clientY }
  }

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStartRef.current
    pointerStartRef.current = null
    if (!start) {
      return
    }
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        goNext()
      } else {
        goPrevious()
      }
    }
  }

  const counterText =
    index !== null && total > 0
      ? t.gallery.lightbox.counterTemplate
          .replace('{current}', String(index + 1))
          .replace('{total}', String(total))
      : ''

  const mediaWrapperStyle: CSSProperties | undefined = currentAsset
    ? { maxWidth: `${currentAsset.width}px` }
    : undefined

  return (
    // The native <dialog> is the modal widget itself: arrows/backdrop clicks are handled on it.
    // oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} on-dark`}
      aria-label={t.gallery.title}
      onKeyDown={handleKeyDown}
      onClick={handleDialogClick}
    >
      <div
        className={styles.inner}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <div className={styles.topBar}>
          <span className={styles.counter} aria-live="polite">
            {counterText}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.iconButton}
            aria-label={t.gallery.lightbox.close}
            onClick={triggerClose}
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.stage}>
          <button
            type="button"
            className={`${styles.iconButton} ${styles.navPrev}`}
            aria-label={t.gallery.lightbox.previousPhoto}
            onClick={goPrevious}
          >
            <ChevronLeft size={28} aria-hidden="true" />
          </button>

          {currentAsset ? (
            <div className={styles.mediaWrapper} style={mediaWrapperStyle}>
              <ResponsiveImage
                key={currentAsset.id}
                asset={currentAsset}
                priority
                sizes="100vw"
                showCredit={false}
                className={styles.picture}
              />
            </div>
          ) : null}

          <button
            type="button"
            className={`${styles.iconButton} ${styles.navNext}`}
            aria-label={t.gallery.lightbox.nextPhoto}
            onClick={goNext}
          >
            <ChevronRight size={28} aria-hidden="true" />
          </button>
        </div>

        {currentAsset ? (
          <div className={styles.footer}>
            <p className={styles.credit}>{currentAsset.credit}</p>
          </div>
        ) : null}
      </div>
    </dialog>
  )
}

export default LightboxGallery
