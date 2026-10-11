const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="logo">
            <div className="logo-mark">
              <span className="logo-letter">JR</span>
            </div>
            <div className="logo-text">
              <h1>JR CONSULTING</h1>
              <p>RESTAURANT SET-UP & OPERATIONS</p>
            </div>
          </div>
          <p className="footer-tagline">Your partner in setting up a restaurant.</p>
        </div>
        
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-label">CONTACT</span>
            <p>Jigar Rajgor</p>
          </div>
          <div className="contact-item">
            <span className="contact-label">PHONE / WHATSAPP</span>
            <a href="tel:+919909558212">+91 99095 58212</a>
          </div>
          <div className="contact-item">
            <span className="contact-label">EMAIL</span>
            <a href="mailto:jigarrajgor@hotmail.com">jigarrajgor@hotmail.com</a>
          </div>
          <div className="contact-item">
            <span className="contact-label">LOCATION</span>
            <p>Vadodara, Gujarat.</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} JR Consulting. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
