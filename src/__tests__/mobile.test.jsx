/**
 * Mobile responsiveness tests
 * Simulates 375×667 (iPhone SE) and 320×568 (smallest phone) viewports
 * Covers: Navbar, Hero, About tiles, Menu overlay
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Configure window.matchMedia to simulate a given viewport width.
 * Returns a cleanup function that restores the default mock.
 */
function setViewportWidth(width) {
  window.matchMedia.mockImplementation(query => {
    // Parse simple (max-width: Xpx) and (min-width: Xpx) queries
    const maxMatch = query.match(/\(max-width:\s*(\d+)px\)/)
    const minMatch = query.match(/\(min-width:\s*(\d+)px\)/)
    let matches = false
    if (maxMatch) matches = width <= parseInt(maxMatch[1])
    if (minMatch) matches = width >= parseInt(minMatch[1])
    return {
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }
  })
}

// ─── Navbar tests ─────────────────────────────────────────────────────────────

import Navbar from '../components/Navbar'

describe('Navbar — mobile viewport (375px)', () => {
  beforeEach(() => setViewportWidth(375))

  it('renders the hamburger toggle button', () => {
    render(<Navbar onMobileMenuOpen={vi.fn()} />)
    const toggle = screen.getByRole('button', { name: /menü öffnen/i })
    expect(toggle).toBeInTheDocument()
  })

  it('hamburger button has aria-label for screen readers', () => {
    render(<Navbar onMobileMenuOpen={vi.fn()} />)
    const toggle = screen.getByLabelText(/menü öffnen/i)
    expect(toggle).toBeInTheDocument()
  })

  it('nav drawer is closed by default (no .open class)', () => {
    render(<Navbar onMobileMenuOpen={vi.fn()} />)
    const navLinks = document.getElementById('navLinks')
    expect(navLinks).not.toHaveClass('open')
  })

  it('clicking hamburger opens nav drawer', async () => {
    const user = userEvent.setup()
    render(<Navbar onMobileMenuOpen={vi.fn()} />)
    const toggle = screen.getByRole('button', { name: /menü öffnen/i })
    await user.click(toggle)
    const navLinks = document.getElementById('navLinks')
    expect(navLinks).toHaveClass('open')
  })

  it('clicking a nav link closes the drawer', async () => {
    const user = userEvent.setup()
    render(<Navbar onMobileMenuOpen={vi.fn()} />)
    // Open
    await user.click(screen.getByRole('button', { name: /menü öffnen/i }))
    // Close via link
    await user.click(screen.getByText('Standort'))
    const navLinks = document.getElementById('navLinks')
    expect(navLinks).not.toHaveClass('open')
  })

  it('clicking Speisekarte on mobile calls onMobileMenuOpen', async () => {
    const user = userEvent.setup()
    const openFn = vi.fn()
    render(<Navbar onMobileMenuOpen={openFn} />)
    // Open drawer first so link is accessible
    await user.click(screen.getByRole('button', { name: /menü öffnen/i }))
    await user.click(screen.getByText('Speisekarte'))
    expect(openFn).toHaveBeenCalledOnce()
  })

  it('logo is rendered and links to page root', () => {
    render(<Navbar onMobileMenuOpen={vi.fn()} />)
    const logo = screen.getByText(/EHSO'S/i).closest('a')
    expect(logo).toHaveAttribute('href', '#')
  })
})

describe('Navbar — desktop viewport (1024px)', () => {
  beforeEach(() => setViewportWidth(1024))

  it('renders all nav links', () => {
    render(<Navbar onMobileMenuOpen={vi.fn()} />)
    expect(screen.getByText('Über uns')).toBeInTheDocument()
    expect(screen.getByText('Speisekarte')).toBeInTheDocument()
    expect(screen.getByText('Standort')).toBeInTheDocument()
    expect(screen.getByText('Kontakt')).toBeInTheDocument()
  })

  it('clicking Speisekarte on desktop does NOT call onMobileMenuOpen', async () => {
    const user = userEvent.setup()
    const openFn = vi.fn()
    render(<Navbar onMobileMenuOpen={openFn} />)
    await user.click(screen.getByText('Speisekarte'))
    // Should NOT be called on desktop
    expect(openFn).not.toHaveBeenCalled()
  })
})

// ─── Hero tests ────────────────────────────────────────────────────────────────

import Hero from '../components/Hero'

describe('Hero — mobile viewport (375px)', () => {
  beforeEach(() => setViewportWidth(375))

  it('renders the main heading', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders tagline text', () => {
    render(<Hero />)
    expect(screen.getByText(/Takeaway/i)).toBeInTheDocument()
  })

  it('renders the Lieferando CTA button with correct href', () => {
    render(<Hero />)
    const cta = screen.getByRole('link', { name: /lieferando bestellen/i })
    expect(cta).toHaveAttribute('href', 'https://www.lieferando.de/speisekarte/ehsos-burger')
    expect(cta).toHaveAttribute('target', '_blank')
    expect(cta).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders the Speisekarte link pointing to #menu', () => {
    render(<Hero />)
    const menuLink = screen.getByRole('link', { name: /speisekarte/i })
    expect(menuLink).toHaveAttribute('href', '#menu')
  })

  it('hero-buttons container is rendered', () => {
    render(<Hero />)
    const buttons = document.querySelector('.hero-buttons')
    expect(buttons).toBeInTheDocument()
  })

  it('does not apply inline transform on hero-content (parallax disabled on mobile)', () => {
    render(<Hero />)
    // On mobile, useParallax should skip — hero-content should have no inline transform
    const heroContent = document.querySelector('.hero-content')
    expect(heroContent).toBeInTheDocument()
    // Allow the transform to be empty string or unset — not a pixel offset
    const transform = heroContent?.style.transform ?? ''
    expect(transform).toBe('')
  })
})

// ─── About tiles tests ────────────────────────────────────────────────────────

import About from '../components/About'

describe('About — mobile viewport (375px)', () => {
  beforeEach(() => setViewportWidth(375))

  it('renders the "Über uns" section heading', () => {
    render(<About />)
    expect(screen.getByRole('heading', { name: /über uns/i })).toBeInTheDocument()
  })

  it('renders all three feature tiles', () => {
    render(<About />)
    // Each tile has a title — check all three
    expect(screen.getByText('Frische Zutaten')).toBeInTheDocument()
    expect(screen.getByText('Delivery')).toBeInTheDocument()
    expect(screen.getByText('Takeaway')).toBeInTheDocument()
  })

  it('each tile has an icon, title, and description', () => {
    render(<About />)
    const tiles = document.querySelectorAll('.about-tile')
    expect(tiles.length).toBe(3)
    tiles.forEach(tile => {
      expect(tile.querySelector('.about-tile-icon')).toBeInTheDocument()
      // text wrapper should exist and contain title + desc
      expect(tile.querySelector('.about-tile-text')).toBeInTheDocument()
      expect(tile.querySelector('.about-tile-title')).toBeInTheDocument()
      expect(tile.querySelector('.about-tile-desc')).toBeInTheDocument()
    })
  })

  it('CardSwap is NOT rendered on mobile (isDesktop=false)', () => {
    // matchMedia returns false for (min-width: 768px) at 375px
    render(<About />)
    // card-swap-wrap should not be in the DOM
    expect(document.querySelector('.card-swap-wrap')).not.toBeInTheDocument()
  })

  it('about-tiles section is rendered on mobile', () => {
    render(<About />)
    expect(document.querySelector('.about-tiles')).toBeInTheDocument()
  })

  it('renders the about GIF/image', () => {
    render(<About />)
    const img = document.querySelector('.about-gif')
    expect(img).toBeInTheDocument()
    expect(img.tagName).toBe('IMG')
    expect(img).toHaveAttribute('loading', 'lazy')
  })
})

describe('About — desktop viewport (1280px)', () => {
  beforeEach(() => setViewportWidth(1280))

  it('CardSwap IS rendered on desktop (isDesktop=true)', () => {
    render(<About />)
    expect(document.querySelector('.card-swap-wrap')).toBeInTheDocument()
  })
})

// ─── App / Menu overlay tests ─────────────────────────────────────────────────

import App from '../App'

describe('App mobile menu overlay (375px)', () => {
  beforeEach(() => setViewportWidth(375))

  it('menu overlay is not open on initial render', () => {
    render(<App />)
    const wrap = document.querySelector('.menu-page-wrap')
    expect(wrap).not.toHaveClass('open')
  })

  it('back button is rendered inside the overlay', () => {
    render(<App />)
    const backBtn = screen.getByRole('button', { name: /zurück/i })
    expect(backBtn).toBeInTheDocument()
  })

  it('clicking back button closes the overlay', async () => {
    const user = userEvent.setup()
    render(<App />)
    // Open drawer via hamburger
    const toggle = screen.getByRole('button', { name: /menü öffnen/i })
    await user.click(toggle)
    // Click the Speisekarte link inside the nav-links drawer specifically
    const navLinks = document.getElementById('navLinks')
    const menuLink = navLinks.querySelector('a[href="#menu"]')
    await user.click(menuLink)
    // Now close via back
    const backBtn = screen.getByRole('button', { name: /zurück/i })
    await user.click(backBtn)
    expect(document.querySelector('.menu-page-wrap')).not.toHaveClass('open')
  })
})
