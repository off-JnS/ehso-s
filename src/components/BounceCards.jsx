import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './BounceCards.css'

export default function BounceCards({
  className = '',
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(10deg) translate(-170px)',
    'rotate(5deg) translate(-85px)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(85px)',
    'rotate(2deg) translate(170px)'
  ],
  enableHover = true,
  verticalIndices = []
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.card',
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [animationStagger, easeType, animationDelay])

  const pushSiblings = (hoveredIdx) => {
    if (!enableHover || !containerRef.current) return
    const q = gsap.utils.selector(containerRef)
    images.forEach((_, i) => {
      const target = q(`.card-${i}`)
      gsap.killTweensOf(target)
      if (i === hoveredIdx) {
        gsap.to(target, { scale: 1.12, opacity: 1, zIndex: 10, duration: 0.35, ease: 'back.out(1.4)', overwrite: 'auto' })
      } else {
        gsap.to(target, { scale: 0.9, opacity: 0.4, zIndex: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
      }
    })
  }

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return
    const q = gsap.utils.selector(containerRef)
    images.forEach((_, i) => {
      const target = q(`.card-${i}`)
      gsap.killTweensOf(target)
      gsap.to(target, { scale: 1, opacity: 1, zIndex: 2, duration: 0.35, ease: 'back.out(1.4)', overwrite: 'auto' })
    })
  }

  return (
    <div
      className={`bounceCardsContainer ${className}`}
      ref={containerRef}
      style={{ position: 'relative', width: containerWidth, height: containerHeight }}
    >
      {images.map((src, idx) => {
        const isVertical = Array.isArray(verticalIndices) && verticalIndices.includes(idx)
        const isVideo =
          typeof src === 'string' &&
          (src.startsWith('video:') || /\.(mp4|webm|ogg)(\?.*)?$/.test(src))
        const videoSrc = isVideo && src.startsWith('video:') ? src.slice(6) : src

        return (
          <div
            key={idx}
            className={`card card-${idx}${isVertical ? ' card--vertical' : ''}`}
            style={{ transform: transformStyles[idx] ?? 'none' }}
            onMouseEnter={() => pushSiblings(idx)}
            onMouseLeave={resetSiblings}
          >
            {src ? (
              isVideo ? (
                <video className="image" src={videoSrc} autoPlay muted loop playsInline />
              ) : (
                <img className="image" src={src} alt={`card-${idx}`} />
              )
            ) : (
              <div
                className={`image image--empty${isVertical ? ' image--empty--vertical' : ''}`}
                aria-hidden="true"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
