import { AlertTriangle, Gem, RotateCw } from 'lucide-react'
import styles from './ExchangeState.module.css'

const VARIANTS = {
  empty: {
    Icon: Gem,
    title: 'No conversions available right now.',
    text: 'New reward conversion opportunities will appear here when available.',
  },
  error: {
    Icon: AlertTriangle,
    title: 'Unable to load exchange options.',
    text: 'Please try again.',
  },
}

/** Friendly empty / error panel. Never shows technical error details. */
export default function ExchangeState({ variant, onRetry }) {
  const { Icon, title, text } = VARIANTS[variant]
  return (
    <div className={styles.panel} role={variant === 'error' ? 'alert' : 'status'}>
      <span className={`${styles.icon} ${variant === 'error' ? styles.error : ''}`}>
        <Icon size={34} aria-hidden="true" />
      </span>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>{text}</p>
      {variant === 'error' && (
        <button type="button" className={styles.retry} onClick={onRetry}>
          <RotateCw size={16} aria-hidden="true" />
          Retry
        </button>
      )}
    </div>
  )
}
