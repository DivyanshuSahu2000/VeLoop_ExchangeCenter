import { GemIcon, VECoin } from './RewardIcons.jsx'
import styles from './ExchangeLoader.module.css'

export default function ExchangeLoader() {
  return (
    <div className={styles.loader} role="status" aria-live="polite">
      <div className={styles.stage} aria-hidden="true">
        <span className={styles.gem}><GemIcon size={52} /></span>
        <span className={styles.ring} />
        <span className={styles.coin}><VECoin size={52} /></span>
      </div>
      <p className={styles.text}>Preparing your reward conversions...</p>
    </div>
  )
}
