import React, { useRef, useEffect, useState, useCallback } from 'react';
import HeaderMenu from "./components/HeaderMenu";
import DecryptedText from "./components/DecryptedText"; 
import InfoBox from "./components/InfoBox";
import DarkModeMulti from "./components/DarkModeMulti";
import Footer from "./components/Footer";
import './App.css';
import { useNavigate } from 'react-router-dom';

const heroImages = [
  { src: '/assets/works/WG-Signage System.jpg', alt: "Hero Sample 1" },
  { src: '/assets/works/WG-LafoPoster.jpg', alt: "Hero Sample 2" },
  { src: '/assets/works/WGB-CI Membership.jpg', alt: "Hero Sample 3" },
  { src: '/assets/works/WG-Forest Menu.jpg', alt: "Hero Sample 4" },
  { src: '/assets/works/WG-Herbal Tea Packaging.jpg', alt: "Hero Sample 5" },
];

const tasteImages = [
  { src: '/assets/taste/taste-branding-01.jpg', alt: "Branding Sample 1" },
  { src: '/assets/taste/taste-branding-02.jpg', alt: "Branding Sample 2" },
  { src: '/assets/taste/taste-branding-03.jpg', alt: "Branding Sample 3" },
];

// Service 圖片路徑
const serviceCirclePath = '/assets/service/service-circle.png';

function App() {
  const navigate = useNavigate();
  const serviceRef = useRef(null);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  /* 同步 header 高度 → CSS 變數 */
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const setHeaderHeightVar = () => {
      const height = header.offsetHeight;
      setHeaderHeight(height);
      document.documentElement.style.setProperty('--header-height', `${height}px`);
    };

    setHeaderHeightVar();
    window.addEventListener('resize', setHeaderHeightVar);
    return () => window.removeEventListener('resize', setHeaderHeightVar);
  }, []);

  // Hero carousel 邏輯
  const [currentHeroImgIndex, setCurrentHeroImgIndex] = useState(0);
  const goToNextHeroImg = useCallback(() => {
    setCurrentHeroImgIndex(prev => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const heroInterval = setInterval(goToNextHeroImg, 4000);
    return () => clearInterval(heroInterval);
  }, [goToNextHeroImg]);

  // Taste carousel 邏輯
  const [currentTasteImgIndex, setCurrentTasteImgIndex] = useState(0);
  const goToNextTasteImg = useCallback(() => {
    setCurrentTasteImgIndex(prev => (prev + 1) % tasteImages.length);
  }, []);

  useEffect(() => {
    const tasteInterval = setInterval(goToNextTasteImg, 5000);
    return () => clearInterval(tasteInterval);
  }, [goToNextTasteImg]);

  // About flip 狀態
  const [isFlipped, setIsFlipped] = useState({ why: false, how: false, what: false });
  const handleFlip = useCallback((box, state) => {
    setIsFlipped(prev => ({ ...prev, [box]: state }));
  }, []);

  return (
    <>
      <HeaderMenu ref={headerRef} studioName="W.W. Design Studio" contactLabel="CONTACT" />

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
            <div className="about-boxes-wrapper">
              {['why', 'how', 'what'].map((key) => (
                <div 
                  key={key}
                  className={`about-info-box flip-container ${isFlipped[key] ? 'flipped' : ''}`}
                  onMouseEnter={() => handleFlip(key, true)}
                  onMouseLeave={() => handleFlip(key, false)}
                >
                  <div className="flipper">
                    <div className="front">
                      <span className="box-title-dot"></span>
                      <h4 className="box-title">{key.toUpperCase()}</h4>
                      <p className="box-description">
                        {key === 'why' && "I was experiencing moving beyond brand and web values into a total experience which is the reason why I became a designer."}
                        {key === 'how' && "I make my vision into a brand's personality, refining it into a clear, unique visual form for both print and web design."}
                        {key === 'what' && "I create an impressive, true story with web design to create digital experiences that embody brand identity, clarity, and interaction."}
                      </p>
                    </div>
                    <div className="back">
                      <h4 className="flipped-text">{key.toUpperCase()}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

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
                  <img src={serviceCirclePath} alt="service" />
                </div>
              </div>
            </div>
        </section>

       {/* Taste */}
        <section className="taste">
          <div className="taste-wrapper">
            <span className="taste-label">( Taste )</span>
            <div className="taste-photo-gallery">
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