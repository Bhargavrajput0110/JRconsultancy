const Services = () => {
  return (
    <>
      <section id="services" className="services-section">
        <div className="section-container">
          <div className="services-header">
            <h2 className="section-title">Every detail. <br/><span>Designed to work.</span></h2>
            <p>From the right location to a kitchen that supports your menu, every decision helps shape the restaurant you want to build.</p>
          </div>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon"><i className="ph ph-blueprint"></i></div>
              <div className="service-content">
                <span className="service-tag">01 / PLANNING</span>
                <h3>Set the foundations.</h3>
                <ul>
                  <li>Site selection advice</li>
                  <li>Layout review & advice</li>
                  <li>Basic Vastu consultation</li>
                  <li>Project programme & scheduling</li>
                  <li>Budget analysis</li>
                </ul>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon"><i className="ph ph-fork-knife"></i></div>
              <div className="service-content">
                <span className="service-tag">02 / DESIGN & PROCUREMENT</span>
                <h3>Shape the experience.</h3>
                <ul>
                  <li>Menu design assistance</li>
                  <li>Kitchen workflow & layout (incl. MEP services assistance)*</li>
                  <li>Kitchen equipment selection & procurement assistance</li>
                  <li>Vendor recommendations</li>
                  <li>Crockery, cutlery, uniforms & packaging advice</li>
                </ul>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon"><i className="ph ph-users-three"></i></div>
              <div className="service-content">
                <span className="service-tag">03 / PEOPLE & OPERATIONS</span>
                <h3>The people. The process.</h3>
                <ul>
                  <li>Manpower recruitment assistance</li>
                  <li>Job responsibilities & role clarity</li>
                  <li>General service & kitchen staff training</li>
                  <li>Document management system in accordance with FSSAI norms</li>
                  <li>Stores & inventory management assistance</li>
                  <li>Food and other cost analysis advisory</li>
                </ul>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon"><i className="ph ph-rocket-launch"></i></div>
              <div className="service-content">
                <span className="service-tag">04 / LAUNCH & SUPPORT</span>
                <h3>Opening day is just the start.</h3>
                <ul>
                  <li>Marketing & budgeting assistance</li>
                  <li>Pre-launch planning</li>
                  <li>Post-launch support</li>
                  <li>Ongoing operational reviews</li>
                </ul>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon"><i className="ph ph-chart-line-up"></i></div>
              <div className="service-content">
                <span className="service-tag">05 / ADD ON INSIGHT</span>
                <h3>Strategic civil audits & MEP insights.</h3>
                <ul>
                  <li>Pre-lease MEP & civil feasibility audit</li>
                  <li>Exhaust hood CFM & fresh air balancing</li>
                  <li>Vendor tender & price benchmarking</li>
                  <li>FSSAI Schedule 4 sanitary zoning blueprint</li>
                  <li>Ergonomic station bottleneck analysis</li>
                </ul>
              </div>
            </div>
          </div>
        {/* Complimentary Add-On Insights Strip */}
        <div className="complimentary-insights-block" style={{ marginTop: '5rem', borderTop: '1px solid rgba(196, 154, 108, 0.25)', paddingTop: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ 
              display: 'inline-block', 
              color: 'var(--color-accent, #c49a6c)', 
              fontSize: '0.8rem', 
              fontWeight: 600, 
              letterSpacing: '1.5px', 
              textTransform: 'uppercase', 
              background: 'rgba(196, 154, 108, 0.1)', 
              padding: '6px 16px', 
              borderRadius: '20px', 
              border: '1px solid rgba(196, 154, 108, 0.3)',
              marginBottom: '1rem' 
            }}>
              ✦ COMPLIMENTARY VALUE-ADD INSIGHTS
            </span>
            <h3 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-heading)', margin: '0 0 1rem 0' }}>
              Strategic Insights Included With Every Service.
            </h3>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '750px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Every consulting scope includes these proprietary civil audits, air-balancing models, and compliance blueprints as complimentary inclusions.
            </p>
          </div>

          <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            <div className="service-card" style={{ border: '1px solid rgba(196, 154, 108, 0.3)' }}>
              <div className="service-content">
                <span className="service-tag" style={{ color: '#4ade80' }}>✓ COMPLIMENTARY INCLUSION</span>
                <h4>Pre-Lease MEP & Civil Audit</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: '0.8rem 0' }}>
                  Slab load-bearing checks, exhaust shaft heights, and plumbing fall verification before you commit to a commercial lease.
                </p>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-accent, #c49a6c)', fontWeight: 600 }}>
                  Prevents ₹1.5L–₹3L in unexpected rework.
                </span>
              </div>
            </div>

            <div className="service-card" style={{ border: '1px solid rgba(196, 154, 108, 0.3)' }}>
              <div className="service-content">
                <span className="service-tag" style={{ color: '#4ade80' }}>✓ COMPLIMENTARY INCLUSION</span>
                <h4>Hood CFM & HVAC Air Balancing</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: '0.8rem 0' }}>
                  Scientific fresh air makeup and exhaust velocity calculation preventing kitchen hot pockets and smoke rollback into dining areas.
                </p>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-accent, #c49a6c)', fontWeight: 600 }}>
                  Saves 15%–22% on power bills.
                </span>
              </div>
            </div>

            <div className="service-card" style={{ border: '1px solid rgba(196, 154, 108, 0.3)' }}>
              <div className="service-content">
                <span className="service-tag" style={{ color: '#4ade80' }}>✓ COMPLIMENTARY INCLUSION</span>
                <h4>Vendor Tender & Price Benchmark</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: '0.8rem 0' }}>
                  Factory-direct procurement tender floatation with strict SS 304 gauge audits, bypassing agent commissions and fabricator markups.
                </p>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-accent, #c49a6c)', fontWeight: 600 }}>
                  Saves 15%–25% on equipment CAPEX.
                </span>
              </div>
            </div>

            <div className="service-card" style={{ border: '1px solid rgba(196, 154, 108, 0.3)' }}>
              <div className="service-content">
                <span className="service-tag" style={{ color: '#4ade80' }}>✓ COMPLIMENTARY INCLUSION</span>
                <h4>FSSAI Sanitary Zoning Blueprint</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: '0.8rem 0' }}>
                  Strict dirty-to-clean flow zoning and grease interceptor positioning mapped precisely to municipal food safety standards.
                </p>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-accent, #c49a6c)', fontWeight: 600 }}>
                  Municipal compliance alignment.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      <section className="cta-section">
        <div className="cta-container">
          <h2>From first plan to first plate.</h2>
          <p>Let's bring your vision to the table.</p>
          <a href="#contact" className="btn-primary">Start Your Project</a>
        </div>
      </section>
    </>
  );
};

export default Services;
