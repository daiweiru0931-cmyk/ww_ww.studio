import React from 'react';
import HeaderMenu from "./components/HeaderMenu";
import DecryptedText from './components/DecryptedText';
import InfoBox from "./components/InfoBox";
import AccordionGallery from './components/AccordionGallery';
import './App.css';

import serviceGpImg from './assets/service/servicegp-img01.jpg';
import serviceWbImg from './assets/service/servicewb-img01.jpg';

function App() {
  return (
    <div className="App">
      {/* Header */}
      <HeaderMenu />

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
            <h2>Creative Designer</h2>
            <p>創意開發設計師</p>
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
            <h2>Creative Development in Visual and Web Design</h2>
            <p>
              專注於品牌識別與網頁設計，<br/>
              以設計轉化為核心，探索主題與價值的細微之處，<br/>
              提供具深度與創意的視覺解決方案，將品牌的理想形態具體化。
            </p>
          </div>

          {/* Service Layout */}
          <div className="service-wrapper">
            {/* 左側 Graphic Design */}
            <div className="service-item-left">
              <h3>Graphic Design</h3>
              <p>
                From logo design, business cards, flyers, and brochures to event key visuals and product packaging. 
                Creating cohesive and resonant visual designs that communicate your brand's essence.
              </p>
              <p>
                從標誌設計、名片、傳單、小冊子到活動主視覺與產品包裝，<br/>
                以一致的品牌語言打造能引起共鳴的視覺設計。
              </p>

              <div className="service-image">
                <img src={serviceGpImg} alt="Graphic Design Sample" />
              </div>
            </div>

            {/* 中間虛線分隔線 */}
            <div className="service-divider"></div>

            {/* 右側 Web Design */}
            <div className="service-item-right">
              <h3>Web Design</h3>
              <p>
                Creating visually engaging websites that connect with users. 
                Currently expanding the portfolio and looking forward to collaborating with brands to craft unique online experiences.
              </p>
              <p>
                以設計思維與細節美感，打造兼具視覺吸引力與使用者體驗的網站。<br/>
                目前持續擴展作品案例，期待與品牌一同開創更多獨特的線上呈現。
              </p>

              <div className="service-image">
                <img src={serviceWbImg} alt="Web Design Sample" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Taste Section */}
      <section className="taste">
        <span className="section-label">( Taste )</span>
        <div className="taste-images">
          <img src="taste01.jpg" alt="Taste" />
          <img src="taste02.jpg" alt="Taste" />
          <img src="taste03.jpg" alt="Taste" />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          {/* 左側 Logo */}
          <div className="footer-logo">
            <img src="ww-logo.svg" alt="WW Studio Logo" />
            <p>WW Studio</p>
          </div>

          {/* 中間導覽 */}
          <nav className="footer-nav">
            <ul>
              <li>About</li>
              <li>Works</li>
              <li>Service</li>
              <li>Taste</li>
              <li>Contact</li>
            </ul>
          </nav>

          {/* 地址資訊 */}
          <div className="footer-info">
            <div className="footer-office">
              <p>Oline Office</p>
              <p>MAIL : daiweiru0931@gmail.com</p>
            </div>
            <p className="footer-phone">PHONE : +886 931-276270</p>
          </div>
        </div>

        {/* 版權 */}
        <div className="footer-bottom">
          <p>Copyright © 2025 WW Studio</p>
        </div>

        {/* 背景裝飾 */}
        <div className="footer-bg"></div>
      </footer>

    </div>
  );
}

export default App;
