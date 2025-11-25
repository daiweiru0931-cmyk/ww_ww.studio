import React, { useState, useEffect, useRef } from 'react';
import './AboutPage.css';
import HeaderMenu from "./HeaderMenu"; // 確保路徑正確

const AboutPage = () => {
  const [scrollState, setScrollState] = useState('initial'); // 'initial', 'scrolled', 'experiences'
  const initialSectionRef = useRef(null); 
  const experiencesSectionRef = useRef(null); 
  const headerRef = useRef(null); // ⭐️ 新增：用於測量 Header 高度 ⭐️

  // ⭐️ 處理 Header 高度並設置 CSS 變數 ⭐️
  useEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      // 將 Header 高度設置為全域 CSS 變數
      document.documentElement.style.setProperty('--header-height', `${height}px`);
    }
  }, []); // 只在元件掛載時執行一次

  // 滾動事件處理邏輯 (與您提供的一致)
  useEffect(() => {
    // 簡單的滾動事件處理
    const handleScroll = () => {
        const initialEl = initialSectionRef.current;
        if (initialEl) {
            const rect = initialEl.getBoundingClientRect();
            
            // 由於 Header 佔用空間，我們需要考慮 Header 高度來判斷 'initial' 狀態
            const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;

            // 判斷是否滾動超過初始頁面的頂部
            if (rect.top < -50) { 
                setScrollState('scrolled');
            } 
            // 滾動到初始內容的一半 (用於切換到 experiences)
            if (rect.top < - (initialEl.offsetHeight / 2) + headerHeight) { 
                setScrollState('experiences');
            } 
            // 滾回頂部 (考慮 Header 底部為 0 點)
            if (rect.top >= -50) { 
                setScrollState('initial');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    
    // 清理事件監聽器
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 決定目前顯示在左下角的標籤文字
  const folderText = scrollState === 'initial' ? 'Scroll Down' : 'Profile';
  // 決定底部資料夾分頁的類名，用於切換顏色和位置
  const folderClass = scrollState === 'experiences' ? 'folder-experiences' : 'folder-profile';
  
  return (
    <div className="about-page">
      {/* 傳遞 ref 給 HeaderMenu */}
      <HeaderMenu ref={headerRef} /> 
      
      {/* ⭐️ 第一個 Section 剛好佔滿 Header 下方的剩餘空間 ⭐️ */}
      <section className="about-page-container">
        <h1 className="about-title">( About ) me</h1>
        <p className="about-subtitle">專注於品牌設計和網頁設計的細節設計師，對跨領域元素轉化為數位體驗有著濃厚的興趣。</p>
      </section>

      {/* --- 滾動後的主要內容區 (從這裡開始可以滾動) --- */}
      <section ref={initialSectionRef} className="main-content-section">
        <div className={`black-folder-container ${scrollState}`}>
          
          {/* 左側內容 */}
          <div className="black-folder-left">
            <div className="chinese-bio">
              <h3>我是來自台灣的網頁設計師兼網站設計師 雅嵐。</h3>
              <p>我畢業於加拿大 Greystone College 網頁設計數位行銷課程學位。並於 Greystone College 獲得網頁設計網頁設計進階證書課程。</p>
              <p>我熱衷於視覺設計、網頁設計、數碼媒體等多個領域，更除了紮實的實務經驗，我熱愛透過故事鋪陳，堆疊出各個多媒體素材融合，持續測試超載視覺美感。期許能做出兼顧視覺美感與功能實用性的優雅體驗。</p>
            </div>
            <div className="english-bio">
              <p>I'm Wayne, a visual and web designer from Taiwan.</p>
              <p>I graduated from the Web Design & Digital Marketing program at Greystone College in Canada. I also hold an advanced web design and development program certificate from Greystone College.</p>
              <p>I'm passionate about visual design, web design, and digital media, with a solid foundation in practical experience. I'm passionate about visual storytelling and enjoy blending diverse multimedia assets. I strive to create elegant and functional user experiences that balance aesthetic beauty with functional clarity.</p>
            </div>
          </div>
          
          {/* 右側內容 (圖面所示為空白) */}
          <div className="black-folder-right">
            {/*  */}
          </div>
        </div>

        {/* --- 底部導覽列/資料夾分頁 --- */}
        <div className="bottom-folder-tabs-wrapper">
            {/* 根據滾動狀態切換樣式和文字 */}
            <div className={`folder-tab-base ${folderClass}`}>
                <div className="tab-label profile-tab">{folderText}</div>
            </div>

            {/* Experiences Tab (滾動到 experiences 狀態才出現並重疊) */}
            <div className={`folder-tab-base experiences-tab ${scrollState === 'experiences' ? 'active' : ''}`}>
                <div className="tab-label">Experiences</div>
            </div>

            {/* Skills Tab (總是白底，在 experiences 之後) */}
            <div className={`folder-tab-base skills-tab ${scrollState === 'experiences' ? 'active' : ''}`}>
                <div className="tab-label">Skills</div>
            </div>
        </div>
      </section>
      
      {/* 僅為了測試滾動效果而添加的內容 */}
      <section ref={experiencesSectionRef} className="test-spacer">
        <p>這是一個佔位符，用於模擬滾動後出現的 Experiences 頁面內容。</p>
        <p>滾動到這裡，底部的分頁會完全切換。</p>
      </section>
    </div>
  );
};

export default AboutPage;