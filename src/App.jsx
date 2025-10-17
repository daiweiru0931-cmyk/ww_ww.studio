import React, { useState, useEffect } from 'react';
import DecryptedText from './components/DecryptedText';
import InfoBox from "./components/InfoBox";
import AccordionGallery from './components/AccordionGallery';
import './App.css'; 

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // 點擊空白處關閉側邊選單
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.side-menu') && !e.target.closest('.menu-icon')) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('click', handleOutsideClick);
    else document.removeEventListener('click', handleOutsideClick);

    return () => document.removeEventListener('click', handleOutsideClick);
  }, [menuOpen]);

  return (
    <div className="App">
      {/* Header Section */}
      <header className="header">
        <div className="logo">WW studio</div>

        <div className="header-right">
          {/* CONTACT 按鈕 */}
          <button className="contact-btn">CONTACT</button>

          {/* 漢堡按鈕 */}
          <div
            className={`menu-icon ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>

        {/* 右側滑出選單 */}
        <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li>ABOUT</li>
            <li>WORKS</li>
            <li>TASTE</li>
            <li>SERVICES</li>
          </ul>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <DecryptedText
            texts={[
              { text: "WW.creative.studio", className: "h1-text" },
              { text: "creative development in visual and web design", className: "p-text" }
            ]}
            speed={50}
            maxIterations={20}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
            encryptedClassName="encrypted"
            parentClassName="all-letters"
          />
        </div>

        <div className="hero-right">
          <h3>視覺與網站 創意開發</h3>
          <p>A portfolio website</p>
          <div className="info-box-container">
            <InfoBox />
          </div>
        </div>  
      </section>

      {/* Work Preview Section */}
      <section className="work-preview">  
        <AccordionGallery />
      </section>

      {/* About Section */}
      <section className="about">
        <span className="section-label">( About )</span>
        <div className="about-content">
          <div className="about-text">
            <h2>visual & website creative developer</h2>
            <p>視覺與網站 創意開發</p>
          </div>
          <div className="about-description">
            <p>
              Your descriptive text here. This section seems to describe the studio's philosophy or process in both English and Japanese.
            </p>
            <button className="view-more-btn">VIEW MORE &gt;</button>
          </div>
        </div>
      </section>

      {/* Taste Section */}
      <section className="taste">
        <span className="section-label">( Taste )</span>
        <div className="taste-images">
          <img src="placeholder.jpg" alt="Team member" />
          <img src="placeholder.jpg" alt="Team member" />
          <img src="placeholder.jpg" alt="Team member" />
        </div>
      </section>

      {/* Service Section */}
      <section className="service">
        <span className="section-label">( SERVICE )</span>
        <div className="service-content">
          <div className="service-text">
            <h2>在るべき姿を形にする</h2>
            <h3>トータルデザイン</h3>
            <p>
              Your Japanese descriptive text here. This text likely explains their total design approach and services.
            </p>
            <button className="view-more-btn">VIEW MORE &gt;</button>
          </div>
          <div className="service-diagram"></div>
        </div>
      </section>

      {/* Footer / CTA Section */}
      <footer className="footer">
        <nav className="footer-nav">
          <ul>
            <li>HOME</li>
            <li>ABOUT</li>
            <li>SERVICE</li>
            <li>WORKS</li>
            <li>COLUMN</li>
            <li>GUIDE/TAG</li>
          </ul>
        </nav>
        <button className="contact-btn">CONTACT</button>
      </footer>
    </div>
  );
}

export default App;
