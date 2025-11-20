import React, { useRef, useState, useEffect } from 'react';
// 假設您會引入 GSAP 來處理滾動動畫
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger'; 
import './AboutPage.css'; // 引入樣式文件
import HeaderMenu from "./HeaderMenu";

function AboutPage() {
    // 1. 狀態管理當前選中的分頁 (About 或 Experiences)
    const [activeTab, setActiveTab] = useState('About'); 
    
    // 2. 引用 DOM 元素
    const containerRef = useRef(null); // 整個 about 頁面的容器
    const stickyWrapperRef = useRef(null); // 包含所有堆疊面板的 sticky 容器
    const panelRefs = useRef([]); // 存儲所有分頁內容的引用

    // 3. 滾動動畫邏輯 (如果您使用 GSAP，這裡將是您的 ScrollTrigger 代碼)
    // 由於無法執行 GSAP，這裡只提供一個結構，您需要自行補齊動畫實現。
    // 在這個範例中，我將省略 GSAP 代碼，專注於 React 結構和 CSS 堆疊。
    useEffect(() => {
        // --- GSAP ScrollTrigger 範例結構 (需要引入 GSAP) ---
        /*
        if (containerRef.current) {
            const panels = panelRefs.current;
            
            // 讓整個 section 變得很長，以便滾動觸發
            // ScrollTrigger.create({
            //     trigger: containerRef.current,
            //     pin: stickyWrapperRef.current, // 固定重疊區域
            //     start: "top top",
            //     end: `+=${panels.length * window.innerHeight}`, // 根據面板數量設定滾動長度
            //     scrub: true,
            //     // ... 
            // });

            // 實作每個面板的堆疊/視差動畫
            // panels.forEach((panel, i) => {
            //    gsap.to(panel, {
            //        y: '0%', // 動畫結束狀態
            //        scrollTrigger: {
            //            trigger: containerRef.current,
            //            start: `top+=${i * window.innerHeight} top`, 
            //            end: `top+=${(i + 1) * window.innerHeight} top`, 
            //            // ...
            //        }
            //    });
            // });
        }
        */
        
        // --- 備註：沒有 GSAP 僅能靠 CSS 實現靜態堆疊，無法實現滾動動畫 ---
    }, []);


    // 根據您的截圖，定義內容
    const aboutContent = (
        <>
            <div className="content-left">
                {/* 這是截圖左側的文字區塊 */}
                <p>
                    我來自**台灣的視覺設計師兼網站設計師**，
                    **Wen**。我熱愛**創意開發**，這是我在**平面、網頁設計、數位媒體**領域持續精進的核心，並在
                    **Greystone College** 獲得**設計與網站發展證書**。
                </p>
                <p>
                    我對**品牌故事敘事**和**網頁設計的數位邏輯**充滿熱情，掌握了**豐富的實務經驗**。
                    我致力於**提供具深度與創意的視覺解決方案**，將品牌的理想形態具體化，
                    **持續開拓經驗與資源**，以創造**兼具美感與實用功能**的獨特體驗。
                </p>
                <div className="divider"></div>
                <p className="en-text">
                    I'm **Wen**, a **visual and web designer from Taiwan**.
                    My passion for **creative development** is the core of my continuous growth in **graphic, web, and digital media**,
                    and I hold a **Design and Web Development Certificate** from **Greystone College**.
                </p>
                <p className="en-text">
                    I'm passionate about **visual storytelling** and enjoy blending diverse **visual elements into digital logic** for web design.
                    I am committed to providing in-depth and creative visual solutions, actualizing brand ideals, and
                    **continually expanding experience and resources** to create unique experiences that **balance aesthetic beauty with functional clarity**.
                </p>
            </div>
            <div className="content-right">
                {/* 這是截圖右側的空白區塊，可用於放置照片或圖形 */}
            </div>
        </>
    );

    const experiencesContent = (
        <>
            {/* 這是截圖底部的 Experiences 內容 */}
            <div className="experience-list">
                <div className="experience-header">
                    <span className="col-year">Year</span>
                    <span className="col-company">Company / University</span>
                    <span className="col-position">Position</span>
                </div>
                <div className="experience-item">
                    <span className="col-year">2024.05 - present</span>
                    <span className="col-company">自由接案</span>
                    <span className="col-position">視覺 / 網站設計師</span>
                </div>
                {/* 更多經驗項目... */}
            </div>
        </>
    );

    // Tab 切換邏輯
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        // 如果使用 GSAP，這裡可能需要額外觸發一個動畫來調整面板的顯示位置
    };


    return (
        <div>
            {/* 固定的頂部標題和導航 */}
            <HeaderMenu />
            <div className="about-page-container" ref={containerRef}>
                <h1 className="about-title">( About ) me</h1>
                <p className="about-subtitle">
                    專注於品牌識別和網頁設計的視覺設計師，對將視覺元素轉化為數位邏輯有著濃厚的興趣。
                </p>
                <div className="scroll-hint">Scroll Down</div>
            </div>

            {/* 滾動時固定並重疊的內容區域 */}
            <div className="sticky-wrapper" ref={stickyWrapperRef}>
                
                {/* Panel 1: 主要 About 內容 (疊在最上層) */}
                <div 
                    className={`stacked-panel panel-1 panel-about ${activeTab === 'About' ? 'active-panel' : ''}`}
                    ref={el => panelRefs.current[0] = el}
                >
                    <div className="panel-content">
                        {aboutContent}
                    </div>
                </div>

                {/* Panel 2: Experiences 內容 (疊在下方) */}
                <div 
                    className={`stacked-panel panel-2 panel-experiences ${activeTab === 'Experiences' ? 'active-panel' : ''}`}
                    ref={el => panelRefs.current[1] = el}
                >
                    {/* Panel 2 頂部的 Tab 導航 */}
                    <nav className="panel-tabs">
                        <button 
                            className={`tab-btn ${activeTab === 'About' ? 'active' : ''}`}
                            onClick={() => handleTabClick('About')}
                        >
                            About
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'Experiences' ? 'active' : ''}`}
                            onClick={() => handleTabClick('Experiences')}
                        >
                            Experiences
                        </button>
                    </nav>
                    
                    {/* 僅在 Experiences 被選中時顯示內容 */}
                    {activeTab === 'Experiences' && (
                        <div className="panel-content experiences-content">
                            {experiencesContent}
                        </div>
                    )}
                </div>
                
                {/*
                Panel 3: 您可以加入更多分頁，並讓它們堆疊在 Panel 2 下方。
                這需要配合 GSAP/ScrollTrigger 來控制它們在滾動時的視差位移和堆疊順序。
                */}

            </div>
            
            {/* 為了讓 sticky-wrapper 能夠滾動，需要一個足夠長的佔位符 */}
            <div className="spacer" style={{ height: '300vh' }}></div> 
        </div>
    );
}

export default AboutPage;