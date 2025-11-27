import React, { useState, useEffect, useRef } from 'react';
import './AboutPage.css';
import HeaderMenu from "./HeaderMenu"; 

const AboutPage = () => {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  // initial → profile → experiences → skills
  const [scrollState, setScrollState] = useState('initial'); 

  const sectionRefs = useRef([]);
  const headerRef = useRef(null);

  // Header 滾動效果
  useEffect(() => {
    const onScroll = () => {
      // 確保在 headerRef.current 存在時才計算滾動量
      const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;
      setHeaderScrolled(window.scrollY > headerHeight);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 計算 header 高度 (使用 CSS 變量)
  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${height}px`);
    }
  }, []);

  // Scroll State 控制
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;

      if (!sectionRefs.current[0]) return;

      // 取得各區塊的頂部位置
      const profileOffset = sectionRefs.current[0].offsetTop;
      const experiencesOffset = sectionRefs.current[1].offsetTop;
      const skillsOffset = sectionRefs.current[2].offsetTop;

      const initialThreshold = 10; 
      // 讓 Active 狀態在區塊滾動到距離 Header 下方一定距離時切換
      const stickyThreshold = headerHeight + 50; 

      if (scrollY < initialThreshold) {
        setScrollState('initial');
      } else if (scrollY < experiencesOffset - stickyThreshold) {
        setScrollState('profile');
      } else if (scrollY < skillsOffset - stickyThreshold) {
        setScrollState('experiences');
      } else {
        // 當滾動超過 Skills 區塊的起點時
        setScrollState('skills');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始加載時執行一次
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const folderTextMap = {
    initial: 'Scroll Down'
  };

  const sectionTitles = ['Profile', 'Experiences', 'Skills'];
  const folderKeys = ['profile', 'experiences', 'skills'];
  
  const scrollToSection = (index) => {
    // 考慮 Header 高度來調整滾動位置
    const offset = headerRef.current ? headerRef.current.offsetHeight : 0;
    const element = sectionRefs.current[index];
    if (element) {
        // 為了讓區塊的頂部停在 Header 下方，滾動到 elementPosition - offset
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
        });
    }
  };

  return (
    <div className="about-page">
      {/* Header (使用 fixed/sticky 定位，並保留 ref) */}
      <div className={`header-wrapper ${headerScrolled ? "header-scrolled" : ""}`}>
        <HeaderMenu ref={headerRef} />
      </div>

      {/* 第一屏 - 保持不動 */}
      <section className="about-page-container">
        <h1 className="about-title">( About ) me</h1>
        <p className="about-subtitle">
          專注於品牌設計和網頁設計的細節設計師，對跨領域元素轉化為數位體驗有著濃厚的興趣。
        </p>
      </section>

      <div className="scroll-indicator">
        {Object.entries(folderTextMap).map(([key, text]) => (
          <span
            key={key}
            className={`scroll-text ${scrollState === key ? 'fade-in' : 'fade-out'}`}
          >
            {text}
          </span>
        ))}
      </div>

      {/* 資料夾堆疊容器 */}
      <div className="folder-stack-container">
        {folderKeys.map((key, idx) => (
          // **關鍵：所有區塊都使用 .folder-section 及其 sticky-wrapper**
          <section
            key={key}
            ref={(el) => (sectionRefs.current[idx] = el)}
            // 加入 folder-key-X 方便未來針對個別區塊調整樣式或內容
            className={`folder-section folder-key-${key}`}
            // 賦予 Z-index，讓後面的區塊 (idx 越大) 疊在前面 (Z-index 越小) 的上面
            style={{ zIndex: 10 - idx }} 
          >
            {/* **關鍵：利用 sticky-wrapper 實現定住效果** */}
            <div className="sticky-wrapper">
                
                {/* 資料夾標籤群組 */}
                <div className="folder-tab-group">
                  
                  {/* 1. 背景標籤 (Inactive / 上一個 Section 名稱) */}
                  <div 
                    className="tab-label inactive-tab" 
                    onClick={() => idx > 0 && scrollToSection(idx - 1)}
                  >
                    <span className="label-text">
                      {/* 邏輯：如果不是第一個 Section (idx=0)，顯示前一個名稱。如果是第一個，顯示自身的名稱。 */}
                      {idx > 0 ? sectionTitles[idx - 1] : sectionTitles[idx]} 
                    </span>
                  </div>
                  
                  {/* 2. 活動標籤 (Active / 當前 Section 名稱) */}
                  <div
                    className={`tab-label active-tab ${scrollState === key ? 'active' : ''}`}
                    onClick={() => scrollToSection(idx)}
                  >
                    <span className="label-text">
                      {sectionTitles[idx]} 
                    </span>
                  </div>
                </div>
                {/* END 資料夾標籤群組 */}

                {/* 資料夾內容 */}
                <div className="folder-content-container">
                    <div className="folder">
                      <div className="folder-content">
                        {/* 根據 key 渲染不同內容 */}
                        {key === 'profile' && (
                          <>
                            <div className="chinese-bio">
                              <p>我是來自台灣的視覺&網站設計師 瑋儒。</p>
                              <p>畢業於朝陽科技大學工業設計系，取得學士學位，並於 Greystone College 進修前端開發課程並順利結業。</p>
                              <p>專注於平面設計、網站設計與數位媒體領域，累積了豐富的實務經驗。</p>
                            </div>
                            <div className="english-bio">
                              <p>I'm Weiru, a visual and web designer from Taiwan.</p>
                              <p>I hold a bachelor's degree in Industrial Design from Chaoyang University of Technology.</p>
                              <p>My work focuses on graphic design, web design, and digital media.</p>
                            </div>
                          </>
                        )}
                        {key === 'experiences' && (
                          <>
                            <h2>工作經歷 (Experiences)</h2>
                            <p><strong>UX/UI 設計師 - XYZ 科技公司 (2022 - 2024)</strong></p>
                            <ul>
                              <li>主導行動應用程式 (App) 的介面設計，提升使用者留存率 15%。</li>
                              <li>與前端團隊緊密合作，確保設計稿高度還原。</li>
                            </ul>
                            <p><strong>平面設計師 - ABC 品牌顧問 (2020 - 2022)</strong></p>
                            <ul>
                              <li>負責公司品牌識別系統和行銷素材的視覺設計。</li>
                              <li>成功為三項新產品創建了視覺形象。</li>
                            </ul>
                          </>
                        )}
                        {key === 'skills' && (
                          <>
                            <h2>專業技能 (Skills)</h2>
                            <p>這裡可以放 Skills 內容，例如設計工具、前端技術等。</p>
                            <ul>
                                <li>設計工具：Figma, Adobe Creative Suite (Ps, Ai, Id)</li>
                                <li>前端：HTML5, CSS3/SASS, JavaScript (React)</li>
                                <li>其他：品牌識別 (CI/VI), 使用者研究 (UX Research)</li>
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;