import React, { useRef, useEffect, useState } from 'react';
import HeaderMenu from "./components/HeaderMenu";
import DecryptedText from './components/DecryptedText';
import InfoBox from "./components/InfoBox";
import AccordionGallery from './components/AccordionGallery';
import SplitText from './components/SplitText';
import './App.css';

// 假設服務圖片有多張，用於輪播
import serviceGp01 from './assets/service/servicegp-img01.jpg';
import serviceGp02 from './assets/service/servicegp-img02.jpg'; 
import serviceWb01 from './assets/service/servicewb-img01.jpg';
import serviceWb02 from './assets/service/servicewb-img02.jpg'; 

// 服務圖片集定義
const serviceGpImages = [
    { src: serviceGp01, alt: "Graphic Design Sample 1" },
    { src: serviceGp02, alt: "Graphic Design Sample 2" },
];

const serviceWbImages = [
    { src: serviceWb01, alt: "Web Design Sample 1" },
    { src: serviceWb02, alt: "Web Design Sample 2" },
];

// Taste Section 圖片 (保持不變)
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
  const serviceRef = useRef(null);
  
  // Service 圖片索引狀態
  const [currentGpImgIndex, setCurrentGpImgIndex] = useState(0);
  const [currentWbImgIndex, setCurrentWbImgIndex] = useState(0);

  // Taste 圖片狀態
  const [currentTasteImgIndex, setCurrentTasteImgIndex] = useState(0);
  
  // === Service Section 輪播控制函式 (點擊下一張) ===
  const goToNextGpImg = () => {
    setCurrentGpImgIndex((prevIndex) => 
      (prevIndex + 1) % serviceGpImages.length
    );
  };
  // goToPrevGpImg 函式雖然不需要，但保留以防未來需要
  const goToPrevGpImg = () => {
    setCurrentGpImgIndex((prevIndex) => 
      (prevIndex - 1 + serviceGpImages.length) % serviceGpImages.length
    );
  };
  const goToNextWbImg = () => {
    setCurrentWbImgIndex((prevIndex) => 
      (prevIndex + 1) % serviceWbImages.length
    );
  };
  // goToPrevWbImg 函式雖然不需要，但保留以防未來需要
  const goToPrevWbImg = () => {
    setCurrentWbImgIndex((prevIndex) => 
      (prevIndex - 1 + serviceWbImages.length) % serviceWbImages.length
    );
  };


  // === 自動輪播效果 ===
  useEffect(() => {
    // Service 圖片自動輪播 (與手動點擊邏輯相同)
    const gpInterval = setInterval(() => {
      setCurrentGpImgIndex((prevIndex) => 
        (prevIndex + 1) % serviceGpImages.length
      );
    }, 5000); 

    const wbInterval = setInterval(() => {
      setCurrentWbImgIndex((prevIndex) => 
        (prevIndex + 1) % serviceWbImages.length
      );
    }, 5000);

    // Taste 圖片自動輪播 (保持原樣)
    const tasteInterval = setInterval(() => {
      setCurrentTasteImgIndex((prevIndex) => 
        (prevIndex + 1) % tasteImages.length
      );
    }, 5000);

    return () => {
      clearInterval(gpInterval);
      clearInterval(wbInterval);
      clearInterval(tasteInterval);
    };
  }, []);

  // Taste Section 手動切換函式 (保持不變)
  const goToNextTasteImg = () => {
    setCurrentTasteImgIndex((prevIndex) => 
      (prevIndex + 1) % tasteImages.length
    );
  };

  const goToPrevTasteImg = () => {
    setCurrentTasteImgIndex((prevIndex) => 
      (prevIndex - 1 + tasteImages.length) % tasteImages.length
    );
  };
  
  // Dark Mode 滾動效果 (保持不變)
  useEffect(() => {
    const handleScroll = () => {
      const section = serviceRef.current;
      if (!section) return;
  
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
  
      const isVisibleEnough =
        rect.top < viewportHeight * 0.3 && rect.bottom > viewportHeight * 0.3;
  
      if (isVisibleEnough) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    handleScroll();
  
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- JSX 渲染部分 ---

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
          <h5>視覺與網站 創意開發</h5>
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

      {/* About Section (修正按鈕結構) */}
      <section className="about">
        <span className="section-label">( About )</span>
        <div className="about-content">
          <div className="about-text">
            <h3>Creative Designer</h3>
            <p>創意開發設計師</p>
          </div>
          <div className="about-description">
            <p>
              A visual designer specializing in brand identity and web design, 
              with a deep interest in translating visuals into digital logic.
            </p>
            <p>
              專注於品牌識別和網頁設計的視覺設計師，對將視覺元素轉化為數位邏輯有著濃厚的興趣。
            </p>
            {/* 修正後的按鈕結構 */}
            <button className="view-more-btn">
                <span className="btn-text">VIEW MORE</span>
                <span className="btn-icon"></span> 
            </button>
          </div>
          <div className="service-diagram"></div>
        </div>
      </section>

      {/* Service Section (已修改為圖片輪播及絕對定位) */}
      <section className="service" ref={serviceRef}>
        <span className="section-label">( Service )</span>
        <div className="service-content">
          <div className="service-text">
            <h3>Creative Development in Visual and Web Design</h3>
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
                從標誌設計、名片、傳單、小冊子到活動主視覺與產品包裝，
                以一致的品牌語言打造能引起共鳴的視覺設計。
              </p>
              <p className="gp-description-en">
                From logo design, business cards, flyers, and brochures to event key visuals and product packaging. 
                Creating cohesive and resonant visual designs that communicate your brand's essence.
              </p>

             {/* 輪播結構 - Graphic Design */}
             <div className="service-image service-carousel">
                  <div 
                      className="carousel-track" 
                      style={{ 
                          width: `${serviceGpImages.length * 100}%`,
                          transform: `translateX(-${(100 / serviceGpImages.length) * currentGpImgIndex}%)` 
                      }}
                  >
                      {serviceGpImages.map((image, index) => (
                          <img 
                              key={index} 
                              src={image.src} 
                              alt={image.alt} 
                              className="service-carousel-img"
                              style={{ width: `${100 / serviceGpImages.length}%` }}
                          />
                      ))}
                  </div>
                  <a 
                    href="/graphicdesign" 
                    className="link-arrow-btn" 
                    aria-label="Go to Graphic Design page"
                  >
                    ›
                  </a>
                </div>
            </div>

            {/* 中間虛線分隔線 */}
            <div className="service-divider"></div>

            {/* 右側 Web Design */}
            <div className="service-item-right">
                <h3>Web Design</h3>
                <p>
                  打造兼具視覺吸引力與使用者體驗的網站。
                  目前持續擴展作品案例，期待與品牌一同開創更多獨特的線上呈現。
                </p>
                <p className="wb-description-en">
                  Creating visually engaging websites that connect with users. 
                  Currently expanding the portfolio and looking forward to collaborating with brands to craft unique online experiences.
                </p>

                {/* 輪播結構 - Web Design */}
                <div className="service-image service-carousel">
                  <div 
                      className="carousel-track" 
                      style={{ 
                          width: `${serviceWbImages.length * 100}%`,
                          transform: `translateX(-${(100 / serviceWbImages.length) * currentWbImgIndex}%)` 
                      }}
                  >
                      {serviceWbImages.map((image, index) => (
                          <img 
                              key={index} 
                              src={image.src} 
                              alt={image.alt} 
                              className="service-carousel-img"
                              style={{ width: `${100 / serviceWbImages.length}%` }}
                          />
                      ))}
                  </div>
                  <a 
                    href="/webdesign" 
                    className="link-arrow-btn" 
                    aria-label="Go to Web Design page"
                  >
                    ›
                  </a>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Taste Section (輪播結構) */}
      <section className="taste">
        <span className="section-label">( Taste )</span>
        <div className="taste-content">
            <div className="taste-text-block">
                <h3>Wendy's Kitchen</h3>
                <p>
                一個介於味道與情感之間的柔和空間。
                在這裡，食物本身也成為了一種設計。
                </p>
                <p className="taste-description-en">
                It's a gentle space between flavor and feeling, 
                where food becomes another form of design.
                </p>
            </div>
            
            <div className="taste-carousel-wrapper">
                {/* 輪播圖片 */}
                <img 
                    src={tasteImages[currentTasteImgIndex].src} 
                    alt={tasteImages[currentTasteImgIndex].alt} 
                    className="taste-main-img" 
                />

                {/* 導航按鈕 (左右箭頭) - Taste Section 保留按鈕 */}
                <button className="carousel-nav-btn prev" onClick={goToPrevTasteImg}>
                  &lt;
                </button>
                <button className="carousel-nav-btn next" onClick={goToNextTasteImg}>
                  &gt;
                </button>

                {/* 底部指示點 */}
                <div className="carousel-dots">
                  {tasteImages.map((_, index) => (
                    <span 
                      key={index} 
                      className={`carousel-dot ${index === currentTasteImgIndex ? 'active' : ''}`}
                      onClick={() => setCurrentTasteImgIndex(index)}
                    ></span>
                  ))}
                </div>
            </div>
        </div>
      </section>


      {/* Footer */}
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
          <div className="footer-logo">
            <img src="ww-logo.svg" alt="WW Studio Logo" />
            <h3>WW Studio</h3>
          </div>
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
              <h5>Online Office</h5>
              <p>Mail : daiweiru0931@gmail.com</p>
              <p className="footer-instagram">
                Instagram :&nbsp;
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

        {/* 版權 */}
        <div className="footer-bottom">
          <p>Copyright © 2025 WW Studio</p>
        </div>
      </footer>
    </div>
  );
}

export default App;