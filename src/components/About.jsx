import { useState, useEffect } from 'react'
import CardSwap, { Card } from './CardSwap'
import StackedRotator from './StackedRotator'

const features = [
  {
    icon: '🍔',
    title: 'Frische Zutaten',
    desc: 'Täglich frisch zubereitet mit regionalen, hochwertigen Produkten.',
  },
  {
    icon: '🛵',
    title: 'Delivery',
    desc: 'Schnell & heiß über Lieferando direkt zu dir nach Hause.',
  },
  {
    icon: '📦',
    title: 'Takeaway',
    desc: 'Online bestellen und vor Ort abholen – einfach und ohne Wartezeit.',
  },
]

export default function About() {
  // Only mount CardSwap on desktop — prevents GSAP running on mobile (perf + no layout benefit)
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const handler = (e) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return (
    <section className="section about" id="about">
      <div className="container">

        <p className="section-kicker" data-animate="fade-up">Wer wir sind</p>
        <h2 className="section-title" data-animate="fade-up">Über uns</h2>

        <div className="about-grid">

          {/* ── Left: text + GIF ── */}
          <div className="about-text" data-animate="fade-right">
            <p className="about-lead">
              <strong>Ehso's Burger</strong> steht für echten Burger-Genuss im{' '}
              <strong>Herzen von Hamburg</strong>. Wir servieren saftige, frisch
              zubereitete Burger mit <strong>hochwertigen Zutaten</strong>, perfekt
              gegrillten Patties und <strong>hausgemachten Saucen</strong>.
            </p>
            <p className="about-body">
              Qualität, Geschmack und <strong>Leidenschaft</strong> stehen bei uns an
              erster Stelle. Ob Klassiker oder <strong>Spezialkreationen</strong> – bei
              uns bekommst du Burger, die begeistern und Lust auf mehr machen.{' '}
              <strong>Komm vorbei und überzeuge dich selbst!</strong>
            </p>
          </div>

          {/* ── Right: animated CardSwap (desktop only — hidden + not mounted on mobile) ── */}
          <div className="about-cards-wrap" data-animate="fade-left">
            {isDesktop && (
              <div className="card-swap-wrap">
                <CardSwap
                  width={400}
                  height={260}
                  cardDistance={55}
                  verticalDistance={65}
                  delay={4000}
                  skewAmount={5}
                  easing="elastic"
                >
                  {features.map(({ icon, title, desc }) => (
                    <Card key={title}>
                      <div className="about-card-icon">{icon}</div>
                      <div className="about-card-accent" />
                      <p className="about-card-title">{title}</p>
                      <p className="about-card-desc">{desc}</p>
                    </Card>
                  ))}
                </CardSwap>
              </div>
            )}
          </div>

        </div>

        {/* ── Features: stacked rotator on mobile, CardSwap on desktop ── */}
        {!isDesktop ? (
          <StackedRotator
            items={features.map(({ icon, title, desc }) => (
              <div className="about-tile" key={title}>
                <span className="about-tile-icon">{icon}</span>
                <div className="about-tile-text">
                  <p className="about-tile-title">{title}</p>
                  <p className="about-tile-desc">{desc}</p>
                </div>
              </div>
            ))}
            interval={5000}
            animationDuration={700}
            className="about-tiles-stack"
          />
        ) : (
          <div className="about-tiles">
            {features.map(({ icon, title, desc }, i) => (
              <div
                className="about-tile"
                key={title}
                data-animate="fade-up"
                data-delay={String(i)}
              >
                <span className="about-tile-icon">{icon}</span>
                {/* Wrapper ensures title + desc stack vertically in row layout */}
                <div className="about-tile-text">
                  <p className="about-tile-title">{title}</p>
                  <p className="about-tile-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
