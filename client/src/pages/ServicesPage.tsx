import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Compass, 
  TrendingUp, 
  FileText, 
  CheckCircle2, 
  Gift, 
  ArrowRight 
} from 'lucide-react'
import SmoothScroll from '../components/SmoothScroll'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SpotlightCard from '../components/SpotlightCard'
import '../index.css'

export default function ServicesPage() {
  const footerRef = useRef<HTMLElement>(null)
  const isFooterInView = useInView(footerRef, { margin: "0px 0px -100px 0px" })

  const springUp: any = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
  }

  const services = [
    {
      num: '01',
      title: 'Site Selection & Civil Feasibility',
      subtitle: 'Set the structural foundation before committing capital.',
      desc: 'Signing a commercial lease without a civil engineering review often leads to surprise expenses in drainage rework, structural reinforcements, or failed fire approvals. We inspect spaces before you sign.',
      deliverables: [
        'Physical site walkthrough & structural load-bearing audit',
        'Floor gradient & underground municipal drainage connectivity inspection',
        'HVAC duct shaft routing & ceiling clearance verification',
        '3-Phase electrical grid capacity & transformer load analysis',
        'Vastu principles alignment for commercial flow and entrance orientation',
        'Granular CAPEX forecasting to avoid unexpected structural overruns'
      ]
    },
    {
      num: '02',
      title: 'Commercial Kitchen Layout & MEP Engineering',
      subtitle: 'Ergonomic station flow and mechanical precision.',
      desc: 'We engineer commercial kitchens where chefs take 3 steps instead of 10 to plate an order. Every centimeter of stainless steel fabrication, hood CFM, and water inlet is calculated to eliminate bottlenecks.',
      deliverables: [
        'Station-by-station 2D CAD architectural kitchen layouts',
        'Mechanical Exhaust Hood CFM calculations and fresh air air-balancing',
        'Industrial grease interceptor sizing and underground pipe fall gradients',
        'Stainless steel equipment BOQ (Bill of Quantities) with technical specs',
        'Factory tender floatation saving 15–25% on direct equipment procurement',
        'FSSAI Schedule 4 sanitary zoning with segregated food prep pathways'
      ]
    },
    {
      num: '03',
      title: 'People, SOPs & Operational Systems',
      subtitle: 'The systems that allow the floor to run on autopilot.',
      desc: 'A beautiful kitchen is only as good as the team and standard operating procedures running it. We design documentation and training manuals that keep food quality, speed, and safety consistent across every shift.',
      deliverables: [
        'FOH hospitality protocols and upselling training programs',
        'BOH station mise-en-place checklists and line prep guides',
        'Food and other cost analysis advisory, portion control, and wastage audits',
        'Complete FSSAI compliance binder setup and food hygiene audit logs',
        'POS software configuration, KDS workflow, and inventory management',
        'Core kitchen leadership recruitment and trial tasting evaluations'
      ]
    },
    {
      num: '04',
      title: 'Launch Management & Performance Turnarounds',
      subtitle: 'Opening day is only the beginning of profitability.',
      desc: 'Whether you are launching a flagship venue or turning around a struggling restaurant, we stress-test operations under real pressure and optimize speed, table turns, and food cost margins.',
      deliverables: [
        'Dry run execution and invited-guest soft launch stress tests',
        'Opening week on-site operational supervision and expediting control',
        'Table turnover speed analysis to maximize peak hour seat yield',
        'Food cost and ingredient supplier renegotiation audits',
        'Customer feedback review and rapid menu fine-tuning',
        'Ongoing monthly operational advisory and hygiene checks'
      ]
    },
    {
      num: '05',
      title: 'Add on insight: Strategic Civil & MEP Audits',
      subtitle: 'Value-driven technical feasibility and statutory engineering.',
      desc: 'Essential structural and operational audits that safeguard your investment. We perform rigorous pre-lease inspections, ventilation calculations, and sanitary zoning blueprints.',
      deliverables: [
        'Pre-lease civil walkthrough, structural slab load-bearing & drainage audit',
        'Exhaust hood CFM velocity & fresh air intake balancing calculations',
        'Direct vendor tender benchmark & SS 304 equipment BOQ specification audits',
        'FSSAI Schedule 4 sanitary zoning blueprint with segregated prep zones',
        'Station workload simulation & ergonomic bottleneck analysis',
        'Grease trap sizing & municipal drainage fall gradient compliance'
      ]
    }
  ]

  const complimentaryInsights = [
    {
      icon: <Compass size={22} color="var(--color-accent, #c49a6c)" />,
      badge: 'Site Due Diligence',
      title: 'Pre-Lease Civil & MEP Load Audit',
      pairedWith: 'Pillar 01: Site Selection & Planning',
      desc: 'Before executing any commercial agreement, we inspect the physical space: floor slab load capacity, ceiling clearance for exhaust ducts, 3-phase power supply, and municipal sewer pipe fall angles.',
      impact: 'Prevents ₹1.5L–₹3L in unexpected landlord repair, core-cutting, and structural rework.'
    },
    {
      icon: <Zap size={22} color="var(--color-accent, #c49a6c)" />,
      badge: 'Energy Optimization',
      title: 'Exhaust Hood CFM & Air-Balancing Model',
      pairedWith: 'Pillar 02: Kitchen MEP Engineering',
      desc: 'Scientific mathematical modeling of exhaust hood capture velocity and makeup fresh air intake ratios. Eliminates hot air pockets, smoke rollback, and kitchen smell transfer to dining areas.',
      impact: 'Saves 15%–22% on ongoing commercial kitchen electricity & HVAC cooling utility bills.'
    },
    {
      icon: <TrendingUp size={22} color="var(--color-accent, #c49a6c)" />,
      badge: 'CAPEX Protection',
      title: 'Direct Vendor Tender & Price Benchmark',
      pairedWith: 'Pillar 02: Procurement & Fabrications',
      desc: 'Independent validation of equipment BOQ specifications. We audit true stainless steel gauges (SS 304 vs SS 202) and float tenders directly to top fabricators to bypass agent commissions.',
      impact: 'Reduces total kitchen stainless steel and heavy equipment CAPEX by 15%–25%.'
    },
    {
      icon: <ShieldCheck size={22} color="var(--color-accent, #c49a6c)" />,
      badge: 'Statutory Health',
      title: 'FSSAI Schedule 4 Sanitary Zoning Blueprint',
      pairedWith: 'Pillar 02 & 03: Kitchen Layout & SOPs',
      desc: 'Strict demarcation of dirty receiving, wet prep, hot line, and plating zones. Complete with grease interceptor sizing and wash station locations to satisfy municipal health inspector guidelines.',
      impact: 'Designed to satisfy municipal health guidelines and licensing inspections without costly rework notices.'
    },
    {
      icon: <FileText size={22} color="var(--color-accent, #c49a6c)" />,
      badge: 'Operational Speed',
      title: 'Station Workload & Bottleneck Analysis',
      pairedWith: 'Pillar 03: People & Operational Systems',
      desc: 'Ergonomic line simulation analyzing chef steps, hot line reach radiuses, and ticket congestion points during 80+ cover peaks. Re-organizes mise-en-place wells for sub-8 minute plating times.',
      impact: 'Increases peak-hour seat turnaround yield by 20%–30% with fewer staff fatigue errors.'
    },
    {
      icon: <Gift size={22} color="var(--color-accent, #c49a6c)" />,
      badge: 'Launch Strategy',
      title: 'Pre-Opening Dry Run & Stress-Test Playbook',
      pairedWith: 'Pillar 04: Launch & Support',
      desc: 'A comprehensive mock service framework simulating simultaneous ticket rushes, KDS-to-FOH communication, and emergency POS overrides before paying patrons ever enter.',
      impact: 'Prevents opening-week chaos, prolonged table wait times, and damaging early reviews.'
    }
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Restaurant Setup & Commercial Kitchen Consulting",
    "provider": {
      "@type": "Organization",
      "name": "JR Consulting",
      "url": "https://www.jrconsulting.in"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "description": "End-to-end commercial kitchen design, MEP engineering, equipment procurement, staff training, and operational turnaround consulting."
  }

  return (
    <SmoothScroll>
      <Helmet>
        <title>Commercial Kitchen Design & Restaurant Setup Services | JR Consulting</title>
        <meta name="description" content="Explore JR Consulting's end-to-end services: Site civil feasibility, commercial kitchen CAD layouts, MEP engineering, equipment procurement & FSSAI setup." />
        <link rel="canonical" href="https://www.jrconsulting.in/services" />
        <meta property="og:title" content="Restaurant Setup & Commercial Kitchen Services | JR Consulting" />
        <meta property="og:description" content="Civil engineering backed restaurant setup services. Kitchen design, MEP drawings, equipment procurement, and operational turnaround." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header isFooterInView={isFooterInView} />

      <section style={{ paddingTop: 'clamp(9rem, 14vw, 12rem)', paddingBottom: '4rem', paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)', maxWidth: '1300px', margin: '0 auto' }}>
        <motion.div initial="hidden" animate="visible" variants={springUp} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem' }}>
            <Link to="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>Home</Link>
            <span style={{ color: 'var(--color-accent)', fontSize: '0.85rem' }}>/</span>
            <span style={{ color: 'var(--color-accent)', fontSize: '0.85rem', fontWeight: 600 }}>Services</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontFamily: 'var(--font-heading)', lineHeight: 1.15, marginBottom: '1.5rem', color: 'var(--color-text)' }}>
            End-to-End Consulting Services.<br />
            <span style={{ color: 'var(--color-accent)', fontWeight: 'normal' }}>
              From bare shell to opening night.
            </span>
          </h1>

          <p style={{ color: 'var(--color-text-muted)', fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', maxWidth: '780px', margin: '0 auto', lineHeight: 1.7 }}>
            Every service is led directly by Jigar Rajgor, combining structural civil engineering with over a decade of real-world restaurant management experience.
          </p>
        </motion.div>

        {/* Services List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', marginBottom: '6rem' }}>
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <SpotlightCard className="bento-card" style={{ padding: 'clamp(2rem, 5vw, 3.5rem)', borderRadius: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                  <span className="process-step-num" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>Pillar {svc.num}</span>
                  <span style={{ color: 'var(--color-accent)', fontSize: '0.88rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Full Practice Area</span>
                </div>

                <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontFamily: 'var(--font-heading)', color: 'var(--color-text)', marginBottom: '0.6rem' }}>
                  {svc.title}
                </h2>
                <p style={{ color: 'var(--color-accent)', fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: 500 }}>
                  {svc.subtitle}
                </p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.02rem', lineHeight: 1.75, maxWidth: '950px', marginBottom: '2.5rem' }}>
                  {svc.desc}
                </p>

                <div style={{ borderTop: '1px solid rgba(196, 154, 108, 0.2)', paddingTop: '2rem' }}>
                  <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--color-text)', marginBottom: '1.25rem' }}>
                    Key Deliverables & Specifications:
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1rem 2rem' }}>
                    {svc.deliverables.map((item, dIdx) => (
                      <div key={dIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '0.2rem' }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link to="/start" className="btn-primary" style={{ padding: '0.9rem 1.8rem', fontSize: '0.95rem' }}>
                    Inquire for This Service &rarr;
                  </Link>
                  <Link to="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.9rem 1.8rem', borderRadius: '30px', border: '1px solid rgba(196, 154, 108, 0.3)', color: 'var(--color-text)', textDecoration: 'none', fontSize: '0.95rem' }}>
                    Explore Transformations &rarr;
                  </Link>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* ── Complimentary Add-On Insights Section ── */}
        <section id="complimentary-insights" style={{ marginBottom: '6rem' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(196, 154, 108, 0.1)',
              border: '1px solid rgba(196, 154, 108, 0.35)',
              borderRadius: '24px',
              padding: '6px 16px',
              marginBottom: '1.25rem'
            }}>
              <Sparkles size={15} color="var(--color-accent, #c49a6c)" />
              <span style={{
                color: 'var(--color-accent, #c49a6c)',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                Complimentary Value-Add Insights
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              fontFamily: 'var(--font-heading)',
              lineHeight: 1.2,
              marginBottom: '1.2rem',
              color: 'var(--color-text)'
            }}>
              Complimentary Strategic Insights.<br />
              <span style={{ color: 'var(--color-accent, #c49a6c)', fontWeight: 'normal' }}>
                Included with every consulting engagement.
              </span>
            </h2>

            <p style={{
              color: 'var(--color-text-muted)',
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              maxWidth: '820px',
              margin: '0 auto',
              lineHeight: 1.7
            }}>
              We believe great hospitality ventures shouldn't be nickeled-and-dimed for essential engineering advice. Every JR Consulting project automatically comes bundled with these proprietary strategic audits and blueprints as <strong style={{ color: '#fff' }}>complimentary inclusions</strong>.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '1.75rem'
          }}>
            {complimentaryInsights.map((insight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <SpotlightCard 
                  className="bento-card" 
                  style={{ 
                    height: '100%', 
                    padding: 'clamp(1.5rem, 4vw, 2.2rem)', 
                    borderRadius: '24px', 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid rgba(196, 154, 108, 0.22)'
                  }}
                >
                  <div>
                    {/* Top Pill & Tag */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      marginBottom: '1.5rem',
                      gap: '10px'
                    }}>
                      <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '14px',
                        background: 'rgba(196, 154, 108, 0.12)',
                        border: '1px solid rgba(196, 154, 108, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {insight.icon}
                      </div>

                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(34, 197, 94, 0.12)',
                        border: '1px solid rgba(34, 197, 94, 0.32)',
                        borderRadius: '16px',
                        padding: '4px 12px',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        letterSpacing: '0.5px',
                        color: '#4ade80',
                        textTransform: 'uppercase'
                      }}>
                        <CheckCircle2 size={13} />
                        <span>Complimentary</span>
                      </div>
                    </div>

                    <div style={{
                      fontSize: '0.76rem',
                      color: 'var(--color-accent, #c49a6c)',
                      fontWeight: 600,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      marginBottom: '0.5rem'
                    }}>
                      {insight.pairedWith}
                    </div>

                    <h3 style={{
                      fontSize: '1.45rem',
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-text)',
                      marginBottom: '1rem',
                      lineHeight: 1.3
                    }}>
                      {insight.title}
                    </h3>

                    <p style={{
                      color: 'var(--color-text-muted)',
                      fontSize: '0.94rem',
                      lineHeight: 1.65,
                      marginBottom: 0
                    }}>
                      {insight.desc}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          {/* Bottom Commitment Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              marginTop: '3.5rem',
              background: 'linear-gradient(135deg, rgba(20, 32, 24, 0.85) 0%, rgba(9, 14, 10, 0.95) 100%)',
              border: '1px solid rgba(196, 154, 108, 0.35)',
              borderRadius: '24px',
              padding: 'clamp(1.75rem, 4vw, 2.5rem)',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1.5rem',
              boxShadow: '0 20px 45px rgba(0,0,0,0.5)'
            }}
          >
            <div style={{ maxWidth: '750px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                <ShieldCheck size={18} color="var(--color-accent, #c49a6c)" />
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-accent, #c49a6c)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  The JR Consulting Standard
                </span>
              </div>
              <h3 style={{ fontSize: '1.4rem', color: '#fff', margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)' }}>
                No Hidden Consulting Surcharges. Real Operational Backing.
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.94rem', margin: 0, lineHeight: 1.6 }}>
                Every client receives direct civil engineering audits, CFM exhaust calculations, and FSSAI sanitary blueprints as standard project deliverables.
              </p>
            </div>

            <Link
              to="/start"
              className="btn-primary"
              style={{
                padding: '0.95rem 2rem',
                fontSize: '0.95rem',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>Book Discovery Call</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </section>


        {/* Pre-footer Callout */}
        <div className="prefooter-card">
          <div className="prefooter-text">
            <p className="bento-tag" style={{ display: 'inline-block', marginBottom: '0.8rem' }}>Tailored Consultation</p>
            <h2>Not sure which service scope fits your project?</h2>
            <p>Schedule a 30-minute discovery session with Jigar Rajgor to assess your space and define an accurate scope of work.</p>
          </div>
          <div className="prefooter-actions">
            <Link to="/start" className="btn-primary" style={{ textAlign: 'center', padding: '1.1rem 2.2rem' }}>
              Schedule Discovery Call &rarr;
            </Link>
            <a href="https://wa.me/919909558212" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--color-text)', textDecoration: 'none', padding: '1rem', border: '1px solid rgba(196, 154, 108, 0.3)', borderRadius: '30px' }}>
              WhatsApp Directly
            </a>
          </div>
        </div>
      </section>

      <Footer ref={footerRef} />
    </SmoothScroll>
  )
}
