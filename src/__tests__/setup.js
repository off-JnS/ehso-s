import '@testing-library/jest-dom'

// Stub window.matchMedia (jsdom doesn't implement it)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Stub IntersectionObserver (jsdom doesn't implement it)
globalThis.IntersectionObserver = class IntersectionObserver {
  constructor(callback) { this._cb = callback }
  observe(el) { this._cb([{ isIntersecting: true, target: el }]) }
  unobserve() {}
  disconnect() {}
}

// Suppress GSAP "window" warnings in test environment
vi.mock('gsap', () => ({
  default: {
    set: vi.fn(),
    to: vi.fn(() => ({ play: vi.fn(), pause: vi.fn(), kill: vi.fn() })),
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
      set: vi.fn().mockReturnThis(),
      addLabel: vi.fn().mockReturnThis(),
      call: vi.fn().mockReturnThis(),
      pause: vi.fn(),
      play: vi.fn(),
      kill: vi.fn(),
    })),
  },
  gsap: {
    set: vi.fn(),
    to: vi.fn(() => ({ play: vi.fn(), pause: vi.fn(), kill: vi.fn() })),
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
      set: vi.fn().mockReturnThis(),
      addLabel: vi.fn().mockReturnThis(),
      call: vi.fn().mockReturnThis(),
      pause: vi.fn(),
      play: vi.fn(),
      kill: vi.fn(),
    })),
  },
}))
