import styles from './RewardIcons.module.css'

const GEM_TONES = {
  violet: ['#d7ccff', '#8b6cf0', '#4330a3'],
  blue: ['#bcd6ff', '#4f8cf0', '#2a4fa8'],
  green: ['#b8f0d8', '#2fbf8a', '#177a58'],
  orange: ['#ffdcb0', '#f0913a', '#b25a14'],
}

export function GemIcon({ tone = 'violet', size = 48, className = '' }) {
  const [light, mid, dark] = GEM_TONES[tone] ?? GEM_TONES.violet
  const id = `gem-${tone}`
  return (
    <svg
      className={`${styles.icon} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={light} />
          <stop offset="1" stopColor={mid} />
        </linearGradient>
      </defs>
      <polygon points="18,12 46,12 58,26 32,56 6,26" fill={`url(#${id})`} />
      <polygon points="18,12 26,12 22,26 6,26" fill={light} opacity="0.9" />
      <polygon points="26,12 38,12 42,26 22,26" fill="#fff" opacity="0.7" />
      <polygon points="6,26 22,26 32,56" fill={mid} />
      <polygon points="42,26 58,26 32,56" fill={dark} />
    </svg>
  )
}

export function VECoin({ size = 48, className = '' }) {
  return (
    <svg
      className={`${styles.icon} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="ve-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbe08a" />
          <stop offset="1" stopColor="#9a7128" />
        </linearGradient>
        <linearGradient id="ve-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbe08a" />
          <stop offset="0.6" stopColor="#f2c14e" />
          <stop offset="1" stopColor="#c8912f" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#ve-rim)" />
      <circle cx="32" cy="32" r="25" fill="url(#ve-face)" />
      <circle cx="32" cy="32" r="20" fill="none" stroke="#8a6a25" strokeOpacity="0.5" strokeWidth="1.5" />
      <text x="32" y="39" textAnchor="middle" fontSize="20" fontWeight="900" fill="#6b4c12" fontFamily="Inter, Arial, sans-serif">
        VE
      </text>
    </svg>
  )
}
