import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ChevronDown, Clock3, XCircle } from 'lucide-react'
import { STATUS } from '../../data/exchangeData.js'
import styles from './ExchangeHistory.module.css'

const STATUS_VIEW = {
  [STATUS.COMPLETED]: { label: 'Completed', Icon: CheckCircle2, className: styles.completed },
  [STATUS.PROCESSING]: { label: 'Processing', Icon: Clock3, className: styles.processing },
  [STATUS.FAILED]: { label: 'Failed', Icon: XCircle, className: styles.failed },
}

const COLLAPSED_COUNT = 3

export default function ExchangeHistory({ items }) {
  const [expanded, setExpanded] = useState(false)
  const visibleItems = expanded ? items : items.slice(0, COLLAPSED_COUNT)
  const canExpand = items.length > COLLAPSED_COUNT

  return (
    <section className={styles.section} aria-labelledby="history-title">
      <h2 id="history-title" className={styles.heading}>Recent Conversions</h2>

      {items.length === 0 ? (
        <p className={styles.empty}>Your conversions will appear here after your first exchange.</p>
      ) : (
        <ul className={styles.list}>
          <AnimatePresence initial={false}>
            {visibleItems.map((item) => {
              const { label, Icon, className } = STATUS_VIEW[item.status]
              return (
                <motion.li
                  key={item.id}
                  className={styles.item}
                  layout
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div>
                    <p className={styles.amounts}>
                      {item.gems} Gems <span aria-label="converted to">→</span> {item.ves} VEs
                    </p>
                    <p className={styles.date}>{item.date}</p>
                  </div>
                  <span className={`${styles.status} ${className}`}>
                    <Icon size={15} aria-hidden="true" />
                    {label}
                  </span>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ul>
      )}

      {canExpand && (
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? 'Show less' : 'View full history'}
          <ChevronDown size={16} className={expanded ? styles.flip : ''} aria-hidden="true" />
        </button>
      )}
    </section>
  )
}
