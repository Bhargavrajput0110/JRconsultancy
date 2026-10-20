import { forwardRef } from 'react'
import { Link } from 'react-router-dom'

interface FooterProps {
  className?: string
}

const Footer = forwardRef<HTMLElement, FooterProps>(({ className = '' }, ref) => {
  return (
    <footer ref={ref} className={`site-footer ${className}`} id="contact">
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-brand">
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.2rem' }}>
            <div style={{
              height: '46px',
              width: '46px',
              background: '#ffffff',
              borderRadius: '12px',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1.5px solid rgba(196, 154, 108, 0.45)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
              overflow: 'hidden',
              flexShrink: 0
            }}>
              <img src="/jr-logo.jpg" alt="JR Consulting Logo" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', margin: 0, color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>JR Consulting</h2>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-accent)', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>Restaurant Set-up & Operations</p>
            </div>
          </Link>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '320px', lineHeight: 1.6, textTransform: 'none', marginBottom: '2rem', fontSize: '0.92rem' }}>
            From vision to first service. Expert restaurant consulting bridging civil engineering and high-pressure kitchen operations.
          </p>
          <div className="footer-socials">
            <a href="https://wa.me/919909558212" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="mailto:jigarrajgor@hotmail.com" className="footer-social-btn" aria-label="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </a>
          </div>
        </div>

        {/* Contact Details */}
        <div className="footer-col">
          <h3>Contact Info</h3>
          <ul>
            <li><strong>Jigar Rajgor</strong></li>
            <li><a href="tel:+919909558212" style={{ color: 'inherit', textDecoration: 'none' }}>+91 99095 58212</a></li>
            <li><a href="mailto:jigarrajgor@hotmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>jigarrajgor@hotmail.com</a></li>
            <li style={{ marginTop: '1rem', color: 'var(--color-text-muted)' }}>
              Headquartered in Vadodara, Gujarat.<br/>Undertaking Turnkey Projects Pan-India.
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3>Navigation</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">Vision & Founder</Link></li>
            <li><Link to="/services">Consulting Services</Link></li>
            <li><Link to="/process">How We Work</Link></li>
            <li><Link to="/portfolio">Client Transformations</Link></li>
            <li><Link to="/faq">Frequently Asked Questions</Link></li>
            <li><Link to="/start" style={{ color: 'var(--color-accent)' }}>Start a Project &rarr;</Link></li>
          </ul>
        </div>

        {/* Locations Column for SEO */}
        <div className="footer-col">
          <h3>Locations Served</h3>
          <ul>
            <li><Link to="/locations/ahmedabad">Ahmedabad, Gujarat</Link></li>
            <li><Link to="/locations/surat">Surat, Gujarat</Link></li>
            <li><Link to="/locations/vadodara">Vadodara, Gujarat</Link></li>
            <li><Link to="/locations/rajkot">Rajkot, Gujarat</Link></li>
            <li><Link to="/locations/mumbai">Mumbai, Maharashtra</Link></li>
            <li><Link to="/locations/pune">Pune, Maharashtra</Link></li>
            <li><Link to="/locations/delhi-ncr">Delhi NCR & Pan-India</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} JR Consulting. All rights reserved.</p>
        <p>Built for the real world — Civil Engineering & Restaurant Operations.</p>
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'

export default Footer
