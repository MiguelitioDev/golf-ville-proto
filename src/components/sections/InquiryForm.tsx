import { useId, useRef, useState, type FormEvent } from 'react'
import { siteConfig } from '../../config/site.ts'
import { useI18n } from '../../i18n/useI18n.ts'
import type {
  InquiryChannel,
  InquiryErrors,
  InquiryField,
  InquiryInput,
} from '../../services/inquiry/types.ts'
import { Button } from '../ui/Button.tsx'
import styles from './InquiryForm.module.css'

export interface InquiryFormProps {
  readonly channel: InquiryChannel
  readonly fallbackChannel?: InquiryChannel | undefined
}

const FIELD_ORDER: readonly InquiryField[] = [
  'name',
  'checkIn',
  'checkOut',
  'adults',
  'children',
] as const

function getLocalTodayIso(now: Date = new Date()): string {
  const year = String(now.getFullYear())
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function InquiryForm({ channel, fallbackChannel }: InquiryFormProps) {
  const { locale, t } = useI18n()
  const baseId = useId()
  const summaryRef = useRef<HTMLDivElement | null>(null)

  const [name, setName] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState('2')
  const [children, setChildren] = useState('0')
  const [notes, setNotes] = useState('')

  const [errors, setErrors] = useState<InquiryErrors>({})
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null)

  const todayIso = getLocalTodayIso()

  const clearFieldError = (field: InquiryField) => {
    setErrors((prev) => {
      if (prev[field] === undefined) {
        return prev
      }
      const next: InquiryErrors = { ...prev }
      delete next[field]
      return next
    })
  }

  const buildInput = (): InquiryInput => {
    const trimmedName = name.trim()
    const trimmedCheckIn = checkIn.trim()
    const trimmedCheckOut = checkOut.trim()
    const trimmedNotes = notes.trim()
    const parsedAdults = adults.trim() === '' ? Number.NaN : Number(adults)
    const parsedChildren = children.trim() === '' ? Number.NaN : Number(children)

    return {
      name: trimmedName,
      checkIn: trimmedCheckIn,
      checkOut: trimmedCheckOut,
      adults: parsedAdults,
      children: parsedChildren,
      ...(trimmedNotes.length > 0 ? { notes: trimmedNotes } : {}),
      locale,
    }
  }

  const focusSummary = () => {
    setTimeout(() => {
      summaryRef.current?.focus()
    }, 0)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = channel.prepare(buildInput())
    if (!result.ok) {
      setErrors(result.errors)
      setWhatsappUrl(null)
      focusSummary()
      return
    }

    setErrors({})
    setWhatsappUrl(result.url)
    if (typeof window !== 'undefined' && typeof window.open === 'function') {
      window.open(result.url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleFallbackClick = () => {
    if (!fallbackChannel) {
      return
    }
    const result = fallbackChannel.prepare(buildInput())
    if (!result.ok) {
      setErrors(result.errors)
      setWhatsappUrl(null)
      focusSummary()
      return
    }

    setErrors({})
    if (typeof window !== 'undefined') {
      window.location.href = result.url
    }
  }

  const fieldId = (field: InquiryField | 'notes') => `${baseId}-${field}`
  const errorId = (field: InquiryField) => `${baseId}-${field}-error`

  const errorEntries = FIELD_ORDER.flatMap((field) => {
    const message = errors[field]
    return message !== undefined ? [{ field, message }] : []
  })

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit}>
      {errorEntries.length > 0 && (
        <div
          ref={summaryRef}
          role="alert"
          tabIndex={-1}
          className={styles.errorSummary}
        >
          <p className={styles.errorSummaryHeading}>{t.inquiry.errors.summaryHeading}</p>
          <ul className={styles.errorSummaryList}>
            {errorEntries.map(({ field, message }) => (
              <li key={field}>
                <a href={`#${fieldId(field)}`} className={styles.errorSummaryLink}>
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.field}>
        <label htmlFor={fieldId('name')} className={styles.label}>
          {t.inquiry.fields.name}
        </label>
        <input
          id={fieldId('name')}
          name="name"
          type="text"
          autoComplete="name"
          className={styles.input}
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            clearFieldError('name')
          }}
          {...(errors.name !== undefined
            ? { 'aria-invalid': 'true', 'aria-describedby': errorId('name') }
            : {})}
        />
        {errors.name !== undefined && (
          <span id={errorId('name')} className={styles.fieldError}>
            {errors.name}
          </span>
        )}
      </div>

      <div className={styles.fieldRowDates}>
        <div className={styles.field}>
          <label htmlFor={fieldId('checkIn')} className={styles.label}>
            {t.inquiry.fields.checkIn}
          </label>
          <input
            id={fieldId('checkIn')}
            name="checkIn"
            type="date"
            min={todayIso}
            className={styles.input}
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value)
              clearFieldError('checkIn')
            }}
            {...(errors.checkIn !== undefined
              ? { 'aria-invalid': 'true', 'aria-describedby': errorId('checkIn') }
              : {})}
          />
          {errors.checkIn !== undefined && (
            <span id={errorId('checkIn')} className={styles.fieldError}>
              {errors.checkIn}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor={fieldId('checkOut')} className={styles.label}>
            {t.inquiry.fields.checkOut}
          </label>
          <input
            id={fieldId('checkOut')}
            name="checkOut"
            type="date"
            min={checkIn || todayIso}
            className={styles.input}
            value={checkOut}
            onChange={(e) => {
              setCheckOut(e.target.value)
              clearFieldError('checkOut')
            }}
            {...(errors.checkOut !== undefined
              ? { 'aria-invalid': 'true', 'aria-describedby': errorId('checkOut') }
              : {})}
          />
          {errors.checkOut !== undefined && (
            <span id={errorId('checkOut')} className={styles.fieldError}>
              {errors.checkOut}
            </span>
          )}
        </div>
      </div>

      <div className={styles.fieldRowGuests}>
        <div className={styles.field}>
          <label htmlFor={fieldId('adults')} className={styles.label}>
            {t.inquiry.fields.adults}
          </label>
          <input
            id={fieldId('adults')}
            name="adults"
            type="number"
            inputMode="numeric"
            min={1}
            max={10}
            className={styles.input}
            value={adults}
            onChange={(e) => {
              setAdults(e.target.value)
              clearFieldError('adults')
            }}
            {...(errors.adults !== undefined
              ? { 'aria-invalid': 'true', 'aria-describedby': errorId('adults') }
              : {})}
          />
          {errors.adults !== undefined && (
            <span id={errorId('adults')} className={styles.fieldError}>
              {errors.adults}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor={fieldId('children')} className={styles.label}>
            {t.inquiry.fields.children}
          </label>
          <input
            id={fieldId('children')}
            name="children"
            type="number"
            inputMode="numeric"
            min={0}
            max={10}
            className={styles.input}
            value={children}
            onChange={(e) => {
              setChildren(e.target.value)
              clearFieldError('children')
            }}
            {...(errors.children !== undefined
              ? { 'aria-invalid': 'true', 'aria-describedby': errorId('children') }
              : {})}
          />
          {errors.children !== undefined && (
            <span id={errorId('children')} className={styles.fieldError}>
              {errors.children}
            </span>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor={fieldId('notes')} className={styles.label}>
          {t.inquiry.fields.notes}
        </label>
        <textarea
          id={fieldId('notes')}
          name="notes"
          rows={3}
          className={styles.textarea}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className={styles.actions}>
        <Button type="submit" variant="primary">
          {t.ctas.openWhatsApp}
        </Button>
        {fallbackChannel !== undefined && (
          <Button type="button" variant="ghost" onClick={handleFallbackClick}>
            {t.ctas.sendEmail}
          </Button>
        )}
      </div>

      {whatsappUrl !== null && (
        <output className={styles.statusBox}>
          <span>{t.inquiry.status.whatsappOpened}</span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.statusLink}
          >
            {t.ctas.openWhatsApp}
          </a>
        </output>
      )}

      {!siteConfig.contact.verified && (
        <p className={styles.unverifiedNote}>{t.inquiry.status.unverifiedNote}</p>
      )}
    </form>
  )
}
