import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ExchangeHero from '../../components/exchange/ExchangeHero.jsx'
import BalanceOverview from '../../components/exchange/BalanceOverview.jsx'
import ExchangeCard from '../../components/exchange/ExchangeCard.jsx'
import ExchangeModal from '../../components/exchange/ExchangeModal.jsx'
import ExchangeHistory from '../../components/exchange/ExchangeHistory.jsx'
import ExchangeRules from '../../components/exchange/ExchangeRules.jsx'
import HowExchangeWorks from '../../components/exchange/HowExchangeWorks.jsx'
import ExchangeLoader from '../../components/exchange/ExchangeLoader.jsx'
import ExchangeState from '../../components/exchange/ExchangeState.jsx'
import InfoTip from '../../components/exchange/InfoTip.jsx'
import {
  STATUS,
  fetchExchangeData,
  infoContent,
  submitConversion,
} from '../../data/exchangeData.js'
import styles from './ExchangeCenter.module.css'

const demoMode = new URLSearchParams(window.location.search).get('demo')

export default function ExchangeCenter() {
  const [viewState, setViewState] = useState('loading') // loading | ready | error
  const [options, setOptions] = useState([])
  const [balance, setBalance] = useState({ gems: 0, ves: 0 })
  const [history, setHistory] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const [modalStage, setModalStage] = useState('confirm') // confirm | success
  const [isProcessing, setIsProcessing] = useState(false)
  const [toast, setToast] = useState('')
  const attemptRef = useRef(0)
  const processingRef = useRef(false) // synchronous guard against double clicks
  const requestRef = useRef(0)

  const loadData = useCallback(async () => {
    const requestId = ++requestRef.current
    try {
      const data = await fetchExchangeData({ demo: demoMode, attempt: attemptRef.current })
      if (requestId !== requestRef.current) return
      setOptions(data.options)
      setBalance(data.balance)
      setHistory(data.history)
      setViewState('ready')
    } catch {
      if (requestId !== requestRef.current) return
      setViewState('error')
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(''), 3200)
    return () => clearTimeout(timer)
  }, [toast])

  const handleRetry = () => {
    attemptRef.current += 1
    setViewState('loading')
    loadData()
  }

  const openConversion = (option) => {
    if (balance.gems < option.requiredGems) return
    setModalStage('confirm')
    setSelectedOption(option)
  }

  const cancelConversion = useCallback(() => setSelectedOption(null), [])

  const confirmConversion = async () => {
    if (processingRef.current || !selectedOption) return
    if (balance.gems < selectedOption.requiredGems) return
    processingRef.current = true
    setIsProcessing(true)

    try {
      const result = await submitConversion(selectedOption)
      setBalance((current) => ({
        gems: current.gems - result.gemsSpent,
        ves: current.ves + result.vesReceived,
      }))
      setHistory((current) => [
        {
          id: result.conversionId,
          gems: result.gemsSpent,
          ves: result.vesReceived,
          date: 'Just now',
          status: STATUS.COMPLETED,
        },
        ...current,
      ])
      setModalStage('success')
    } catch {
      setSelectedOption(null)
      setToast('Conversion could not be completed. Please try again.')
    } finally {
      processingRef.current = false
      setIsProcessing(false)
    }
  }

  const handleEarnMore = () => {
    setToast('Complete eligible activities on VELOOP Rewards to earn more Gems.')
  }

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <ExchangeHero />

        {viewState === 'loading' && <ExchangeLoader />}

        {viewState === 'error' && (
          <div className={styles.stateWrap}>
            <ExchangeState variant="error" onRetry={handleRetry} />
          </div>
        )}

        {viewState === 'ready' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <BalanceOverview balance={balance} />

            <section className={styles.section} aria-labelledby="conversions-title">
              <div className={styles.sectionHead}>
                <h2 id="conversions-title" className={styles.sectionTitle}>
                  Available Conversions
                  <InfoTip
                    title={infoContent.conversions.title}
                    body={infoContent.conversions.body}
                    label="About available conversions"
                  />
                </h2>
                <p className={styles.sectionHint}>Choose a conversion that works best for you.</p>
              </div>

              {options.length === 0 ? (
                <ExchangeState variant="empty" />
              ) : (
                <div className="row g-3">
                  {options.map((option, index) => (
                    <div className="col-12 col-md-6 col-xl-3" key={option.id}>
                      <ExchangeCard
                        option={option}
                        index={index}
                        availableGems={balance.gems}
                        onConvert={openConversion}
                        onEarnMore={handleEarnMore}
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>

            <div className={styles.section}>
              <HowExchangeWorks />
            </div>

            <div className={`row g-3 ${styles.section}`}>
              <div className="col-12 col-lg-7">
                <ExchangeHistory items={history} />
              </div>
              <div className="col-12 col-lg-5">
                <ExchangeRules />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedOption && (
          <ExchangeModal
            key="exchange-modal"
            option={selectedOption}
            balance={balance}
            stage={modalStage}
            isProcessing={isProcessing}
            onCancel={cancelConversion}
            onConfirm={confirmConversion}
            onClose={cancelConversion}
          />
        )}
      </AnimatePresence>

      <div className={styles.toast} role="status" aria-live="polite">
        {toast}
      </div>
    </main>
  )
}
