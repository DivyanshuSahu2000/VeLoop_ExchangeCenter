import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { GemIcon, VECoin } from './RewardIcons.jsx'
import styles from './ExchangeCard.module.css'

export default function ExchangeCard({ option, availableGems, onConvert, onEarnMore, index = 0 }) {
  const missingGems = Math.max(option.requiredGems - availableGems, 0)
  const isLocked = missingGems > 0

  return (
    <motion.article
      className={`${styles.card} ${styles[option.tone]} ${isLocked ? styles.locked : ''}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08 * index }}
      whileHover={{ y: -4 }}
    >
      {option.badge && <span className={styles.badge}>{option.badge}</span>}

      <div className={styles.visual} aria-hidden="true">
        <span className={styles.floatGem}>
          <GemIcon tone={option.tone} size={54} />
        </span>
        <ArrowRight className={styles.arrow} size={22} />
        <span className={styles.coin}>
          <VECoin size={54} />
        </span>
      </div>

      <h3 className={styles.title}>{option.title}</h3>

      <div className={styles.values}>
        <p className={styles.required}>{option.requiredGems} Gems</p>
        <p className={styles.receive}>
          <span className={styles.receiveLabel}>You receive</span>
          {option.receiveVEs} VEs
        </p>
      </div>

      <p className={styles.description}>{option.description}</p>

      {isLocked ? (
        <div className={styles.lockedInfo}>
          <p>
            You have <strong>{availableGems} Gems</strong>. You need{' '}
            <strong>{missingGems} more</strong> to unlock this conversion.
          </p>
          <button type="button" className={`${styles.cta} ${styles.earn}`} onClick={onEarnMore}>
            <Sparkles size={16} aria-hidden="true" />
            Earn More Gems
          </button>
        </div>
      ) : (
        <button
          type="button"
          className={styles.cta}
          onClick={() => onConvert(option)}
          aria-label={`Convert ${option.requiredGems} Gems into ${option.receiveVEs} VEs`}
        >
          Convert Rewards
        </button>
      )}
    </motion.article>
  )
}
