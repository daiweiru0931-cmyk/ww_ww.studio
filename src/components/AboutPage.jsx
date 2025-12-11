import React, { useRef, useEffect } from 'react';
import Lenis from 'lenis';
import './AboutPage.css';
import HeaderMenu from "./HeaderMenu"; 
import Footer from "./Footer";

const AboutPage = () => {
  const folderRefs = useRef([]);
  const indicatorRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const folderEnterPositions = [0, 1500, 3000];
    const folderDurations = [600, 600, 600];
    const slideUpDistance = 600;

    const onScroll = () => {
      const scroll = lenis.scroll;

      // ===== FOLDER 進場動畫 =====
      folderRefs.current.forEach((folder, i) => {
        if (!folder) return;

        let progress = (scroll - folderEnterPositions[i]) / folderDurations[i];
        progress = Math.min(Math.max(progress, 0), 1);

        folder.style.position = 'fixed';
        folder.style.left = '50%';
        folder.style.top = '50%';

        const initialYOffset = 100;
        const stackOffset = i * 1;

        const currentYOffset = initialYOffset * (1 - progress);
        const stackDisplacement = stackOffset * progress;

        folder.style.transform =
          `translate(-50%, calc(-50% + ${currentYOffset}px - ${stackDisplacement}px))`;
        folder.style.opacity = progress;
        folder.style.zIndex = 10 + i;
      });

      // ===== FOLDER 統一滑出動畫（修正版） =====
      const lastIndex = folderEnterPositions.length - 1;
      const lastEnter = folderEnterPositions[lastIndex] + folderDurations[lastIndex];
      const lastProgress = (scroll - lastEnter) / slideUpDistance;

      if (lastProgress > 0) {
        folderRefs.current.forEach((folder, i) => {
          if (!folder) return;
          folder.style.transform =
            `translate(-50%, calc(-50% - ${i * 30}px - ${slideUpDistance * lastProgress}px))`;
        });
      }

      // ===== Scroll Indicator 淡出 =====
      const indicator = indicatorRef.current;
      if (indicator) {
        if (scroll > 50) {
          indicator.style.opacity = '0';
          indicator.style.pointerEvents = 'none';
        } else {
          indicator.style.opacity = '1';
          indicator.style.pointerEvents = 'auto';
        }
      }
    };

    lenis.on("scroll", onScroll);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      try { lenis.off && lenis.off("scroll", onScroll); } catch (e) {}
      lenis.destroy();
    };
  }, []);

  const folderKeys = ["why", "how", "what"];

  return (
    <div className="about-page">
      <HeaderMenu />

      <section className="about-page-container">
        <h1 className="about-page-label">( About ) me</h1>
        <p className="about-page-subtitle">
          專注於品牌和網頁細節的設計師，對跨領域元素轉化為數位體驗有著濃厚的興趣。
        </p>
        <div className="scroll-down-indicator" ref={indicatorRef} />
      </section>

      <section className="folder-stack-container-wrapper">
        <div className="folder-stack-container">
          {folderKeys.map((key, idx) => (
            <div
              key={key}
              ref={(el) => (folderRefs.current[idx] = el)}
              className={`folder folder-key-${key}`}
            >
              {key === "why" && (
                <div className="why-folder-container">
                  <div className="why-title"><h2>WHY</h2></div>
                  <div className="why-description">
                    <p className="zh-text">
                      我喜歡把故事與品牌價值轉化為能被「感受到」的視覺體驗。
                      這是我選擇成為設計師的原因。
                    </p>
                    <p className="en-text">
                      I love transforming stories and brand values into visual experiences people can truly feel.
                      That's why I became a designer.
                    </p>
                  </div>
                </div>
              )}

              {key === "how" && (
                <div className="how-folder-container">
                  <div className="how-title"><h2>HOW</h2></div>
                  <div className="how-description">
                    <p className="zh-text">
                      從洞察品牌個性出發，提煉出清晰的視覺方向，並延伸至品牌化與網站動線。
                      不只追求好看，更重視引導性與可被記住的體驗。
                    </p>
                    <p className="en-text">
                      I begin by understanding a brand's personality, refining it into a clear visual direction,
                      and extending it into branding and web flow design.
                    </p>
                  </div>
                </div>
              )}

              {key === "what" && (
                <div className="what-folder-container">
                  <div className="what-title"><h2>WHAT</h2></div>
                  <div className="what-description">
                    <p className="zh-text">
                      專注於「品牌 × 網站」的整合設計，打造兼具視覺風格、資訊清晰度與互動質感的網頁體驗。
                    </p>
                    <p className="en-text">
                      I focus on integrating branding with web design to create digital experiences
                      that balance visual identity, clarity, and interaction.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="profile-container">
        <h2>PROFILE</h2>
        <p>這裡放個人資料、自傳或專業背景摘要。</p>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
