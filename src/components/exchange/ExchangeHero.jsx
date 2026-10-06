import { motion, useReducedMotion } from 'framer-motion'
import heroArt from '../../assets/hero-art.svg'
import InfoTip from './InfoTip.jsx'
import { infoContent } from '../../data/exchangeData.js'
import styles from './ExchangeHero.module.css'

export default function ExchangeHero() {
  const reduceMotion = useReducedMotion()

  return (
    <header className={styles.hero}>
      <div className={styles.copy}>
        <h1 className={styles.title}>Exchange Center</h1>
        <p className={styles.subtitle}>Turn your earned Gems into VEs</p>
        <p className={styles.support}>
          Convert your eligible Gems into VEs and continue your reward journey.
          <InfoTip
            title={infoContent.conversions.title}
            body={infoContent.conversions.body}
            label="About exchange rates"
          />
        </p>
      </div>
      <motion.img
        className={styles.art}
        src={heroArt}
        alt="A violet Gem dropping through a golden ring and becoming a VE coin"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
    </header>
  )
}
