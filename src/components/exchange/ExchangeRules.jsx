import { ShieldCheck } from 'lucide-react'
import InfoTip from './InfoTip.jsx'
import { exchangeRules, infoContent } from '../../data/exchangeData.js'
import styles from './ExchangeRules.module.css'

export default function ExchangeRules() {
  return (
    <section className={styles.section} aria-labelledby="rules-title">
      <h2 id="rules-title" className={styles.heading}>
        Exchange Rules
        <InfoTip title={infoContent.rules.title} body={infoContent.rules.body} label="About exchange rules" align="end" />
      </h2>
      <ul className={styles.list}>
        {exchangeRules.map((rule) => (
          <li key={rule}>
            <ShieldCheck size={16} className={styles.icon} aria-hidden="true" />
            {rule}
          </li>
        ))}
      </ul>
    </section>
  )
}
