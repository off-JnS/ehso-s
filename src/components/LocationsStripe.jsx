import { useState, useEffect } from 'react'
import FlowingMenu from './FlowingMenu'
import './LocationsStripe.css'

const LOCATIONS = [
  {
    id: 'osdorf',
    text: 'Osdorf',
    image: '',
    coming: false,
    address: 'Bornheide 47b\n22549 Hamburg',
    hours: 'Mo–So: 11:00 – 22:00 Uhr',
    phone: null,
    lieferando: 'https://www.lieferando.de/speisekarte/ehsos-burger',
  },
  {
    id: 'coming-soon',
    text: 'Kommt bald',
    image: '',
    coming: true,
    address: null,
    hours: null,
    phone: null,
    lieferando: null,
  },
]

function LocationModal({ loc, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="loc-backdrop" onClick={onClose} role="presentation">
      <div
        className="loc-modal"
        role="dialog"
        aria-modal="true"
        aria-label={loc.text}
        onClick={e => e.stopPropagation()}
      >
        <div className="loc-modal-accent" />

        <button className="loc-modal-close" aria-label="Schließen" onClick={onClose}>
          ✕
        </button>

        <p className="loc-modal-kicker">Standort</p>
        <h2 className="loc-modal-title">{loc.text}</h2>

        {loc.coming ? (
          <div className="loc-modal-coming">
            <span className="loc-modal-coming-icon">🚀</span>
            <p>Wir expandieren! Unser nächster Standort ist bereits in Planung.</p>
            <p className="loc-modal-coming-sub">Bleib gespannt – bald geht's los.</p>
          </div>
        ) : (
          <div className="loc-modal-body">
            <div className="loc-modal-row">
              <span className="loc-modal-row-icon">📍</span>
              <div>
                <p className="loc-modal-label">Adresse</p>
                <p className="loc-modal-value">
                  {loc.address.split('\n').map((line, i, arr) => (
                    <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                  ))}
                </p>
              </div>
            </div>

            <div className="loc-modal-row">
              <span className="loc-modal-row-icon">🕐</span>
              <div>
                <p className="loc-modal-label">Öffnungszeiten</p>
                <p className="loc-modal-value">{loc.hours}</p>
              </div>
            </div>

            {loc.phone && (
              <div className="loc-modal-row">
                <span className="loc-modal-row-icon">📞</span>
                <div>
                  <p className="loc-modal-label">Telefon</p>
                  <a href={`tel:${loc.phone}`} className="loc-modal-value loc-modal-tel">
                    {loc.phone}
                  </a>
                </div>
              </div>
            )}

            <div className="loc-modal-row">
              <span className="loc-modal-row-icon">🛵</span>
              <div>
                <p className="loc-modal-label">Bestellen</p>
                <p className="loc-modal-value">Takeaway &amp; Delivery</p>
              </div>
            </div>

            <a
              href={loc.lieferando}
              target="_blank"
              rel="noopener noreferrer"
              className="loc-modal-cta"
            >
              Jetzt auf Lieferando bestellen →
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default function LocationsStripe() {
  const [activeIdx, setActiveIdx] = useState(null)
  const loc = activeIdx !== null ? LOCATIONS[activeIdx] : null

  return (
    <>
      <section className="locations-stripe-section" aria-label="Standorte">
        <div className="locations-stripe-heading">
          <p className="section-kicker" data-animate="fade-up">Locations</p>
          <h2 className="section-title" data-animate="fade-up">Bald zwei mal in Hamburg</h2>
        </div>
        <div style={{ height: '300px', position: 'relative' }}>
          <FlowingMenu
            items={LOCATIONS}
            speed={18}
            bgColor="#111"
            textColor="#f8f8f8"
            marqueeBgColor="#f97316"
            marqueeTextColor="#fff"
            borderColor="rgba(255,255,255,0.08)"
            onItemClick={setActiveIdx}
          />
        </div>
      </section>

      {loc && <LocationModal loc={loc} onClose={() => setActiveIdx(null)} />}
    </>
  )
}
