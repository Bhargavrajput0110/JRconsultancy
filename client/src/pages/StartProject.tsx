import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SmoothScroll from '../components/SmoothScroll'
import '../index.css'

export default function StartProject() {
  
  const springUp: any = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
  }

  return (
    <SmoothScroll>
      {/* Simple Nav for subpage */}
      <nav className="nav-ios" style={{ position: 'absolute' }}>
        <div className="nav-ios-container" style={{ width: '100%', maxWidth: '1200px', justifyContent: 'space-between' }}>
          <Link to="/" className="nav-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img src="/jr-logo.jpg" alt="JR Consulting Logo" style={{ height: '64px', width: 'auto', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }} />
          </Link>
          <div className="nav-ios-links">
            <Link to="/" style={{ color: 'var(--color-text)' }}>&larr; Back to Home</Link>
          </div>
        </div>
      </nav>

      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(6rem, 10vw, 8rem) clamp(1rem, 4vw, 2rem) 4rem clamp(1rem, 4vw, 2rem)' }}>
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <motion.div initial="hidden" animate="visible" variants={springUp}>
            <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', fontFamily: 'Georgia, serif', fontStyle: 'italic', marginBottom: '1rem', color: 'var(--color-text)', lineHeight: 1.15 }}>
              Start your project.
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              Tell us about your restaurant vision. Whether it's a new build, a turnaround, or operational optimization, we're here to help you build it for the real world.
            </p>
          </motion.div>

          <motion.form 
            initial="hidden" animate="visible" variants={springUp} transition={{ delay: 0.2 }}
            style={{ 
              background: 'rgba(253, 251, 247, 0.05)', 
              backdropFilter: 'blur(15px)', 
              border: '1px solid rgba(196, 154, 108, 0.3)', 
              borderRadius: '28px', 
              padding: 'clamp(1.5rem, 5vw, 4rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</label>
                <input type="text" placeholder="John Doe" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</label>
                <input type="email" placeholder="john@example.com" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Project Type</label>
              <select style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none' }}>
                <option value="new" style={{ color: '#1c3c27' }}>New Restaurant Build</option>
                <option value="renovation" style={{ color: '#1c3c27' }}>Kitchen Renovation</option>
                <option value="turnaround" style={{ color: '#1c3c27' }}>Operational Turnaround / Efficiency</option>
                <option value="other" style={{ color: '#1c3c27' }}>Other Consulting</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Project Details</label>
              <textarea rows={5} placeholder="Tell us about your menu, location, and goals..." style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none', resize: 'vertical' }}></textarea>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
              Submit Inquiry
            </button>
          </motion.form>
        </div>
      </section>
    </SmoothScroll>
  )
}
