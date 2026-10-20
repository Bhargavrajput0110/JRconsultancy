import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SmoothScroll from '../components/SmoothScroll'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../index.css'

export default function StartProject() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    projectType: 'New Restaurant Build (Turnkey)',
    details: ''
  })

  const [submitted, setSubmitted] = useState(false)
  
  const springUp: any = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    const message = `*New Project Inquiry — JR Consulting*%0A%0A` +
      `*Name:* ${encodeURIComponent(formData.name)}%0A` +
      `*Phone:* ${encodeURIComponent(formData.phone)}%0A` +
      `*Email:* ${encodeURIComponent(formData.email)}%0A` +
      `*City / Location:* ${encodeURIComponent(formData.location || 'Not specified')}%0A` +
      `*Project Type:* ${encodeURIComponent(formData.projectType)}%0A` +
      `*Details:* ${encodeURIComponent(formData.details || 'None provided')}`

    const whatsappUrl = `https://wa.me/919909558212?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <SmoothScroll>
      <Helmet>
        <title>Start Your Restaurant Project | JR Consulting</title>
        <meta name="description" content="Inquire about restaurant setup, commercial kitchen planning, MEP engineering, or operational turnaround with Jigar Rajgor." />
        <link rel="canonical" href="https://jrconsultancy.in/start" />
      </Helmet>

      <Header />

      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(8rem, 12vw, 10rem) clamp(1rem, 4vw, 2rem) 5rem' }}>
        <div style={{ maxWidth: '850px', width: '100%' }}>
          {/* Breadcrumb Navigation */}
          <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</Link>
              <span>/</span>
              <span style={{ color: 'var(--color-accent)' }}>Start Project</span>
            </div>
          </div>

          <motion.div initial="hidden" animate="visible" variants={springUp} style={{ textAlign: 'center' }}>
            <p className="bento-tag" style={{ display: 'inline-block', marginBottom: '1rem' }}>Project Discovery</p>
            <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', fontFamily: 'var(--font-heading)', marginBottom: '1rem', color: 'var(--color-text)', lineHeight: 1.15 }}>
              Start Your Restaurant Project.
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', marginBottom: '2.5rem', lineHeight: 1.6, maxWidth: '680px', margin: '0 auto 2.5rem' }}>
              Tell us about your restaurant vision. Whether it is a bare-shell new build, kitchen MEP engineering, or operational turnaround, we build for high-pressure real-world success.
            </p>
          </motion.div>

          {/* Quick Contact Bar */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1.5rem', 
            flexWrap: 'wrap', 
            marginBottom: '2.5rem' 
          }}>
            <a 
              href="tel:+919909558212"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.8rem 1.6rem',
                borderRadius: '30px',
                background: 'rgba(196, 154, 108, 0.12)',
                border: '1px solid rgba(196, 154, 108, 0.35)',
                color: 'var(--color-accent)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.95rem'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6.29 6.29l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Direct Call: +91 99095 58212
            </a>
            <a 
              href="mailto:jrajgor@jrconsulting.in"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.8rem 1.6rem',
                borderRadius: '30px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'var(--color-text)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.95rem'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              jrajgor@jrconsulting.in
            </a>
          </div>

          <motion.form 
            onSubmit={handleSubmit}
            initial="hidden" animate="visible" variants={springUp} transition={{ delay: 0.2 }}
            style={{ 
              background: 'var(--ios-card-bg)', 
              backdropFilter: 'blur(20px)', 
              border: '1px solid rgba(196, 154, 108, 0.3)', 
              borderRadius: '28px', 
              padding: 'clamp(1.5rem, 5vw, 3.5rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rahul Mehta" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', padding: '1rem', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none' }} 
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Phone / WhatsApp *</label>
                <input 
                  type="tel" 
                  required
                  placeholder="+91 98765 43210" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', padding: '1rem', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none' }} 
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@restaurant.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', padding: '1rem', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none' }} 
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Project City / Location</label>
                <input 
                  type="text" 
                  placeholder="e.g. Vadodara, Mumbai, Delhi NCR" 
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', padding: '1rem', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none' }} 
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Consulting Service Needed</label>
              <select 
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', padding: '1rem', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none' }}
              >
                <option value="New Restaurant Build (Turnkey)" style={{ color: '#090e0a' }}>Turnkey Restaurant Setup & Launch</option>
                <option value="Kitchen Design & MEP Planning" style={{ color: '#090e0a' }}>Commercial Kitchen Layout & MEP Engineering</option>
                <option value="Operational Audit & Turnaround" style={{ color: '#090e0a' }}>Operational Audit & Efficiency Turnaround</option>
                <option value="FSSAI & Compliance Advisory" style={{ color: '#090e0a' }}>FSSAI & Statutory Compliance Advisory</option>
                <option value="General Consultation" style={{ color: '#090e0a' }}>General Restaurant Advisory</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Project Details & Space Dimensions</label>
              <textarea 
                rows={4} 
                placeholder="Tell us about your restaurant concept, approximate sq. ft., cuisine type, and target goals..." 
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', padding: '1rem', borderRadius: '12px', color: '#fff', fontSize: '1rem', outline: 'none', resize: 'vertical' }}
              ></textarea>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', padding: '1.1rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              Send Inquiry & Connect on WhatsApp
            </button>
            {submitted && (
              <p style={{ textAlign: 'center', color: 'var(--color-accent)', fontSize: '0.9rem', margin: 0 }}>
                Connecting you directly with Jigar Rajgor on WhatsApp...
              </p>
            )}
          </motion.form>
        </div>
      </section>
      <Footer />
    </SmoothScroll>
  )
}

