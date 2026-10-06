import { useEffect, useId, useRef, useState } from 'react'
import { Info } from 'lucide-react'
import styles from './InfoTip.module.css'

/** ⓘ button that shows a short explanation on click, hover or keyboard focus. */
export default function InfoTip({ title, body, label, align = 'start' }) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)
  const tipId = useId()

  useEffect(() => {
    if (!open) return undefined
    const handlePointer = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) setOpen(false)
    }
    const handleKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', handlePointer)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('pointerdown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  return (
    <span
      ref={wrapperRef}
      className={styles.wrapper}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={styles.trigger}
        aria-label={label ?? title}
        aria-expanded={open}
        aria-describedby={open ? tipId : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        <Info size={15} aria-hidden="true" />
      </button>
      {open && (
        <span id={tipId} role="tooltip" className={`${styles.popover} ${styles[align]}`}>
          <strong>{title}</strong>
          <span>{body}</span>
        </span>
      )}
    </span>
  )
}
