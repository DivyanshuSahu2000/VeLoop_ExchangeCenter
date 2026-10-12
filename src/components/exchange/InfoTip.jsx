import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { Info } from 'lucide-react'
import styles from './InfoTip.module.css'

/** ⓘ button that shows a short explanation on click, hover or keyboard focus. */
export default function InfoTip({ title, body, label, align = 'start' }) {
  const [open, setOpen] = useState(false)
  const [popoverPosition, setPopoverPosition] = useState(null)
  const wrapperRef = useRef(null)
  const triggerRef = useRef(null)
  const popoverRef = useRef(null)
  const tipId = useId()

  const openPopover = () => {
    if (!open) setPopoverPosition(null)
    setOpen(true)
  }

  useLayoutEffect(() => {
    if (!open) return undefined

    const updatePosition = () => {
      const trigger = triggerRef.current
      const popover = popoverRef.current
      if (!trigger || !popover) return

      const triggerRect = trigger.getBoundingClientRect()
      const popoverWidth = Math.min(popover.offsetWidth, window.innerWidth - 32)
      const desiredLeft = align === 'end'
        ? triggerRect.right + 8 - popoverWidth
        : triggerRect.left - 8
      const left = Math.min(
        Math.max(16, desiredLeft),
        window.innerWidth - popoverWidth - 16,
      )
      const popoverHeight = Math.min(popover.offsetHeight, window.innerHeight - 16)
      const belowTop = triggerRect.bottom + 8
      const top = belowTop + popoverHeight <= window.innerHeight - 8
        ? belowTop
        : Math.max(8, triggerRect.top - popoverHeight - 8)

      setPopoverPosition({
        position: 'fixed',
        left,
        top,
        width: popoverWidth,
        maxWidth: window.innerWidth - 32,
        maxHeight: window.innerHeight - 16,
        overflowY: 'auto',
      })
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [align, open])

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
      onMouseEnter={openPopover}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        ref={triggerRef}
        className={styles.trigger}
        aria-label={label ?? title}
        aria-expanded={open}
        aria-describedby={open ? tipId : undefined}
        onClick={openPopover}
      >
        <Info size={15} aria-hidden="true" />
      </button>
      {open && (
        <span
          ref={popoverRef}
          id={tipId}
          role="tooltip"
          className={`${styles.popover} ${styles[align]}`}
          style={popoverPosition ?? undefined}
        >
          <strong>{title}</strong>
          <span>{body}</span>
        </span>
      )}
    </span>
  )
}
