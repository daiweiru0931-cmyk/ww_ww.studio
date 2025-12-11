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

  const [heroLeftDimensions, setHeroLeftDimensions] = useState({ width: 0, height: 0 });
  const finalContentRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);

    const handleResize = () => {
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
      if (finalContentRef.current) {
        setHeroLeftDimensions({
          width: finalContentRef.current.offsetWidth,
          height: finalContentRef.current.offsetHeight,
        });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (finalContentRef.current && heroLeftDimensions.width === 0) {
      setHeroLeftDimensions({
        width: finalContentRef.current.offsetWidth,
        height: finalContentRef.current.offsetHeight,
      });
    }
  }, [heroLeftDimensions.width]);

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
      <HeaderMenu ref={headerRef} studioName="W.W. Studio" contactLabel="CONTACT" />
      <div className="App" style={{ paddingTop: `${headerHeight}px` }}>

        {/* Hero section */}
        <section className="hero">
          
          {/* Hero-left */}
          <div 
            className="hero-left"
            style={{ 
              width: heroLeftDimensions.width > 0 ? `${heroLeftDimensions.width}px` : 'auto',
              height: heroLeftDimensions.height > 0 ? `${heroLeftDimensions.height}px` : 'auto',
            }}
          >
            <div 
              ref={finalContentRef}
              style={{ 
                position: 'absolute', 
                visibility: 'hidden', 
                pointerEvents: 'none',
                maxWidth: '45%'
              }}
            >
              <span className="h1-text all-letters">Exploring Frontend</span>
              <div className="hero-bottom-left">
                <h5 style={{ margin: '12px 0 5px 0' }}>視覺與網站 創意開發</h5>
                <div className="search-box-simulated" style={{ border: '1px solid #666', background: '#fff', padding: '0.5rem 1rem', borderRadius: '5px' }}>
                  <span className="search-text" style={{ color: '#28140a', marginRight: '1rem' }}>based in Taiwan</span>
                  <span className="search-close" style={{ color: '#28140a' }}>+</span>
                </div>
              </div>
            </div>

            <DecryptedText
              texts={[
                { text: "Brand Designer", className: "h1-text" },
                { text: "Exploring Frontend", className: "h1-text" }
              ]}
              speed={50}
              maxIterations={1}
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
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

          {/* --- Hero-right (UPDATED VERSION) --- */}
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

          <span className="section-label">( About )</span>

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
        </section>

        {/* Dark mode */}
        <DarkModeMulti targetRef={serviceRef} />

        {/* Service */}
        <section className="service" ref={serviceRef}>
          <span className="section-label">( Service )</span>
          <div className="service-container">
            <div className="service-wrapper">

              <div className="service-item-left">
                <h3>Graphic Design</h3>
                <p>從標誌設計、名片、傳單、手冊到活動主視覺與產品包裝，以一致的品牌語言打造能引起共鳴的視覺設計。</p>
                <div className="service-image-placeholder-large"></div>
              </div>

              <div className="service-item-right">
                <h3>Web Design</h3>
                <p>打造兼具視覺吸引力與使用者體驗的網站。期待與品牌一同開創更多獨特的線上呈現。</p>
                <div className="service-image-placeholder-large"></div>
              </div>

            </div>
          </div>
        </section>

        {/* Taste */}
        <section className="taste">
          <span className="section-label">( Taste )</span>
          <div className="taste-content-wrapper">

            {/* Taste left */}
            <div className="taste-left-spacer taste-carousel">
              <img 
                src={tasteImages[currentTasteImgIndex].src}
                alt={tasteImages[currentTasteImgIndex].alt}
                className="taste-carousel-img-left active"
              />
              <div className="carousel-dots">
                {tasteImages.map((_, idx) => (
                  <span 
                    key={idx}
                    className={`carousel-dot ${idx === currentTasteImgIndex ? 'active' : ''}`}
                    onClick={() => setCurrentTasteImgIndex(idx)}
                  ></span>
                ))}
              </div>
            </div>

            {/* Right card */}
            <div className="taste-right-card">
              <div className="taste-text-box">
                <h4 className="card-title">Wendy's Kitchen</h4>
                <p className="card-description-en">It's a gentle space between flavor and feeling, where food becomes another form of design.</p>
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
