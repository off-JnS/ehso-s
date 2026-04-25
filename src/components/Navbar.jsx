import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import StaggeredMenu from './StaggeredMenu'

const MOBILE_ITEMS = [
  { label: 'Über uns',    ariaLabel: 'Über uns',            link: '/#about' },
  { label: 'Speisekarte', ariaLabel: 'Speisekarte',          link: '/speisekarte' },
  { label: 'Standort',    ariaLabel: 'Standort & Kontakt',   link: '#location' },
  { label: 'Bestellen',   ariaLabel: 'Jetzt bestellen',      link: 'https://www.lieferando.de/speisekarte/ehsos-burger' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <div className="container nav-container">
          <Link to="/" className="logo" onClick={close}>EHSO'S<span>BURGER</span></Link>

          {/* Desktop nav — hidden on mobile via CSS */}
          <button
            className={`nav-toggle${open ? ' active' : ''}`}
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>

          <ul className={`nav-links${open ? ' open' : ''}`} id="navLinks">
            <li><a href="/#about" onClick={close}>Über uns</a></li>
            <li><Link to="/speisekarte" onClick={close}>Speisekarte</Link></li>
            <li><a href="#location" onClick={close}>Standort & Kontakt</a></li>
            <li>
              <a
                href="https://www.lieferando.de/speisekarte/ehsos-burger"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
                onClick={close}
              >
                Jetzt bestellen
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile full-screen staggered menu — hidden on desktop via CSS */}
      <StaggeredMenu
        isFixed
        position="right"
        items={MOBILE_ITEMS}
        socialItems={[]}
        displaySocials={false}
        displayItemNumbering={false}
        menuButtonColor="#fff"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={false}
        colors={['#1a1a1a', '#111111']}
        logoUrl=""
        accentColor="#f97316"
        closeOnClickAway
        className="sm-mobile-menu"
      />

      {/* Desktop overlay for old mobile drawer (no-op on mobile) */}
      <div
        className={`nav-overlay${open ? ' active' : ''}`}
        id="navOverlay"
        onClick={close}
      />
    </>
  )
}
