import { useState, useEffect, useRef } from 'react'

const BURGER = [
  { name: 'Hamburger', price: '8,00 €', allergens: 'a, d, g, l, m', desc: 'Beef 150g, karamellisierte Zwiebeln, frische Tomaten und Gewürzgurken' },
  { name: 'Cheese Burger', price: '9,00 €', allergens: 'a, d, g, l, m', desc: 'Beef 150g, Cheddar, karamellisierte Zwiebeln, frische Tomaten und Gewürzgurken' },
  { name: 'Double Cheese Burger', price: '11,00 €', allergens: 'a, d, g, l, m', desc: '2× Beef 150g, Cheddar, karamellisierte Zwiebeln, frische Tomaten und Gewürzgurken' },
  { name: 'Champignon Burger', price: '10,00 €', allergens: 'a, d, g, l, m', desc: 'Beef 150g, Cheddar, Champignons und karamellisierte Zwiebeln' },
  { name: 'BBQ Bacon Burger', price: '11,00 €', allergens: '1, 3, a, d, g, l, m', desc: 'Beef 150g, Cheddar, Rinder-Bacon, karamellisierte Zwiebeln und frische Tomaten' },
  { name: 'Bacon Egg Burger', price: '10,00 €', allergens: '1, 3, a, d, g, l, m', desc: 'Beef 150g, Rinder-Bacon, Ei, Cheddar, karamellisierte Zwiebeln und Tomaten' },
  { name: 'Blue-Cheese Bacon', price: '11,00 €', allergens: '1, 3, a, d, g, l, m', desc: 'Beef 150g, französischer Blauschimmelkäse, Rinder-Bacon, karamellisierte Zwiebeln und frische Tomaten' },
  { name: 'Chili Cheese Burger', price: '10,00 €', allergens: 'a, d, g, l, m', desc: 'Beef 150g, Cheddar, Jalapeños, karamellisierte Zwiebeln und frische Tomaten' },
  { name: 'Crispy Chicken Burger', price: '10,00 €', allergens: 'a, d, g, l, m', desc: 'Crispy Chicken 130g, Cheddar, Jalapeños, karamellisierte Zwiebeln, frische Tomaten' },
  { name: 'Chicken Lemon Burger', price: '10,00 €', allergens: 'a, d, g, l, m', desc: '150g mariniertes Hähnchenbrustfilet, Cheddar, karamellisierte Zwiebeln, frische Tomaten und Gewürzgurken' },
  { name: "Ehso's Burger", price: '12,00 €', allergens: '1, 2, 3, a, d, g, l, m', badge: 'Hausspecial', desc: 'Beef 150g, Cheddar, Sucuk, Schafskäse, karamellisierte Zwiebeln, frische Tomaten und Gewürzgurken' },
]

const CROQUE = [
  { name: 'Pute', allergens: '1, 3, a, g', desc: 'Putenbrust, Tomaten und Edamer' },
  { name: 'Salami', allergens: '1, 2, 3, a, g', desc: 'Rindersalami, Gewürzgurken und Edamer' },
  { name: 'Pute Ananas', allergens: '1, 3, a, g', desc: 'Putenbrust, Ananas und Edamer' },
  { name: 'Pute Bacon', allergens: '1, 3, a, g', desc: 'Putenbrust, Tomaten, Rinder-Bacon und Edamer' },
  { name: 'Spicy Chicken', allergens: 'a, g', desc: 'Spicy Chicken, Tomaten, rote Zwiebeln und Edamer' },
  { name: 'Crispy Chicken', allergens: 'a, g', desc: 'Crispy Chicken, Tomaten, Jalapeños und Cheddar' },
  { name: 'Sucuk', allergens: '1, 2, 3, a, g', desc: 'Knoblauchwurst, Tomaten und Edamer' },
  { name: 'Sucuk Egg', allergens: '1, 2, 3, a, g', desc: 'Knoblauchwurst, gekochtes Ei, Tomaten und Edamer' },
  { name: 'Chicken Bacon', allergens: '1, 3, a, g', desc: 'Hähnchenbrust, Rinder-Bacon, Tomaten, karamellisierte Zwiebeln und Edamer' },
  { name: 'Chicken Bacon Egg', allergens: '1, 3, a, g', desc: 'Hähnchenbrust, gekochtes Ei, Rinder-Bacon, Tomaten, karamellisierte Zwiebeln und Edamer' },
  { name: 'Burger', allergens: 'a, g', desc: 'Burgerfleisch, Tomaten, karamellisierte Zwiebeln und Cheddar' },
  { name: 'Thunfisch', allergens: 'a, c, g', desc: 'Thunfisch, Tomaten und Edamer' },
  { name: 'Hot Dog', allergens: '1, 3, a, g, l', desc: 'Hot Dog Wurst, dänische Gurken, Röstzwiebeln, Ketchup und Edamer' },
  { name: 'Frikadelle', allergens: 'a, g, l', desc: 'Frikadelle, Tomaten, Ketchup und Edamer' },
  { name: 'Schinken', allergens: 'a, g, l', desc: 'Schinken, Tomaten und Edamer' },
  { name: 'Hawaii', allergens: '1, 3, a, g', desc: 'Schinken, Ananas und Edamer' },
  { name: 'Taco Beef', allergens: 'a, g', desc: 'Rinderhack, Tomaten, Ketchup, rote Zwiebeln und Edamer' },
  { name: 'Schafskäse', allergens: 'a, g', desc: 'Schafskäse, Gurken und Tomaten' },
  { name: 'Mozzarella', allergens: 'a, g', desc: 'Tomaten und Mozzarella' },
]

const WRAP = [
  { name: 'Crispy Chicken', price: '8,50 €', allergens: 'a, g', desc: 'Crispy Chicken, Jalapeños und Chesterkäse' },
  { name: 'Chicken Bacon', price: '8,50 €', allergens: '1, 3, a, g', desc: 'Hähnchenbrustfilet, Rinder-Bacon, Tomaten, karamellisierte Zwiebeln' },
  { name: 'Taco Beef', price: '8,50 €', allergens: 'a, g', desc: 'Taco Beef, Jalapeños, Chesterkäse, karamellisierte Zwiebeln, Tomaten' },
  { name: 'Thunfisch Kapern', price: '8,50 €', allergens: 'a, c, g', desc: 'Thunfisch, Kapern und rote Zwiebeln' },
  { name: 'Bacon Ei', price: '8,50 €', allergens: '1, 3, a, d, g', desc: 'Rinder-Bacon, Ei, Tomaten und karamellisierte Zwiebeln' },
  { name: 'Chicken Egg', price: '8,50 €', allergens: 'a, g', desc: 'Hähnchenbrustfilet, Ei, Tomaten' },
  { name: 'Spicy Chicken', price: '8,50 €', allergens: 'a, g', desc: 'Hähnchenbrustfilet, Jalapeños, Tomaten, karamellisierte Zwiebeln' },
  { name: 'Burger', price: '8,50 €', allergens: 'a, g', desc: 'Burgerfleisch, Tomaten, karamellisierte Zwiebeln und Edamer' },
  { name: 'Schafskäse', price: '8,50 €', allergens: '9, 13, a, g', desc: 'Schafskäse, Oliven, Tomaten, karamellisierte Zwiebeln' },
]

const FINGERFOOD = [
  { name: 'Chicken Wings', desc: '6 Stück', price: '6,50 €', allergens: 'a' },
  { name: 'Chicken Nuggets', desc: '6 Stück', price: '6,50 €', allergens: 'a, g' },
  { name: 'Chili Cheese Nuggets', desc: '6 Stück', price: '5,50 €', allergens: 'a, g' },
  { name: 'Potato Pops', desc: 'mit Taco Beef & Cheese', price: '7,50 €', allergens: 'a, g' },
  { name: 'Mozzarella Sticks', desc: '6 Stück', price: '5,50 €', allergens: 'a, g' },
  { name: 'Knoblauchbrot', desc: 'mit Sour Creme', price: '4,50 €', allergens: 'a, d, g, l' },
  { name: 'Pommes', desc: 'klassisch', price: '3,00 €', allergens: '' },
]

const SAUCEN = "Knoblauch (3,d,l) · Kräuter (1,3,d,l) · Chili (2,3,d,l) · Dänische (1,3,d,l) · Burgersauce (2,a,d,l) · Curry (2,3,d,l) · Ehso's Spicy-sauce (2,3,d,l) · BBQ · Trüffelmayo · Sour Creme (d,g,l) · Cheddar Cheese (g,l) · Ketchup · Mayo"

const CREPES = [
  { name: 'Crepe Natur', price: '4,90 €', allergens: 'a, d, g', desc: 'Ohne Belag' },
  { name: 'Zimt & Zucker', price: '5,50 €', allergens: 'a, d, g', desc: 'Mit Zimt und Zucker' },
  { name: 'Apfelmus', price: '5,50 €', allergens: 'a, d, g', desc: 'Mit Apfelmus' },
  { name: 'Nutella', price: '6,20 €', allergens: 'a, d, e, g, h', desc: 'Mit Nutella' },
  { name: 'Nutella, Zimt & Zucker', price: '6,20 €', allergens: 'a, d, e, g, h', desc: 'Mit Nutella, Zimt und Zucker' },
  { name: 'Nutella & Banana', price: '6,20 €', allergens: 'a, d, e, g, h', desc: 'Mit Nutella und frischer Banane' },
  { name: 'Kinder Schokolade', price: '6,20 €', allergens: 'a, d, e, g', desc: 'Mit Kinder-Schokolade' },
]

const FAMILY_BOXES = [
  {
    name: 'Box 1', price: '50,00 €', tag: 'Für die ganze Familie',
    contents: ['4× Burger nach Wahl (Classic, Cheese, Chili Cheese, Crispy Chicken)', '6er Chicken Nuggets', '2× Pommes frites', '6× Mozzarella Sticks', '1 Liter Softdrink nach Wahl'],
  },
  {
    name: 'Box 2', price: '35,00 €', tag: 'Zu zweit',
    contents: ['2× Burger nach Wahl (Classic, Cheese, Chili Cheese, Crispy Chicken)', '6er Chicken Wings', '2× Pommes frites', '1 Liter Softdrink nach Wahl'],
  },
  {
    name: 'Box 3', price: '58,00 €', tag: 'Das große Sortiment',
    contents: ['2× Burger nach Wahl (Classic, Cheese, Chili Cheese, Crispy Chicken)', '2× Croque Mini', '2× Wraps', '2× Crêpes', '1 Liter Softdrink nach Wahl'],
  },
]

const GETRAENKE = [
  { name: 'Cola', allergens: '2, 11', s: '3,50 €', l: '4,00 €' },
  { name: 'Cola Zero', allergens: '2, 4, 11', s: '3,50 €', l: '4,00 €' },
  { name: 'Fanta', allergens: '2, 3', s: '3,50 €', l: '4,00 €' },
  { name: 'Mezzo Mix', allergens: '2, 3, 11', s: '3,50 €', l: '4,00 €' },
  { name: 'Red Bull (0,25l)', allergens: '2, 11', s: '3,50 €', l: '—' },
  { name: 'Sprite', allergens: '', s: '3,50 €', l: '4,00 €' },
  { name: 'Vio Still (0,5l)', allergens: '', s: '2,50 €', l: '—' },
]

const TABS = [
  { id: 'burger',    label: 'Burger',      icon: '🍔' },
  { id: 'croque',    label: 'Croque',      icon: '🥪' },
  { id: 'wrap',      label: 'Wrap',        icon: '🌯' },
  { id: 'fingerfood',label: 'Finger Food', icon: '🍟' },
  { id: 'crepes',    label: 'Crêpes',      icon: '🧇' },
  { id: 'familybox', label: 'Family Box',  icon: '📦' },
  { id: 'getraenke', label: 'Getränke',    icon: '🥤' },
]

function ImgPlaceholder() {
  return (
    <div className="menu-card-placeholder" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 0 1 2-2h.93a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 10.07 4h3.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 18.07 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    </div>
  )
}

function MenuCard({ name, price, desc, allergens, badge, children }) {
  return (
    <article className="menu-card">
      <ImgPlaceholder />
      <div className="menu-card-body">
        {badge && <span className="menu-badge">{badge}</span>}
        <div className="menu-card-header">
          <h3>{name}</h3>
          {price && <span className="menu-card-price">{price}</span>}
        </div>
        {desc && <p className="menu-card-desc">{desc}</p>}
        {children}
        {allergens && <p className="menu-card-allergens">({allergens})</p>}
      </div>
    </article>
  )
}

const SEARCHABLE = { burger: BURGER, croque: CROQUE, wrap: WRAP, fingerfood: FINGERFOOD, crepes: CREPES }

const TAB_COUNTS = { burger: BURGER.length, croque: CROQUE.length, wrap: WRAP.length, fingerfood: FINGERFOOD.length, crepes: CREPES.length, familybox: FAMILY_BOXES.length, getraenke: GETRAENKE.length }

export default function Menu() {
  const [active, setActive] = useState('burger')
  const [query, setQuery] = useState('')
  const panelRef = useRef(null)

  // Reset search when switching tabs
  function switchTab(id) {
    setActive(id)
    setQuery('')
  }

  // Fade-in effect on panel when tab changes
  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    el.classList.remove('menu-panel--visible')
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => el.classList.add('menu-panel--visible'))
    })
    return () => cancelAnimationFrame(raf)
  }, [active])

  // Filter helper — only applies to searchable tabs
  const q = query.trim().toLowerCase()
  function filtered(items) {
    if (!q) return items
    return items.filter(item =>
      item.name.toLowerCase().includes(q) ||
      (item.desc && item.desc.toLowerCase().includes(q))
    )
  }

  const isSearchable = active in SEARCHABLE
  const noResults = isSearchable && q && filtered(SEARCHABLE[active]).length === 0

  return (
    <section className="section menu-section" id="menu">
      <div className="container">
        <p className="section-kicker" data-animate="fade-up">Unsere Speisekarte</p>
        <h2 className="section-title" data-animate="fade-up">Das Sortiment</h2>
        <p className="section-subtitle" data-animate="fade-up">
          Frisch zubereitet · Halal-zertifiziert · Alle Gerichte auch als Menü erhältlich
        </p>

        {/* Search bar */}
        <div className="menu-search-wrap" data-animate="fade-up">
          <svg className="menu-search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            className="menu-search-input"
            type="search"
            placeholder="Gericht suchen…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Gericht suchen"
          />
          {query && (
            <button className="menu-search-clear" onClick={() => setQuery('')} aria-label="Suche löschen">✕</button>
          )}
        </div>

        <div className="menu-tabs" role="tablist" data-animate="fade-up">
          {TABS.map(t => {
            const count = TAB_COUNTS[t.id] ?? null
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active === t.id}
                className={`menu-tab-btn${active === t.id ? ' active' : ''}`}
                onClick={() => switchTab(t.id)}
              >
                <span className="menu-tab-icon" aria-hidden="true">{t.icon}</span>
                {t.label}
                {count !== null && <span className="menu-tab-count">{count}</span>}
              </button>
            )
          })}
        </div>

        <div ref={panelRef} className="menu-panel menu-panel--visible">
          {noResults && (
            <div className="menu-no-results">
              <p>Kein Ergebnis für „{query}"</p>
              <button className="menu-no-results-reset" onClick={() => setQuery('')}>Suche zurücksetzen</button>
            </div>
          )}

          {active === 'burger' && !noResults && (
            <>
              <div className="menu-info-strip">
                <span>✅ Halal-zertifiziert</span>
                <span>🍟 Als Menü: + 6,00 € (inkl. Pommes &amp; 0,33l Softgetränk)</span>
              </div>
              <div className="menu-grid">
                {filtered(BURGER).map(item => <MenuCard key={item.name} {...item} />)}
              </div>
            </>
          )}

          {active === 'croque' && !noResults && (
            <>
              <div className="menu-info-strip">
                <span>🥗 Serviert mit Eisberg oder Krautsalat &amp; Sauce</span>
              </div>
              <div className="menu-croque-sizes">
                <span>Mini <em>ca. 18 cm · 8,00 €</em></span>
                <span>Normal <em>ca. 26 cm · 11,50 €</em></span>
                <span>Maxi <em>ca. 36 cm · 16,00 €</em></span>
              </div>
              <div className="menu-grid">
                {filtered(CROQUE).map(item => (
                  <MenuCard key={item.name} name={item.name} allergens={item.allergens} desc={item.desc}>
                    <div className="menu-croque-prices">
                      <span>8,00 €</span>
                      <span>11,50 €</span>
                      <span>16,00 €</span>
                    </div>
                  </MenuCard>
                ))}
              </div>
            </>
          )}

          {active === 'wrap' && !noResults && (
            <>
              <div className="menu-info-strip">
                <span>🥗 Serviert mit Eisberg und Sauce</span>
              </div>
              <div className="menu-grid">
                {filtered(WRAP).map(item => <MenuCard key={item.name} {...item} />)}
              </div>
            </>
          )}

          {active === 'fingerfood' && !noResults && (
            <>
              <div className="menu-grid menu-grid--wide">
                {filtered(FINGERFOOD).map(item => <MenuCard key={item.name} {...item} />)}
              </div>
              <div className="menu-sauces-block">
                <p className="menu-sauces-title">🫙 Saucen <span>je 1,50 €</span></p>
                <p className="menu-sauces-list">{SAUCEN}</p>
              </div>
            </>
          )}

          {active === 'crepes' && !noResults && (
            <div className="menu-grid menu-grid--wide">
              {filtered(CREPES).map(item => <MenuCard key={item.name} {...item} />)}
            </div>
          )}

          {active === 'familybox' && (
            <div className="menu-grid menu-grid--boxes">
              {FAMILY_BOXES.map(box => (
                <article className="menu-card menu-card--box" key={box.name}>
                  <ImgPlaceholder />
                  <div className="menu-card-body">
                    <span className="menu-badge">{box.tag}</span>
                    <div className="menu-card-header">
                      <h3>{box.name}</h3>
                      <span className="menu-card-price menu-card-price--lg">{box.price}</span>
                    </div>
                    <ul className="menu-box-contents">
                      {box.contents.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          )}

          {active === 'getraenke' && (
            <>
              <div className="menu-drinks-table">
                <div className="menu-drinks-header">
                  <span>Getränk</span>
                  <span>0,33 l</span>
                  <span>1,0 l</span>
                </div>
                {GETRAENKE.map(d => (
                  <div className="menu-drinks-row" key={d.name}>
                    <span className="menu-drinks-name">
                      {d.name}{d.allergens && <small> ({d.allergens})</small>}
                    </span>
                    <span>{d.s}</span>
                    <span>{d.l}</span>
                  </div>
                ))}
              </div>
              <p className="menu-note">Alle Preise inkl. Pfand.</p>
            </>
          )}
        </div>

        <details className="menu-allergen-legend" data-animate="fade-up">
          <summary>⚠️ Zusatzstoffe &amp; Allergene</summary>
          <div className="menu-allergen-content">
            <p><strong>Zusatzstoffe:</strong> 1) Konservierungsstoff · 2) Farbstoff · 3) Antioxidationsmittel · 4) Süßungsmittel · 9) geschwefelt · 11) koffeinhaltig · 13) geschwärzt</p>
            <p><strong>Allergene:</strong> a) Glutenhaltige Getreide · c) Fisch · d) Eier · e) Soja · g) Milch/Lactose · h) Schalenfrüchte · l) Senf · m) Sesamsamen</p>
          </div>
        </details>

        <div className="menu-cta" data-animate="fade-up">
          <p>🛵 Aktuelle Verfügbarkeit und Online-Bestellung direkt über Lieferando.</p>
          <a
            href="https://www.lieferando.de/speisekarte/ehsos-burger"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Jetzt bestellen
          </a>
        </div>
      </div>
    </section>
  )
}
