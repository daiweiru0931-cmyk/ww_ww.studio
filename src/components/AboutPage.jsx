import React, { useState, useEffect, useRef } from 'react';
import './AboutPage.css';
import HeaderMenu from "./HeaderMenu"; 

const AboutPage = () => {
  const [scrollState, setScrollState] = useState('initial'); 
  const [visibleSections, setVisibleSections] = useState([false, false, false]); 
  const sectionRefs = useRef([]);
  const headerRef = useRef(null);

  /* ---------- 進入頁面時滾動到最上方 ---------- */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ---------- Header 滾動效果 ---------- */
  useEffect(() => {
    const onScroll = () => {
      const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------- 設定 CSS 變數 header 高度 ---------- */
  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${height}px`);
    }
  }, []);

  /* ---------- 控制每個 section 何時進場 ---------- */
  useEffect(() => {
    const handleVisibility = () => {
      setVisibleSections((prev) =>
        sectionRefs.current.map((el, i) => {
          if (!el) return prev[i];
          const rect = el.getBoundingClientRect();
          const triggerPoint = window.innerHeight * 0.6;
          return rect.top < triggerPoint ? true : prev[i];
        })
      );
    };

    window.addEventListener("scroll", handleVisibility);
    handleVisibility();
    return () => window.removeEventListener("scroll", handleVisibility);
  }, []); // <-- 修正這裡：空陣列，避免無限迴圈

  /* ---------- Scroll State 原邏輯 ---------- */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;
      const stickyThreshold = headerHeight + 50;

      if (!sectionRefs.current[0]) return;

      const experiencesOffset = sectionRefs.current[1].offsetTop;
      const skillsOffset = sectionRefs.current[2].offsetTop;

      if (scrollY < 10) {
        setScrollState('initial');
      } else if (scrollY < experiencesOffset - stickyThreshold) {
        setScrollState('profile');
      } else if (scrollY < skillsOffset - stickyThreshold) {
        setScrollState('experiences');
      } else {
        setScrollState('skills');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const folderTextMap = {
    initial: 'Scroll Down'
  };

  const sectionTitles = ['Profile', 'Experiences', 'Skills'];
  const folderKeys = ['profile', 'experiences', 'skills'];

  const scrollToSection = (index) => {
    const offset = headerRef.current ? headerRef.current.offsetHeight : 0;
    const element = sectionRefs.current[index];
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  const getTabsForSection = (index) => sectionTitles.slice(0, index + 1);

  return (
    <div className="about-page">
      <HeaderMenu />

      {/* 第一屏 */}
      <section className="about-page-container">
        <h1 className="about-title">( About ) me</h1>
        <p className="about-subtitle">
          專注於品牌設計和網頁設計的細節設計師，對跨領域元素轉化為數位體驗有著濃厚的興趣。
        </p>
      </section>

      {/* Scroll Down */}
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

      {/* 資料夾堆疊 */}
      <div className="folder-stack-container">
        {folderKeys.map((key, idx) => (
          <section
            key={key}
            ref={(el) => (sectionRefs.current[idx] = el)}
            className={`folder-section folder-key-${key} ${scrollState === key ? "visible-section" : "hidden-section"}`}
            style={{ zIndex: idx + 10 }}
          >
            <div
              className="sticky-wrapper"
              style={{
                opacity: visibleSections[idx] ? 1 : 0,
                transform: visibleSections[idx] ? "translateY(0)" : "translateY(120px)",
                transition: "all 0.6s ease"
              }}
            >
              {/* Tab group */}
              <div className="folder-tab-group">
                {getTabsForSection(idx).map((title) => {
                  const sectionIndex = sectionTitles.indexOf(title);
                  const isActive = sectionIndex === idx;
                  return (
                    <div
                      key={title}
                      className={`tab-label ${isActive ? 'active-tab' : 'inactive-tab'} ${scrollState === folderKeys[sectionIndex] ? 'active' : ''}`}
                      onClick={() => scrollToSection(sectionIndex)}
                    >
                      <span className="label-text">{title}</span>
                    </div>
                  );
                })}
              </div>

              {/* Folder Content */}
              <div className="folder-content-container">
                <div className="folder">
                  <div className="folder-content">
                    {key === 'profile' && (
                      <>
                        <div className="chinese-bio">
                          <p>我是來自台灣的視覺&網站設計師 瑋儒。</p>
                          <p>畢業於朝陽科技大學工業設計系，取得學士學位，並於 Greystone College 進修前端開發課程。</p>
                        </div>
                        <div className="english-bio">
                          <p>I'm Weiru, a visual and web designer from Taiwan.</p>
                          <p>I focus on graphic design, web design, and digital media.</p>
                        </div>
                      </>
                    )}

                    {key === 'experiences' && (
                      <>
                        <h2>工作經歷 (Experiences)</h2>
                        <p><strong>UX/UI 設計師 - XYZ 科技公司 (2022 - 2024)</strong></p>
                        <ul>
                          <li>主導行動應用介面設計，提高留存率 15%。</li>
                          <li>與工程合作確保設計精準還原。</li>
                        </ul>
                        <p><strong>平面設計師 - ABC 品牌顧問 (2020 - 2022)</strong></p>
                        <ul>
                          <li>負責品牌識別與視覺設計。</li>
                        </ul>
                      </>
                    )}

                    {key === 'skills' && (
                      <>
                        <h2>專業技能 (Skills)</h2>
                        <ul>
                          <li>設計：Figma, Adobe Suite</li>
                          <li>前端：HTML, CSS, JavaScript(React)</li>
                          <li>品牌、UX Research</li>
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
