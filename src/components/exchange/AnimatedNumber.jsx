import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/** Counts smoothly from the previous value to the new one. */
export default function AnimatedNumber({ value, duration = 900 }) {
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(value)
  const previous = useRef(value)

  useEffect(() => {
    const from = previous.current
    previous.current = value
    if (reduceMotion || from === value) {
      setDisplay(value)
      return undefined
    }
    let frame
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(from + (value - from) * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, duration, reduceMotion])

  return <>{display.toLocaleString('en-US')}</>
}
