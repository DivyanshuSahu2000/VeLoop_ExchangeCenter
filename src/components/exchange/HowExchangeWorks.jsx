import { Coins, Gem, ListChecks, ScanSearch, ShieldCheck } from 'lucide-react'
import { howItWorksSteps } from '../../data/exchangeData.js'
import styles from './HowExchangeWorks.module.css'

const STEP_ICONS = {
  earn: Gem,
  choose: ListChecks,
  review: ScanSearch,
  confirm: ShieldCheck,
  receive: Coins,
}

export default function HowExchangeWorks() {
  return (
    <section className={styles.section} aria-labelledby="how-title">
      <h2 id="how-title" className={styles.heading}>How Exchange Works</h2>
      <ol className={styles.steps}>
        {howItWorksSteps.map((step, index) => {
          const Icon = STEP_ICONS[step.id]
          return (
            <li key={step.id} className={styles.step}>
              <span className={styles.node}>
                <Icon size={24} aria-hidden="true" />
                <span className={styles.number}>{index + 1}</span>
              </span>
              <div>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.text}>{step.text}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
