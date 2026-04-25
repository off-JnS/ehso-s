import React, { useEffect, useRef, useState } from 'react'
import './StackedRotator.css'

const StackedRotator = ({ items = [], interval = 5000, animationDuration = 700, className = '' }) => {
  const [order, setOrder] = useState(items.map((_, i) => i))
  const orderRef = useRef(order)
  const animatingRef = useRef(false)
  const [outgoing, setOutgoing] = useState(null)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)
  const doRotateRef = useRef(null)

  useEffect(() => {
    const initial = items.map((_, i) => i)
    setOrder(initial)
    orderRef.current = initial
  }, [items])

  useEffect(() => {
    orderRef.current = order
  }, [order])

  useEffect(() => {
    if (!items || items.length <= 1) return

    // define a reusable rotate function on a ref so it can be invoked
    // from the timer and on user interaction (tap/keyboard)
    doRotateRef.current = () => {
      if (animatingRef.current) return
      animatingRef.current = true
      const currentTop = orderRef.current[0]
      setOutgoing(currentTop)

      // clear any existing timers to avoid overlap
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      timeoutRef.current = setTimeout(() => {
        setOrder(prev => {
          const next = prev.slice(1).concat(prev[0])
          orderRef.current = next
          return next
        })
        setOutgoing(null)
        animatingRef.current = false

        // restart automatic rotation
        intervalRef.current = setInterval(() => {
          if (doRotateRef.current) doRotateRef.current()
        }, interval)
      }, animationDuration)
    }

    // start automatic rotation
    intervalRef.current = setInterval(() => {
      if (doRotateRef.current) doRotateRef.current()
    }, interval)

    return () => {
      clearInterval(intervalRef.current)
      clearTimeout(timeoutRef.current)
    }
  }, [items, interval, animationDuration])

  const count = items.length

  // Responsive offsets: tighter spacing on very small screens
  const [offsetY, setOffsetY] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 420 ? 12 : 18
  )
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 420) setOffsetY(12)
      else if (window.innerWidth < 600) setOffsetY(14)
      else setOffsetY(18)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const scaleStep = 0.03
  const rotationStep = -2 // deg per depth

  return (
    <div
      className={`stacked-rotator ${className}`.trim()
      }
      onClick={(e) => {
        // only primary button or touch
        if (e && e.type === 'click' && e.button !== 0) return
        if (doRotateRef.current) doRotateRef.current()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          if (doRotateRef.current) doRotateRef.current()
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Weiter drehen"
    >
      {order.map((idx, pos) => {
        const node = items[idx]
        const depth = pos
        const isOutgoing = outgoing === idx
        const translateY = isOutgoing ? -42 : depth * offsetY
        const scale = isOutgoing ? 0.97 : Math.max(0.86, 1 - depth * scaleStep)
        const rotation = isOutgoing ? -8 : depth * rotationStep
        const opacity = isOutgoing ? 0 : 1
        const zIndex = count - pos

        const style = {
          zIndex,
          transform: `translate(-50%, ${translateY}px) scale(${scale}) rotate(${rotation}deg)`,
          opacity,
          transition: `transform ${animationDuration}ms cubic-bezier(.22,.9,.36,1), opacity ${animationDuration}ms ease`
        }

        return (
          <div key={idx} className={`rotator-card ${isOutgoing ? 'is-out' : ''} ${pos === 0 ? 'is-top' : ''}`} style={style}>
            {node}
          </div>
        )
      })}
    </div>
  )
}

export default StackedRotator
