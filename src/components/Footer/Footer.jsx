// client/src/components/Footer/Footer.jsx
import React from 'react';
import styles from './Footer.module.css';

// Import social media icons from react-icons
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaStore
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Main Footer Content */}
        <div className={styles.footerMain}>
          {/* Products & Services */}
          <div className={styles.footerSection}>
            <h4>PRODUCTS & SERVICES</h4>
            <div className={styles.footerColumns}>
              <div className={styles.footerColumn}>
                <h5>Computing</h5>
                <ul>
                  <li><a href="/products/laptops">Laptops</a></li>
                  <li><a href="/products/desktops">Desktops</a></li>
                  <li><a href="/products/monitors">Monitors</a></li>
                  <li><a href="/products/components">Components</a></li>
                  <li><a href="/products/storage">Storage</a></li>
                </ul>
              </div>
              
              <div className={styles.footerColumn}>
                <h5>Gaming</h5>
                <ul>
                  <li><a href="/products/gaming-laptops">Gaming Laptops</a></li>
                  <li><a href="/products/gaming-desktops">Gaming Desktops</a></li>
                  <li><a href="/products/gaming-gears">Gaming Gears</a></li>
                  <li><a href="/products/graphics-cards">Graphics Cards</a></li>
                  <li><a href="/products/gaming-accessories">Accessories</a></li>
                </ul>
              </div>
              
              <div className={styles.footerColumn}>
                <h5>Services</h5>
                <ul>
                  <li><a href="/services/custom-build">Custom PC Build</a></li>
                  <li><a href="/services/repair">Repair Services</a></li>
                  <li><a href="/services/upgrade">Upgrade Services</a></li>
                  <li><a href="/services/warranty">Extended Warranty</a></li>
                  <li><a href="/services/business">Business Solutions</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Support & Company Info */}
          <div className={styles.footerSection}>
            <div className={styles.footerColumns}>
              <div className={styles.footerColumn}>
                <h4>SUPPORT</h4>
                <ul>
                  <li><a href="/support/account">My Account</a></li>
                  <li><a href="/support/orders">Order Status</a></li>
                  <li><a href="/support/returns">Return Policy</a></li>
                  <li><a href="/support/shipping">Shipping Information</a></li>
                  <li><a href="/support/warranty">Warranty Information</a></li>
                  <li><a href="/support/service">Service & Support</a></li>
                  <li><a href="/support/drivers">Drivers & Software</a></li>
                </ul>
              </div>
              
              <div className={styles.footerColumn}>
                <h4>COMMUNITY</h4>
                <ul>
                  {/* <li><a href="/community/awards"><Award /> Awards</a></li> */}
                  <li><a href="/community/forums">Forums</a></li>
                  <li><a href="/community/videos">Videos</a></li>
                  <li><a href="/community/teams">Gaming Teams</a></li>
                  <li><a href="/community/events">Events</a></li>
                </ul>
              </div>
              
              <div className={styles.footerColumn}>
                <h4>ABOUT US</h4>
                <ul>
                  <li><a href="/about">Company Info</a></li>
                  <li><a href="/careers">Careers</a></li>
                  <li><a href="/contact">Contact Us</a></li>
                  <li><a href="/locations">Store Locations</a></li>
                  <li><a href="/press">Press Releases</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Social Media */}
        <div className={styles.footerContactSocial}>
          <div className={styles.contactInfo}>
            <h4>CONTACT INFORMATION</h4>
            <div className={styles.contactDetails}>
              <p><FaPhone /> +1 (800) TECH-NOW</p>
              <p><FaEnvelope /> support@technobuild.com</p>
              <p><FaStore /> Mon-Fri: 9AM-6PM, Sat: 10AM-4PM</p>
            </div>
          </div>
          
          <div className={styles.socialMedia}>
            <h4>FOLLOW US</h4>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon} title="Facebook">
                <FaFacebook />
                <span>Facebook</span>
              </a>
              <a href="#" className={styles.socialIcon} title="Twitter">
                <FaTwitter />
                <span>Twitter</span>
              </a>
              <a href="#" className={styles.socialIcon} title="Instagram">
                <FaInstagram />
                <span>Instagram</span>
              </a>
              <a href="#" className={styles.socialIcon} title="YouTube">
                <FaYoutube />
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className={styles.newsletter}>
          <h4>STAY UPDATED</h4>
          <p>Subscribe to our newsletter for the latest products and exclusive offers</p>
          <div className={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className={styles.newsletterInput}
            />
            <button className={styles.newsletterButton}>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContent}>
          <p>© 2024 TechnoBuild. All rights reserved.</p>
          <div className={styles.footerBottomLinks}>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Use</a>
            <a href="/cookies">Cookie Policy</a>
            <a href="/sitemap">Site Map</a>
            <a href="/accessibility">Accessibility</a>
            <span>United States / English</span>
          </div>
          <div className={styles.paymentMethods}>
            <span>We Accept:</span>
            <div className={styles.paymentIcons}>
              <span className={styles.paymentIcon}>💳</span>
              <span className={styles.paymentIcon}>📱</span>
              <span className={styles.paymentIcon}>💰</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;