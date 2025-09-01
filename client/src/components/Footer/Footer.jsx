// client/src/components/Footer/Footer.jsx
import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerColumns}>
          <div className={styles.footerColumn}>
            <h4>TECHNO STORE</h4>
            <ul>
              <li><a href="#">New Arrival</a></li>
              <li><a href="#">Laptops</a></li>
              <li><a href="#">Desktops</a></li>
              <li><a href="#">Monitors</a></li>
              <li><a href="#">Graphic Cards</a></li>
              <li><a href="#">Motherboards</a></li>
              <li><a href="#">Gaming Gears</a></li>
              <li><a href="#">Components</a></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h4>SUPPORT</h4>
            <ul>
              <li><a href="#">My Account</a></li>
              <li><a href="#">Order Status</a></li>
              <li><a href="#">Return Policy</a></li>
              <li><a href="#">Shipping Information</a></li>
              <li><a href="#">Warranty Information</a></li>
              <li><a href="#">Service & Support</a></li>
              <li><a href="#">Drivers & Software</a></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h4>COMMUNITY</h4>
            <ul>
              <li><a href="#">Awards</a></li>
              <li><a href="#">Forums</a></li>
              <li><a href="#">Videos</a></li>
              <li><a href="#">Gaming Teams</a></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h4>ABOUT US</h4>
            <ul>
              <li><a href="#">Company Info</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerSocialNewsletter}>
          <div className={styles.socialMedia}>
            <span>Follow us</span>
            <ul>
              <li><a title="Facebook" href="#"><i className="fab fa-facebook-square" aria-hidden="true"></i></a></li>
              <li><a title="Twitter" href="#"><i className="fab fa-twitter-square" aria-hidden="true"></i></a></li>
              <li><a title="Instagram" href="#"><i className="fab fa-instagram-square" aria-hidden="true"></i></a></li>
              <li><a title="YouTube" href="#"><i className="fab fa-youtube-square" aria-hidden="true"></i></a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© 2024 TechnoBuild. All rights reserved.</p>
        <div className={styles.footerBottomLinks}>
          <a href="#">Contact Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">United States / English</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;