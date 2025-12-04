import React, { useState, useEffect, useRef } from 'react';
import './AboutPage.css';
import HeaderMenu from "./HeaderMenu"; 
import Footer from "./Footer";

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

      const skillsOffset = sectionRefs.current[1].offsetTop;
      const experiencesOffset = sectionRefs.current[2].offsetTop;

      if (scrollY < 10) {
        setScrollState('initial');
      } else if (scrollY < skillsOffset - stickyThreshold) {
        setScrollState('profile');
      } else if (scrollY < experiencesOffset - stickyThreshold) {
        setScrollState('skills');
      } else {
        setScrollState('experiences');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const folderTextMap = {
    initial: 'Scroll Down'
  };

  const sectionTitles = ['Profile', 'Skills', 'Experiences'];
  const folderKeys = ['profile', 'skills', 'experiences'];

  const scrollToSection = (index) => {
    const offset = headerRef.current ? headerRef.current.offsetHeight : 0;
    const element = sectionRefs.current[index];
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  const getTabsForSection = (index) => sectionTitles.slice(0, index + 1);

// Skills 表格數據整理  
  const skillsData = {
    skillests: [
      ["01", "Graphic Design"],
      ["02", "Branding"],
      ["03", "Illustration"],
      ["04", "Web Design"],
      ["05", "Visual Content Planning"],
      ["06", "Taste Profiling"],
    ],
    softwares: [
      ["Adobe Photoshop", "Adobe Illustrator", "Adobe Indesign"],
      ["Adobe After Effects", "Adobe Premiere Pro", "Procreate"],
      ["Lightroom", "Figma", "Procreate"], // 第三行數據
      ["HTML5 / CSS3 / JavaScript", "TypeScript", "React.js"],
      ["Vite", "VS Code", "GitHub"],
    ],
    languages: [
     "Mandarin Chinese / English",
    ],
  };

  return (
    <div className="about-page">
      <HeaderMenu ref={headerRef} />

      {/* 第一屏 */}
      <section className="about-page-container">
        <h1 className="about-page-label">( About ) me</h1>
        <p className="about-page-subtitle">
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
                {getTabsForSection(idx).map((title, tabIdx) => {
                  const sectionIndex = sectionTitles.indexOf(title);
                  return (
                    <div
                      key={title}
                      className={`tab-label tab-${folderKeys[sectionIndex]}`} // 用 CSS 控制顏色
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
                  <div className="folder-threeParts">
                    {key === 'profile' && (
                      <>
                        <div className="profile-description">
                          <p className="pro-des-zh">
                          來自台灣的視覺&網站設計師 瑋儒。
                          <br/><br/>台灣 朝陽科技大學工業設計系，學士學位。加拿大 Greystone College前端開發專業，結業證書。
                          <br/><br/>專注於平面設計、網站設計與數位媒體領域，累積了豐富的實務經驗。
                          熱愛視覺敘事，擅長融合多種媒材與技能，持續突破創意邊界，致力打造兼具美感與功能性的品牌體驗。
                          </p>
                        
                          <p className="pro-des-en">
                          WeiRu is a Visual and Web Designer from Taiwan.
                          <br/><br/>Holds a Bachelor's degree in Industrial Design from Chaoyang University of Technology 
                          and a certificate in Front-End Development from Greystone College, Canada.
                          <br/><br/>Specializing in graphic design, web design, and digital media, I leverage extensive 
                          experience and a passion for visual storytelling to craft brand experiences that are both beautiful and highly functional.
                          </p>
                        </div>
                        <div className="profile-photo">
                        <img src="/src/assets/profile/profile-photo-wei.jpg" alt="profile photo" />
                        </div>
                      </>
                    )}

                    {key === 'skills' && (
                      <div className="skills-grid-container">
                        
                        {/* SKILLESTS 表頭 */}
                        <div className="skills-header skillests-header">SKILLESTS</div>
                        
                        {/* SOFTWARES 表頭 */}
                        <div className="skills-header softwares-header">SOFTWARES</div>
                        
                        {/* ========================================================== */}
                        {/* 關鍵修正: SKILLESTS 集中區塊 (單一單元格) */}
                        {/* ========================================================== */}
                        <div className="grid-row-item skillests-single-cell">
                          {skillsData.skillests.map((itemPair, index) => (
                            <React.Fragment key={`sks-frag-${index}`}>
                              {/* 渲染數字、空格、描述 */}
                              <span className="skill-number">{itemPair[0]}</span>
                              &nbsp;&nbsp;&nbsp; 
                              <span className="skill-description">{itemPair[1]}</span>
                              
                              {/* 除了最後一項，都添加換行 */}
                              {index < skillsData.skillests.length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </div>

                        {/* SOFTWARES/LANGUAGES 內容 (需跨行/跨列渲染) */}
                        <div className="softwares-languages-area">
                          {/* SOFTWARES 內容 */}
                          {skillsData.softwares.map((row, rowIndex) => (
                            <React.Fragment key={`swr-${rowIndex}`}>
                              {row.map((cell, cellIndex) => (
                                <div className="software-cell" key={`swc-${rowIndex}-${cellIndex}`}>
                                  {cell}
                                </div>
                              ))}
                            </React.Fragment>
                          ))}

                          {/* LANGUAGES 表頭 */}
                          <div className="languages-header">LANGUAGES</div>

                          {/* LANGUAGES 內容 */}
                          <div className="languages-cell">
                            {skillsData.languages[0]}
                          </div>

                        </div>
                        
                      </div>
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
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;
