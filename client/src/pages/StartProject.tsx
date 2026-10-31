import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SmoothScroll from '../components/SmoothScroll'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../index.css'

const CONSULTING_SERVICES = [
  {
    id: 'turnkey',
    label: 'Turnkey Restaurant Setup & Launch',
    desc: 'Bare-shell civil planning, brand buildout, and launch execution'
  },
  {
    id: 'kitchen-mep',
    label: 'Commercial Kitchen Layout & MEP Engineering',
    desc: 'HVAC exhaust hoods, gas banks, electrical & plumbing schematics'
  },
  {
    id: 'operational-audit',
    label: 'Operational Audit & Efficiency Turnaround',
    desc: 'Kitchen SOPs, waste leakage control & turnaround strategies'
  },
  {
    id: 'fssai',
    label: 'FSSAI & Statutory Compliance Advisory',
    desc: 'FSSAI licensing, hygiene audits & fire/health approvals'
  },
  {
    id: 'advisory',
    label: 'General Restaurant Advisory',
    desc: 'Concept feasibility, CAPEX budgeting & location advisory'
  }
];

export default function StartProject() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    details: ''
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Turnkey Restaurant Setup & Launch'
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState('');

  const toggleService = (label: string) => {
    setSelectedServices(prev => {
      if (prev.includes(label)) {
        if (prev.length === 1) return prev; // Keep at least one selected
        return prev.filter(s => s !== label);
      } else {
        return [...prev, label];
      }
    });
  };

  const springUp: any = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServices.length === 0) {
      alert('Please select at least one consulting service.');
      return;
    }

    setIsSubmitting(true);
    setSubmitted(true);

    const servicesText = selectedServices.join(' + ');

    const newLead = {
      name: formData.name,
      company: formData.location ? `Restaurant (${formData.location})` : 'Restaurant Inquiry',
      project: `${servicesText}${formData.location ? ` • ${formData.location}` : ''}`,
      contact: formData.phone,
      email: formData.email,
      status: 'Website Lead',
      value: 'Discovery Scope',
      notes: `Services:\n${selectedServices.map(s => `• ${s}`).join('\n')}\n\nDetails:\n${formData.details || 'None provided'}`,
      date: new Date().toISOString().split('T')[0]
    };

    // 1. Save to local browser storage backup
    try {
      const existing = JSON.parse(localStorage.getItem('jr_crm_clients') || '[]');
      localStorage.setItem('jr_crm_clients', JSON.stringify([newLead, ...existing]));
    } catch {
      // ignore
    }

    // 2. Post to central CRM backend
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          location: formData.location,
          services: selectedServices,
          details: formData.details
        })
      });
    } catch (err) {
      console.warn('API sync fallback to localStorage:', err);
    } finally {
      setIsSubmitting(false);
    }

    // 3. Format WhatsApp direct chat message
    const servicesListFormatted = selectedServices.map(s => `• ${s}`).join('%0A');
    const message = `*New Project Inquiry — JR Consulting*%0A%0A` +
      `*Name:* ${encodeURIComponent(formData.name)}%0A` +
      `*Phone:* ${encodeURIComponent(formData.phone)}%0A` +
      `*Email:* ${encodeURIComponent(formData.email || 'Not provided')}%0A` +
      `*City / Location:* ${encodeURIComponent(formData.location || 'Not specified')}%0A%0A` +
      `*Services Needed (${selectedServices.length}):*%0A${servicesListFormatted}%0A%0A` +
      `*Details:* ${encodeURIComponent(formData.details || 'None provided')}`;

    const whatsappUrl = `https://wa.me/919909558212?text=${message}`;
    setLastWhatsappUrl(whatsappUrl);
    window.open(whatsappUrl, '_blank');
  };

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
              href="mailto:contact@jrconsulting.in"
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
              contact@jrconsulting.in
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

            {/* Multiple Choice Consulting Services Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <label style={{ color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Consulting Services Needed *
                </label>
                <span style={{ fontSize: '0.76rem', color: '#8e9f95' }}>
                  Select all that apply ({selectedServices.length} selected)
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: '0.75rem'
              }}>
                {CONSULTING_SERVICES.map((service) => {
                  const isSelected = selectedServices.includes(service.label);
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.label)}
                      style={{
                        background: isSelected 
                          ? 'rgba(196, 154, 108, 0.14)' 
                          : 'rgba(255, 255, 255, 0.03)',
                        border: isSelected 
                          ? '1.5px solid var(--color-accent, #c49a6c)' 
                          : '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '14px',
                        padding: '0.9rem 1.1rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: isSelected 
                          ? '0 4px 18px rgba(196, 154, 108, 0.15)' 
                          : 'none'
                      }}
                    >
                      {/* Checkbox Icon */}
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '6px',
                        border: isSelected ? 'none' : '1.5px solid rgba(255, 255, 255, 0.25)',
                        background: isSelected ? 'var(--color-accent, #c49a6c)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px',
                        transition: 'all 0.2s ease'
                      }}>
                        {isSelected && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#050806" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{
                          color: isSelected ? '#fff' : '#d1dfd6',
                          fontWeight: isSelected ? 600 : 500,
                          fontSize: '0.92rem',
                          lineHeight: 1.3,
                          marginBottom: '3px'
                        }}>
                          {service.label}
                        </div>
                        <div style={{
                          fontSize: '0.76rem',
                          color: isSelected ? 'rgba(196, 154, 108, 0.95)' : '#7b8f84',
                          lineHeight: 1.3
                        }}>
                          {service.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
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

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-primary" 
              style={{ marginTop: '0.5rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', padding: '1.1rem' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              {isSubmitting ? 'Saving Inquiry...' : 'Send Inquiry & Connect on WhatsApp'}
            </button>

            {submitted && (
              <div style={{
                background: 'rgba(20, 45, 30, 0.85)',
                border: '1px solid rgba(196, 154, 108, 0.45)',
                borderRadius: '16px',
                padding: '1.25rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent, #c49a6c)', fontWeight: 600, fontSize: '0.95rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Inquiry Logged & Connecting to WhatsApp...
                </div>
                <p style={{ margin: 0, fontSize: '0.84rem', color: '#a3b8ad', lineHeight: 1.4, maxWidth: '520px' }}>
                  Your restaurant project inquiry has been securely registered in the JR Consulting CRM. If WhatsApp did not open automatically, click below to start chatting with Jigar Rajgor:
                </p>
                {lastWhatsappUrl && (
                  <a
                    href={lastWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: '#25D366',
                      color: '#050806',
                      padding: '10px 22px',
                      borderRadius: '24px',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginTop: '4px'
                    }}
                  >
                    Open WhatsApp Chat Now →
                  </a>
                )}
              </div>
            )}
          </motion.form>
        </div>
      </section>
      <Footer />
    </SmoothScroll>
  )
}

