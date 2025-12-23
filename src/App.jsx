import React, { useRef, useEffect, useState, useCallback } from 'react';
import HeaderMenu from "./components/HeaderMenu";
import DecryptedText from "./components/DecryptedText"; 
import InfoBox from "./components/InfoBox";
import DarkModeMulti from "./components/DarkModeMulti";
import Footer from "./components/Footer";
import './App.css';
import { Link, useNavigate } from 'react-router-dom';

// Hero images
import heroImg01 from './assets/works/works-img01.jpg'; 
import heroImg02 from './assets/works/works-img02.jpg'; 
import heroImg03 from './assets/works/works-img03.jpg'; 

const heroImages = [
  { src: heroImg01, alt: "Hero Sample 1" },
  { src: heroImg02, alt: "Hero Sample 2" },
  { src: heroImg03, alt: "Hero Sample 3" },
];

import serviceCircle from './assets/service/service-circle.png';

// Taste images
import tasteBranding01 from './assets/taste/taste-branding-01.jpg'; 
import tasteBranding02 from './assets/taste/taste-branding-02.jpg'; 
import tasteBranding03 from './assets/taste/taste-branding-03.jpg'; 

const tasteImages = [
  { src: tasteBranding01, alt: "Branding Sample 1 - Puddings" },
  { src: tasteBranding02, alt: "Branding Sample 2 - Coffee" },
  { src: tasteBranding03, alt: "Branding Sample 3 - Bakery" },
];

function App() {
  const navigate = useNavigate();
  const serviceRef = useRef(null);
  const headerRef = useRef(null);

  const [headerHeight, setHeaderHeight] = useState(0);

  /* ✅【關鍵】同步 header 高度 → CSS 變數 */
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const setHeaderHeightVar = () => {
      const height = header.offsetHeight;
      setHeaderHeight(height);

      document.documentElement.style.setProperty(
        '--header-height',
        `${height}px`
      );
    };

    setHeaderHeightVar();
    window.addEventListener('resize', setHeaderHeightVar);

    return () => window.removeEventListener('resize', setHeaderHeightVar);
  }, []);

  // Hero carousel
  const [currentHeroImgIndex, setCurrentHeroImgIndex] = useState(0);
  const goToNextHeroImg = useCallback(() => {
    setCurrentHeroImgIndex(prev => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const heroInterval = setInterval(goToNextHeroImg, 4000);
    return () => clearInterval(heroInterval);
  }, [goToNextHeroImg]);

  // Taste carousel
  const [currentTasteImgIndex, setCurrentTasteImgIndex] = useState(0);
  const goToNextTasteImg = useCallback(() => {
    setCurrentTasteImgIndex(prev => (prev + 1) % tasteImages.length);
  }, []);

  useEffect(() => {
    const tasteInterval = setInterval(goToNextTasteImg, 5000);
    return () => clearInterval(tasteInterval);
  }, [goToNextTasteImg]);

  // About flip
  const [isFlipped, setIsFlipped] = useState({ why: false, how: false, what: false });
  const handleFlip = useCallback((box, state) => {
    setIsFlipped(prev => ({ ...prev, [box]: state }));
  }, []);

  return (
    <>
      {/* ✅ headerRef 正確掛上 */}
      <HeaderMenu ref={headerRef} studioName="W.W. Studio" contactLabel="CONTACT" />

      {/* 🔸 paddingTop 可留（保險），hero-left 主要用 CSS calc */}
      <div className="App" style={{ paddingTop: `${headerHeight}px` }}>

        {/* Hero section */}
        <section className="hero">

          <div className="hero-left">
            <DecryptedText
              texts={[
                { text: "Brand Designer", className: "h1-text" },
                { text: "Exploring Frontend", className: "h1-text" }
              ]}
              speed={50}
              maxIterations={1}
              characters="abcdefghijklmnopqrstuvwxyz"
              encryptedClassName="encrypted"
              parentClassName="all-letters"
            />

            <div className="hero-bottom-left">
              <h5>A portfolio website</h5>
              <div className="info-box-container">
                <InfoBox />
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-carousel-container">
              <div className="hero-carousel-stack">
                {heroImages.map((img, idx) => (
                  <img 
                    key={idx}
                    src={img.src}
                    alt={img.alt}
                    className={`hero-carousel-img ${idx === currentHeroImgIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </section>

        {/* About Section */}
        <section className="about-why-how-what">
          <div className="about-content-boxes">

          <span className="about-label">( About )</span>
          
          {/* 將 WHY/HOW/WHAT 放在一起 */}
          <div className="about-boxes-wrapper">

            {/* WHY */}
            <div 
              className={`about-info-box flip-container ${isFlipped.why ? 'flipped' : ''}`}
              onMouseEnter={() => handleFlip('why', true)}
              onMouseLeave={() => handleFlip('why', false)}
            >
              <div className="flipper">
                <div className="front">
                  <span className="box-title-dot"></span>
                  <h4 className="box-title">WHY</h4>
                  <p className="box-description">I was experiencing moving beyond brand and web values into a total experience which is the reason why I became a designer.</p>
                </div>
                <div className="back">
                  <h4 className="flipped-text">WHY</h4>
                </div>
              </div>
            </div>

            {/* HOW */}
            <div 
              className={`about-info-box flip-container ${isFlipped.how ? 'flipped' : ''}`}
              onMouseEnter={() => handleFlip('how', true)}
              onMouseLeave={() => handleFlip('how', false)}
            >
              <div className="flipper">
                <div className="front">
                  <span className="box-title-dot"></span>
                  <h4 className="box-title">HOW</h4>
                  <p className="box-description">I make my vision into a bran's personality, refining it into a clear, unique visual form for both print and web design.</p>
                </div>
                <div className="back">
                  <h4 className="flipped-text">HOW</h4>
                </div>
              </div>
            </div>

            {/* WHAT */}
            <div 
              className={`about-info-box flip-container ${isFlipped.what ? 'flipped' : ''}`}
              onMouseEnter={() => handleFlip('what', true)}
              onMouseLeave={() => handleFlip('what', false)}
            >
              <div className="flipper">
                <div className="front">
                  <span className="box-title-dot"></span>
                  <h4 className="box-title">WHAT</h4>
                  <p className="box-description">I create an impressive, true story with web design to create digital experiences that embody brand identity, clarity, and interaction.</p>
                </div>
                <div className="back">
                  <h4 className="flipped-text">WHAT</h4>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Dark mode */}
        <DarkModeMulti targetRef={serviceRef} />

        {/* Service */}
        <section className="service" ref={serviceRef}>
            <div className="service-wrapper">

              <div className="service-item-left">
              <span className="service-label">( Service )</span>
                <p>
                  從標誌、名片、傳單、手冊，到活動主視覺與產品包裝，以一致且富有辨識度的品牌語言打造能引發情感共鳴的視覺設計。
                  同時，也專注於建立兼具美感與良好使用體驗的網站，期望與品牌攜手打造更具深度與獨特性的線上呈現。
                </p>
              </div>

              <div className="service-item-right">
                <div className="service-image">
                <img src={serviceCircle} alt="service" />
                </div>
              </div>

            </div>
          
        </section>

       {/* Taste */}
        <section className="taste">
          <div className="taste-wrapper">

            <span className="taste-label">( Taste )</span>
              
            {/* Taste left */}
            <div className="taste-photo-gallery">
              {/* 使用 map 渲染所有圖片，確保空間被撐開且切換平滑 */}
              {tasteImages.map((img, idx) => (
                <img 
                  key={idx}
                  src={img.src}
                  alt={img.alt}
                  className={`taste-img ${idx === currentTasteImgIndex ? 'active' : ''}`}
                />
              ))}
            </div>

            <div className="taste-right-card">
              <div className="taste-text-box">
                <span className="taste-title-dot"></span>
                <h4 className="card-title">Wendy's Kitchen</h4>
                <p className="card-description-en">
                  It's a gentle space between flavor and feeling, where food becomes another form of design.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default App;
