import { motion, useReducedMotion } from 'framer-motion'
import successIcon from '../../assets/successIcon.png'
import styles from './ConversionSuccess.module.css'

const BURST_PARTICLES = Array.from({ length: 12 }, (_, index) => {
  const angle = (index / 12) * Math.PI * 2
  return { id: index, x: Math.cos(angle) * 70, y: Math.sin(angle) * 70 }
})

export default function ConversionSuccess({ option, onContinue }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className={styles.wrapper} role="status">
      <div className={styles.badgeArea}>
        {!reduceMotion &&
          BURST_PARTICLES.map((particle) => (
            <motion.span
              key={particle.id}
              className={styles.particle}
              initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              animate={{ opacity: 0, x: particle.x, y: particle.y, scale: 0.4 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
          ))}
        <motion.span
          // className={styles.check}
          initial={reduceMotion ? false : { scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16 }}
        ><img src={successIcon} alt="Check" width={100} height={100} />
        </motion.span>
      </div>

      <h2 id="exchange-modal-title" className={styles.title}>Conversion Complete</h2>
      <p className={styles.line}>{option.requiredGems} Gems converted</p>
      <p className={styles.reward}>+{option.receiveVEs} VEs added to your balance.</p>

      <button type="button" className={styles.button} data-autofocus onClick={onContinue}>
        Continue
      </button>
    </div>
  )
}
