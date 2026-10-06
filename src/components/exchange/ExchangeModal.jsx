import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, X } from 'lucide-react'
import { GemIcon, VECoin } from './RewardIcons.jsx'
import ConversionSuccess from './ConversionSuccess.jsx'
import styles from './ExchangeModal.module.css'

const FOCUSABLE = 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'

/**
 * stage = 'confirm' | 'success'
 * While `isProcessing` the confirm button is disabled so a conversion can't be sent twice.
 */
export default function ExchangeModal({ option, balance, stage, isProcessing, onCancel, onConfirm, onClose }) {
  const dialogRef = useRef(null)
  const gemsAfter = balance.gems - option.requiredGems
  const vesAfter = balance.ves + option.receiveVEs
  const close = stage === 'success' ? onClose : onCancel

  const latest = useRef({ close, isProcessing })

  useEffect(() => {
    latest.current = { close, isProcessing }
  })

  // Lock scroll and restore focus once, for the lifetime of the modal.
  useEffect(() => {
    const previouslyFocused = document.activeElement
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [])

  // Move focus to the primary action whenever the stage changes.
  useEffect(() => {
    dialogRef.current?.querySelector('[data-autofocus]')?.focus()
  }, [stage])

  // Escape closes (unless converting); Tab stays inside the dialog.
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape' && !latest.current.isProcessing) {
        latest.current.close()
        return
      }
      if (event.key !== 'Tab') return
      const items = dialogRef.current?.querySelectorAll(FOCUSABLE)
      if (!items?.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => !isProcessing && close()}
    >
      <motion.div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exchange-modal-title"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        onClick={(event) => event.stopPropagation()}
      >
        {stage === 'success' ? (
          <ConversionSuccess option={option} onContinue={onClose} />
        ) : (
          <>
            <button
              type="button"
              className={styles.close}
              aria-label="Close"
              onClick={onCancel}
              disabled={isProcessing}
            >
              <X size={18} aria-hidden="true" />
            </button>
            <h2 id="exchange-modal-title" className={styles.title}>Confirm Conversion</h2>

            <div className={styles.flow}>
              <div className={styles.flowItem}>
                <GemIcon tone={option.tone} size={44} />
                <span>{option.requiredGems} Gems</span>
              </div>
              <ArrowDown className={styles.flowArrow} size={22} aria-hidden="true" />
              <div className={`${styles.flowItem} ${styles.flowReceive}`}>
                <VECoin size={44} />
                <span>{option.receiveVEs} VEs</span>
              </div>
            </div>

            <dl className={styles.after}>
              <div>
                <dt>Gems after conversion</dt>
                <dd>{gemsAfter.toLocaleString('en-US')}</dd>
              </div>
              <div>
                <dt>VEs after conversion</dt>
                <dd>{vesAfter.toLocaleString('en-US')}</dd>
              </div>
            </dl>

            <div className={styles.actions}>
              <button type="button" className={styles.cancel} onClick={onCancel} disabled={isProcessing}>
                Cancel
              </button>
              <button
                type="button"
                className={styles.confirm}
                data-autofocus
                onClick={onConfirm}
                disabled={isProcessing}
                aria-busy={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true" />
                    Converting...
                  </>
                ) : (
                  'Confirm Conversion'
                )}
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
