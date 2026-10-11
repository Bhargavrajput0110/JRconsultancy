const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="section-container">
        <div className="about-grid">
          <div className="about-text">
            <h3 className="section-tag">KITCHEN & FACILITIES CONSULTANT</h3>
            <h2 className="section-title">Designed for the real world</h2>
            <p>My work sits at a rare crossroads: civil engineering and restaurant operations. I see kitchens through both lenses.</p>
            <p>Engineering trained me to think in terms of structure and flow - how space should be planned, how materials need to perform, and how compliance works best when it is built in from day one rather than added later.</p>
            <p>Because I have stood on both sides, I do not design kitchens simply to look right on paper. <strong>I design them to perform under real pressure and real volume, day after day.</strong></p>
          </div>
          <div id="expertise" className="expertise-card">
            <h4>PRACTICAL EXPERTISE</h4>
            <ul className="expertise-list">
              <li>
                <span className="number">01</span>
                <span className="text">Commercial kitchen layout & space planning</span>
              </li>
              <li>
                <span className="number">02</span>
                <span className="text">Structural safety & code compliance advisory</span>
              </li>
              <li>
                <span className="number">03</span>
                <span className="text">Kitchen workflow expertise</span>
              </li>
              <li>
                <span className="number">04</span>
                <span className="text">Operational efficiency reviews</span>
              </li>
              <li>
                <span className="number">05</span>
                <span className="text">New build & renovation consulting</span>
              </li>
              <li>
                <span className="number">06</span>
                <span className="text">Equipment placement & ventilation planning</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
