/**
 * Central data + mock service layer for the Exchange Center.
 * Replace the two `fetch*` / `submit*` functions with real API calls later;
 * components only depend on the shapes returned here.
 */

export const exchangeOptions = [
  {
    id: 'exchange-01',
    type: 'gem-to-ve',
    title: 'Daily Gem Conversion',
    description: 'Convert your earned Gems into VEs instantly.',
    requiredGems: 28,
    receiveVEs: 151,
    tone: 'violet',
    badge: 'Popular',
  },
  {
    id: 'exchange-02',
    type: 'gem-to-ve',
    title: 'Reward Conversion',
    description: 'Higher conversion for your better rewards.',
    requiredGems: 39,
    receiveVEs: 168,
    tone: 'blue',
    badge: 'Popular',
  },
  {
    id: 'exchange-03',
    type: 'gem-to-ve',
    title: 'Value Conversion',
    description: 'Unlock greater value with more Gems.',
    requiredGems: 57,
    receiveVEs: 255,
    tone: 'green',
    badge: null,
  },
  {
    id: 'exchange-04',
    type: 'gem-to-ve',
    title: 'Premium Conversion',
    description: 'Premium conversion for premium rewards.',
    requiredGems: 100,
    receiveVEs: 455,
    tone: 'orange',
    badge: null,
  },
]

export const initialBalance = {
  gems: 420,
  ves: 3850,
}

export const STATUS = {
  COMPLETED: 'completed',
  PROCESSING: 'processing',
  FAILED: 'failed',
}

export const initialHistory = [
  { id: 'h-5', gems: 28, ves: 151, date: '26 Aug 2026, 04:23 PM', status: STATUS.COMPLETED },
  { id: 'h-4', gems: 39, ves: 168, date: '25 Aug 2026, 11:15 AM', status: STATUS.COMPLETED },
  { id: 'h-3', gems: 57, ves: 255, date: '23 Aug 2026, 06:49 PM', status: STATUS.COMPLETED },
  { id: 'h-2', gems: 25, ves: 112, date: '20 Aug 2026, 09:10 AM', status: STATUS.COMPLETED },
  { id: 'h-1', gems: 28, ves: 151, date: '19 Aug 2026, 02:22 PM', status: STATUS.FAILED },
]

export const infoContent = {
  gems: {
    title: 'What are Gems?',
    body: 'Gems are reward credits earned through eligible activities on VELOOP Rewards.',
  },
  ves: {
    title: 'What are VEs?',
    body: "VEs are VELOOP Rewards' virtual reward currency and may be used for eligible redemption options according to platform rules.",
  },
  conversions: {
    title: 'How conversions are set',
    body: 'Each conversion has a fixed number of Gems and a fixed number of VEs. Both are predefined by VELOOP Rewards.',
  },
  rules: {
    title: 'About exchange rules',
    body: 'These rules apply to every conversion. Platform rules always take priority.',
  },
}

export const howItWorksSteps = [
  { id: 'earn', title: 'Earn Gems', text: 'Complete eligible activities and earn Gems.' },
  { id: 'choose', title: 'Choose Conversion', text: 'Select a conversion that suits your Gems balance.' },
  { id: 'review', title: 'Review Exchange', text: 'Review the details before confirming the conversion.' },
  { id: 'confirm', title: 'Confirm', text: 'Confirm the exchange to convert your Gems.' },
  { id: 'receive', title: 'Receive VEs', text: 'VEs are added to your balance instantly.' },
]

export const exchangeRules = [
  'Only eligible Gems can be exchanged.',
  'Exchange rates are predefined by VELOOP Rewards.',
  'Available conversions may vary.',
  'A successful conversion cannot be duplicated.',
  'Your balance is updated after successful conversion.',
  'Platform rules apply.',
]

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Mock loader. `demo` lets reviewers preview states via the URL:
 *   ?demo=loading | error | empty | low-gems
 * The error demo succeeds on retry (attempt > 0).
 */
export async function fetchExchangeData({ demo = null, attempt = 0 } = {}) {
  await wait(demo === 'loading' ? 60000 : 1400)

  if (demo === 'error' && attempt === 0) {
    throw new Error('EXCHANGE_LOAD_FAILED')
  }

  return {
    options: demo === 'empty' ? [] : exchangeOptions,
    balance: demo === 'low-gems' ? { ...initialBalance, gems: 12 } : initialBalance,
    history: initialHistory,
  }
}

/**
 * Mock conversion. A real backend must validate balance, apply the
 * conversion once (idempotency key) and return the new balance.
 */
export async function submitConversion(option) {
  await wait(1600)
  return {
    conversionId: `conv-${Date.now()}`,
    gemsSpent: option.requiredGems,
    vesReceived: option.receiveVEs,
  }
}
