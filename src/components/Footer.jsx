import React from "react";
import { Link } from "react-router-dom";
import SplitText from "./SplitText";
import "../App.css";

const Footer = () => {

  const handleAnimationComplete = () => {
    console.log("Footer split text animation done!");
  };

  return (
    <footer className="footer">
      <SplitText
        text="CONTACT ME."
        className="split-text"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={handleAnimationComplete}
      />

      <div className="footer-content">
        <Link to="/" className="footer-logo">
          <img src="ww-logo.svg" alt="WW Studio Logo" />
          <h3>WW Studio</h3>
        </Link>
        <nav className="footer-nav">
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/works">Works</Link></li>
            <li><Link to="/service">Service</Link></li>
            <li><Link to="/taste">Taste</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div className="footer-info">
          <div className="footer-office">
            <h5>Online Office</h5>
            <p>Mail : daiweiru0931@gmail.com</p>
            <p className="footer-instagram">
              Instagram :
              <a
                href="https://www.instagram.com/ww__ww.studio/"
                target="_blank"
                rel="noopener noreferrer"
              >
                ww_ww.studio
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2025 WW Studio</p>
      </div>
    </footer>
  );
};

export default Footer;
