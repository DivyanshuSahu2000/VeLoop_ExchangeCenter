import { GemIcon, VECoin } from './RewardIcons.jsx'
import AnimatedNumber from './AnimatedNumber.jsx'
import InfoTip from './InfoTip.jsx'
import { infoContent } from '../../data/exchangeData.js'
import styles from './BalanceOverview.module.css'

export default function BalanceOverview({ balance }) {
  return (
    <section className={styles.grid} aria-label="Your balances">
      <article className={`${styles.card} ${styles.gems}`}>
        <GemIcon tone="violet" size={56} />
        <div className={styles.body}>
          <p className={styles.label}>
            Available Gems
            <InfoTip title={infoContent.gems.title} body={infoContent.gems.body} label="What are Gems?" />
          </p>
          <p className={styles.value} aria-live="polite">
            <AnimatedNumber value={balance.gems} />
          </p>
          <p className={styles.caption}>Your reward Gems</p>
        </div>
      </article>

      <article className={`${styles.card} ${styles.ves}`}>
        <VECoin size={56} />
        <div className={styles.body}>
          <p className={styles.label}>
            Available VEs
            <InfoTip title={infoContent.ves.title} body={infoContent.ves.body} label="What are VEs?" align="end" />
          </p>
          <p className={styles.value} aria-live="polite">
            <AnimatedNumber value={balance.ves} />
          </p>
          <p className={styles.caption}>Your VE balance</p>
        </div>
      </article>
    </section>
  )
}
