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
                  <li>Kitchen workflow & layout (MEP services)*</li>
                  <li>Equipment selection & procurement</li>
                  <li>Vendor recommendations</li>
                  <li>Crockery, cutlery, uniforms & packaging</li>
                </ul>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon"><i className="ph ph-users-three"></i></div>
              <div className="service-content">
                <span className="service-tag">03 / PEOPLE & OPERATIONS</span>
                <h3>The people. The process.</h3>
                <ul>
                  <li>Manpower recruitment & role clarity</li>
                  <li>General service & kitchen staff training</li>
                  <li>Document management (FSSAI norms)</li>
                  <li>Stores & inventory management</li>
                  <li>Cost analysis</li>
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
