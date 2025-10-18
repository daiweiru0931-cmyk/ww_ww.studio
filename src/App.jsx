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
            <li>About</li>
            <li>Works</li>
            <li>Service</li>
            <li>Taste</li>
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
            <p>視覺＆網站 開發設計師</p>
          </div>
          <div className="about-description">
            <p>
              A visual designer specializing in brand identity and web design, <br/>
              with a deep interest in translating visuals into digital logic.
            </p>
            <p>
              專注於品牌識別和網頁設計的視覺設計師，對將視覺元素轉化為數位邏輯有著濃厚的興趣。
            </p>
            <button className="view-more-btn">VIEW MORE &nbsp; &gt;</button>
          </div>
          <div className="service-diagram"></div>
        </div>
      </section>

      {/* Service Section */}
      <section className="service">
        <span className="section-label">( Service )</span>
        <div className="service-content">
          <div className="service-text">
            <h2>視覺與網站 創意開發</h2>
            <p>
              專注於品牌識別與網頁設計，<br/>
              以設計轉化為核心，探索主題與價值的細微之處，<br/>
              提供具深度與創意的視覺解決方案，將品牌的理想形態具體化。
            </p>
          </div>

          {/* Service Layout */}
          <div className="service-wrapper">
            {/* 左側 Web Design */}
            <div className="service-item left">
              <h2>Web Design</h2>
              <p>
                WOSH designはノーコードWEBプラットフォーム「Studio」の「Gold Expert」です🏆
                お客様自身でも管理しやすく、より効率的・効果的なサイト運用が可能です💻
              </p>
              <p>
                WOSH design is one of the few nationwide "Studio Certified Experts SILVER Rank."
                Leveraging our extensive experience, we will maximize the appeal of your services!
              </p>

              <div className="service-image">
                <img src="web-design-sample.jpg" alt="Web Design Sample" />
              </div>
            </div>

            {/* 中間虛線分隔線 */}
            <div className="service-divider"></div>

            {/* 右側 Graphic Design */}
            <div className="service-item right">
              <h2>Graphic Design</h2>
              <p>
                あなたのサービスや商品の魅力を最大限に引き出し、クリエイティブなアイデアで
                効率的且つ効果的に「伝わる」デザインを制作いたします🖋
              </p>
              <p>
                From logo design to business cards, flyers, brochures, and product packaging,
                we create effective and efficient designs that truly resonate.
              </p>

              <div className="service-image">
                <img src="graphic-design-sample.jpg" alt="Graphic Design Sample" />
              </div>
            </div>
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

      {/* Footer */}
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
