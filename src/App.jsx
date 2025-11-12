import React, { useRef, useEffect, useState } from 'react'; // ✨ 新增 useState
import HeaderMenu from "./components/HeaderMenu";
import DecryptedText from './components/DecryptedText';
import InfoBox from "./components/InfoBox";
import AccordionGallery from './components/AccordionGallery';
import './App.css';

import serviceGpImg from './assets/service/servicegp-img01.jpg';
import serviceWbImg from './assets/service/servicewb-img01.jpg';
// ✨ 假設有多張圖片用於輪播
import tasteBranding01 from './assets/taste/taste-branding-01.jpg'; 
import tasteBranding02 from './assets/taste/taste-branding-02.jpg'; 
import tasteBranding03 from './assets/taste/taste-branding-03.jpg'; 

// ✨ 將輪播圖片定義為一個陣列
const tasteImages = [
  { src: tasteBranding01, alt: "Branding Sample 1 - Puddings" },
  { src: tasteBranding02, alt: "Branding Sample 2 - Coffee" },
  { src: tasteBranding03, alt: "Branding Sample 3 - Bakery" },
];

function App() {
  const serviceRef = useRef(null);
  // ✨ 新增狀態：追蹤目前顯示的圖片索引
  const [currentTasteImgIndex, setCurrentTasteImgIndex] = useState(0);

  // ✨ 自動輪播效果
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTasteImgIndex((prevIndex) => 
        (prevIndex + 1) % tasteImages.length // 循環到下一張
      );
    }, 5000); // 每 5 秒切換一次圖片

    return () => clearInterval(interval); // 清除計時器以避免記憶體洩漏
  }, []); // 空陣列表示只在元件掛載時執行一次

  // ✨ 手動切換圖片的函式
  const goToNextTasteImg = () => {
    setCurrentTasteImgIndex((prevIndex) => 
      (prevIndex + 1) % tasteImages.length
    );
  };

  const goToPrevTasteImg = () => {
    setCurrentTasteImgIndex((prevIndex) => 
      (prevIndex - 1 + tasteImages.length) % tasteImages.length // 處理負數索引
    );
  };

  // --- 其他 useEffect (處理 dark-mode) 保持不變 ---
  useEffect(() => {
    const handleScroll = () => {
      const section = serviceRef.current;
      if (!section) return;
  
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
  
      // --- 新邏輯：service 區塊至少出現在畫面 70% 才進入 dark ---
      const isVisibleEnough =
        rect.top < viewportHeight * 0.3 && rect.bottom > viewportHeight * 0.3;
  
      if (isVisibleEnough) {
        document.body.classList.add("dark-mode"); // 進入反黑
      } else {
        document.body.classList.remove("dark-mode"); // 恢復原色
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初始化檢查一次
  
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

      {/* About Section */}
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
            <button className="view-more-btn">VIEW MORE &nbsp; &gt;</button>
          </div>
          <div className="service-diagram"></div>
        </div>
      </section>

      {/* Service Section */}
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
              <p>
                From logo design, business cards, flyers, and brochures to event key visuals and product packaging. 
                Creating cohesive and resonant visual designs that communicate your brand's essence.
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
                以設計思維與細節美感，打造兼具視覺吸引力與使用者體驗的網站。
                目前持續擴展作品案例，期待與品牌一同開創更多獨特的線上呈現。
              </p>
              <p>
                Creating visually engaging websites that connect with users. 
                Currently expanding the portfolio and looking forward to collaborating with brands to craft unique online experiences.
              </p>

              <div className="service-image">
                <img src={serviceWbImg} alt="Web Design Sample" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Taste Section (已修改為圖片輪播) */}
      <section className="taste">
        <span className="section-label">( Taste )</span>
        <div className="taste-content">
            <div className="taste-text-block">
                <h3 className="taste-title">Branding</h3>
                
                <p className="taste-description-jp">
                  「これからお店をオープンするけど何からしていい やら」、「企業イメージを根本から刷新したい！」な 
                  どなど、あなたのターゲットに刺さるブランディン グをご提案いたします✨
                </p>
                
                <p className="taste-description-en">
                  Whether you're opening a new store or looking to refresh your company's
                  image, we offer branding solutions that will resonate with your target audience.
                </p>
            </div>
            
            <div className="taste-carousel-wrapper"> {/* ✨ 輪播圖容器 */}
                {/* 輪播圖片 */}
                <img 
                    src={tasteImages[currentTasteImgIndex].src} 
                    alt={tasteImages[currentTasteImgIndex].alt} 
                    className="taste-main-img" 
                />

                {/* ✨ 導航按鈕 (左右箭頭) */}
                <button className="carousel-nav-btn prev" onClick={goToPrevTasteImg}>
                  &lt;
                </button>
                <button className="carousel-nav-btn next" onClick={goToNextTasteImg}>
                  &gt;
                </button>

                {/* ✨ 底部指示點 */}
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
              <h5>Online Office</h5>
              <p>Mail : daiweiru0931@gmail.com</p>
            </div>
            <p className="footer-instagram">
              Instagram :&nbsp;
              <a
                href="https://www.instagram.com/ww__ww.studio/"
                target="_blank"
                rel="noopener noreferrer"
              >
                ww__ww.studio
              </a>
            </p>
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