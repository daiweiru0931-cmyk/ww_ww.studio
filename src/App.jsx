import React, { useRef, useEffect, useState } from 'react';
import HeaderMenu from "./components/HeaderMenu";
import DecryptedText from "./components/DecryptedText";
import InfoBox from "./components/InfoBox";
import AccordionGallery from "./components/AccordionGallery";
import SplitText from "./components/SplitText";
import DarkModeMulti from "./components/DarkModeMulti";
import Footer from "./components/Footer";
import './App.css';
import { Link, useNavigate } from 'react-router-dom';

// 服務圖片
import serviceGp01 from './assets/service/servicegp-img01.jpg';
import serviceGp02 from './assets/service/servicegp-img02.jpg'; 
import serviceWb01 from './assets/service/servicewb-img01.jpg';
import serviceWb02 from './assets/service/servicewb-img02.jpg'; 

const serviceGpImages = [
    { src: serviceGp01, alt: "Graphic Design Sample 1" },
    { src: serviceGp02, alt: "Graphic Design Sample 2" },
];

const serviceWbImages = [
    { src: serviceWb01, alt: "Web Design Sample 1" },
    { src: serviceWb02, alt: "Web Design Sample 2" },
];

// Taste 圖片
import tasteBranding01 from './assets/taste/taste-branding-01.jpg'; 
import tasteBranding02 from './assets/taste/taste-branding-02.jpg'; 
import tasteBranding03 from './assets/taste/taste-branding-03.jpg'; 

const tasteImages = [
  { src: tasteBranding01, alt: "Branding Sample 1 - Puddings" },
  { src: tasteBranding02, alt: "Branding Sample 2 - Coffee" },
  { src: tasteBranding03, alt: "Branding Sample 3 - Bakery" },
];

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

function App() {
  const navigate = useNavigate();
  const serviceRef = useRef(null);
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
    const handleResize = () => {
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [currentGpImgIndex, setCurrentGpImgIndex] = useState(0);
  const [currentWbImgIndex, setCurrentWbImgIndex] = useState(0);
  const [currentTasteImgIndex, setCurrentTasteImgIndex] = useState(0);

  // 輪播控制
  const goToNextGpImg = () => setCurrentGpImgIndex((prev) => (prev + 1) % serviceGpImages.length);
  const goToPrevGpImg = () => setCurrentGpImgIndex((prev) => (prev - 1 + serviceGpImages.length) % serviceGpImages.length);
  const goToNextWbImg = () => setCurrentWbImgIndex((prev) => (prev + 1) % serviceWbImages.length);
  const goToPrevWbImg = () => setCurrentWbImgIndex((prev) => (prev - 1 + serviceWbImages.length) % serviceWbImages.length);
  const goToNextTasteImg = () => setCurrentTasteImgIndex((prev) => (prev + 1) % tasteImages.length);
  const goToPrevTasteImg = () => setCurrentTasteImgIndex((prev) => (prev - 1 + tasteImages.length) % tasteImages.length);

  // 自動輪播
  useEffect(() => {
    const gpInterval = setInterval(goToNextGpImg, 5000);
    const wbInterval = setInterval(goToNextWbImg, 5000);
    const tasteInterval = setInterval(goToNextTasteImg, 5000);
    return () => {
      clearInterval(gpInterval);
      clearInterval(wbInterval);
      clearInterval(tasteInterval);
    };
  }, []);

  return (
    <>
      <HeaderMenu ref={headerRef} />
      <div className="App" style={{ paddingTop: `${headerHeight}px` }}>
        
        {/* Hero */}
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
            <h5>視覺與網站 創意開發</h5>
            <p>A portfolio website</p>
            <div className="info-box-container">
              <InfoBox />
            </div>
          </div>  
        </section>

        {/* Work Preview */}
        <section className="work-preview">
          <AccordionGallery />
        </section>

        {/* About */}
        <section className="about">
          <span className="section-label">( About )</span>
          <div className="about-content">
            <div className="about-text">
              <h3>Creative Designer</h3>
              <p>創意開發設計師</p>
            </div>
            <div className="about-description">
              <p>專注於品牌識別和網頁設計的視覺設計師，對將視覺元素轉化為數位邏輯有著濃厚的興趣。</p>
              <p>A visual designer specializing in brand identity and web design, with a deep interest in translating visuals into digital logic.</p>
              <Link to="/about" className="view-more-btn">
                <span className="btn-text">VIEW MORE</span>
                <span className="btn-icon"></span>
              </Link>
            </div>
          </div>
        </section>

        {/* Dark Mode */}
        <DarkModeMulti targetRef={serviceRef} />

        {/* Service */}
        <section className="service" ref={serviceRef}>
          <span className="section-label">( Service )</span>
          <div className="service-container">
            <div className="service-content">
              <h3>Creative Development in Visual and Web Design</h3>
              <p>專注於品牌識別與網頁設計，以設計轉化為核心，探索主題與價值的細微之處，提供具深度與創意的視覺解決方案，將品牌的理想形態具體化。</p>
            </div>

            <div className="service-wrapper">
              {/* Graphic Design */}
              <div className="service-item-left">
                <h3>Graphic Design</h3>
                <p>從標誌設計、名片、傳單、手冊到活動主視覺與產品包裝，以一致的品牌語言打造能引起共鳴的視覺設計。</p>
                <p className="gp-description-en">From logo design, business cards, flyers, and brochures to event key visuals and product packaging. Creating cohesive and resonant visual designs that communicate your brand's essence.</p>
                <div className="service-image service-carousel">
                  <div className="carousel-track" style={{ width: `${serviceGpImages.length*100}%`, transform: `translateX(-${(100/serviceGpImages.length)*currentGpImgIndex}%)` }}>
                    {serviceGpImages.map((img, idx) => (
                      <img key={idx} src={img.src} alt={img.alt} style={{ width: `${100/serviceGpImages.length}%` }} />
                    ))}
                  </div>
                  <Link to="/graphicdesign" className="link-arrow-btn">›</Link>
                </div>
              </div>

              <div className="service-divider"></div>

              {/* Web Design */}
              <div className="service-item-right">
                <h3>Web Design</h3>
                <p>打造兼具視覺吸引力與使用者體驗的網站。期待與品牌一同開創更多獨特的線上呈現。</p>
                <p className="wb-description-en">Creating visually engaging websites that connect with users. Expanding the portfolio and collaborating with brands to craft unique online experiences.</p>
                <div className="service-image service-carousel">
                  <div className="carousel-track" style={{ width: `${serviceWbImages.length*100}%`, transform: `translateX(-${(100/serviceWbImages.length)*currentWbImgIndex}%)` }}>
                    {serviceWbImages.map((img, idx) => (
                      <img key={idx} src={img.src} alt={img.alt} style={{ width: `${100/serviceWbImages.length}%` }} />
                    ))}
                  </div>
                  <Link to="/webdesign" className="link-arrow-btn">›</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Taste */}
        <section className="taste">
          <span className="section-label">( Taste )</span>
          <div className="taste-content">
            <div className="taste-text">
              <h3>Wendy's Kitchen</h3>
              <p>一個介於味道與情感之間的柔和空間。食物本身也成為了一種設計。</p>
              <p className="taste-description-en">It's a gentle space between flavor and feeling, where food becomes another form of design.</p>
            </div>
            <div className="taste-carousel-wrapper">
              <img src={tasteImages[currentTasteImgIndex].src} alt={tasteImages[currentTasteImgIndex].alt} className="taste-main-img" />
              <button className="carousel-nav-btn prev" onClick={goToPrevTasteImg}>&lt;</button>
              <button className="carousel-nav-btn next" onClick={goToNextTasteImg}>&gt;</button>
              <div className="carousel-dots">
                {tasteImages.map((_, idx) => (
                  <span key={idx} className={`carousel-dot ${idx === currentTasteImgIndex ? 'active' : ''}`} onClick={() => setCurrentTasteImgIndex(idx)}></span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
        
      </div>
    </>
  );
}

export default App;
