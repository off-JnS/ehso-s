const ADDRESS = 'Bornheide 47b, 22549 Hamburg'
const MAPS_URL = `https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`

const HOURS = [
  { day: 'Montag',     open: '15:00', close: '00:00' },
  { day: 'Dienstag',   open: '15:00', close: '00:00' },
  { day: 'Mittwoch',   open: '15:00', close: '00:00' },
  { day: 'Donnerstag', open: '15:00', close: '00:00' },
  { day: 'Freitag',    open: '15:00', close: '02:00' },
  { day: 'Samstag',    open: '13:00', close: '02:00' },
  { day: 'Sonntag',    open: '13:00', close: '00:00' },
]

// 0 = Sunday in JS, remap to Mon=0
const todayIndex = () => (new Date().getDay() + 6) % 7

function HoursCard() {
  const today = todayIndex()

  return (
    <div className="info-card hours-card" data-animate="fade-up" data-delay="1">
      <div className="info-card-header">
        <span className="info-card-emoji" aria-hidden="true">🕐</span>
        <div>
          <h3>Öffnungszeiten</h3>
        </div>
      </div>
      <ul className="hours-list">
        {HOURS.map(({ day, open, close }, i) => {
          const isToday = i === today

          return (
            <li key={day} className={`hours-row${isToday ? ' hours-row--today' : ''}`}>
              <span className="hours-day">{day}</span>
              <span className="hours-time">{open} – {close}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function Location() {
  const openMaps = () => {
    const isApple = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent)
    if (isApple) {
      window.location.href = `maps://?q=${encodeURIComponent(ADDRESS)}`
    } else {
      window.open(MAPS_URL, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section className="section location-section" id="location">
      <div className="container">
        <p className="section-kicker" data-animate="fade-up">Standort & Kontakt</p>
        <h2 className="section-title" data-animate="fade-up">Hier findest du uns</h2>
        <p className="section-subtitle" data-animate="fade-up">
          Komm vorbei, ruf an oder bestell direkt nach Hause.
        </p>

        <div className="info-grid">

          {/* ── Left column: address + contact ── */}
          <div className="info-col">

            <button
              className="info-card info-card--clickable"
              onClick={openMaps}
              aria-label="Adresse in Karten-App öffnen"
              data-animate="fade-up"
              data-delay="0"
            >
              <div className="info-card-row">
                <span className="info-card-emoji" aria-hidden="true">📍</span>
                <div className="info-card-body">
                  <h3>Adresse</h3>
                  <p>Bornheide 47b<br />22549 Hamburg</p>
                </div>
                <span className="info-card-cta">In Karten öffnen →</span>
              </div>
            </button>

            <a
              href="tel:+4904076487272"
              className="info-card info-card--clickable"
              data-animate="fade-up"
              data-delay="1"
            >
              <div className="info-card-row">
                <span className="info-card-emoji" aria-hidden="true">📞</span>
                <div className="info-card-body">
                  <h3>Telefon</h3>
                  <p>040 764 87 272</p>
                </div>
                <span className="info-card-cta">Anrufen →</span>
              </div>
            </a>

            <a
              href="https://www.lieferando.de/speisekarte/ehsos-burger"
              target="_blank"
              rel="noopener noreferrer"
              className="info-card info-card--clickable"
              data-animate="fade-up"
              data-delay="2"
            >
              <div className="info-card-row">
                <div className="info-card-img-wrap">
                  <img
                    src="/menu-images/sonstiges/lieferando-logo.png"
                    alt="Lieferando"
                    className="info-lieferando-logo"
                  />
                </div>
                <div className="info-card-body">
                  <h3>Lieferando</h3>
                  <p>Jetzt online bestellen & liefern lassen</p>
                </div>
                <span className="info-card-cta">Bestellen →</span>
              </div>
            </a>

          </div>

          {/* ── Right column: hours ── */}
          <div className="info-col" data-animate="fade-up" data-delay="0">
            <HoursCard />
          </div>

        </div>
      </div>
    </section>
  )
}
