import React, { useRef, useEffect } from 'react';
import Lenis from 'lenis';
import './AboutPage.css';
import HeaderMenu from "./HeaderMenu"; 
import Footer from "./Footer";

const skillsData = {
  skillests: [
    ["01", "Graphic Design"], ["02", "Branding"], ["03", "Illustration"],
    ["04", "Web Design"], ["05", "Visual Content Planning"], ["06", "Taste Profiling"],
  ],
  softwares: [
    ["Adobe Photoshop", "Adobe Illustrator", "Adobe Indesign"],
    ["Adobe After Effects", "Adobe Premiere Pro", "Procreate"],
    ["Lightroom", "Figma", "Procreate"], 
    ["HTML5 / CSS3 / JavaScript", "TypeScript", "React.js"],
    ["Vite", "VS Code", "GitHub"],
  ],
  languages: ["Mandarin Chinese / English"],
};

const experiencesData = [
  { year: "2024/05 - PRESENT", company: "Online Works", position: "Freelance Graphic Designer" },
  { year: "2025/01 - 2025/10", company: "Greystone College", position: "Front-End Development Certificate Program" },
  { year: "2018/08 - 2024/04", company: "薰衣草森林股份有限公司", position: "資深品牌設計師" },
  { year: "2020", company: "APD 亞太設計年鑑", position: "入選 第十六屆" },
  { year: "2016/08 - 2018/03", company: "加聯達股份有限公司", position: "視覺 / 產品設計師" },
  { year: "2016", company: "金點概念設計獎", position: "受邀參加" },
  { year: "2012/09 - 2016/06", company: "朝陽科技大學 工業設計學系", position: "學士學位" },
];

const AboutPage = () => {
  const folderRefs = useRef([]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const folderEnterPositions = [0, 1200, 2400];
    const folderDurations = [800, 800, 800];
    const slideUpDistance = 600;

    const onScroll = () => {
      const scroll = lenis.scroll;
  
      folderRefs.current.forEach((folder, i) => {
          if (!folder) return;
  
          let progress = (scroll - folderEnterPositions[i]) / folderDurations[i];
          progress = Math.min(Math.max(progress, 0), 1);
  
          // 確保位置固定且中心點在 50%/50%
          folder.style.position = 'fixed';
          folder.style.left = '50%';
          folder.style.top = '50%';
  
          // --- 核心邏輯：實現居中堆疊和進入動畫 ---
          const initialYOffset = 100; // 初始時的額外 Y 軸偏移 (用於進入動畫)
          const stackOffset = i * 30; // 每個 folder 的堆疊偏移量
          
          // 1. 進入動畫：讓 folder 從上方滑入
          // currentYOffset 隨著 progress 從 initialYOffset (100) 減少到 0
          const currentYOffset = initialYOffset * (1 - progress); 
          
          // 2. 堆疊效果：讓 folder 在進入後維持堆疊偏移 (stackOffset)
          // stackDisplacement 隨著 progress 從 0 增加到 stackOffset (i*30)
          const stackDisplacement = stackOffset * progress; 
          
          // 最終的 translate Y 軸：
          // calc(-50%              // 垂直居中
          //        + ${currentYOffset}px // 進入時的額外偏移 (讓它從上方進入)
          //        - ${stackDisplacement}px) // 最終的堆疊偏移 (讓它往上堆)
          
          folder.style.transform = `translate(-50%, calc(-50% + ${currentYOffset}px - ${stackDisplacement}px))`;
          
          folder.style.opacity = progress;
          folder.style.zIndex = 10 + i;
      });
  
      // --- 滑出 (Slide Up) 邏輯 ---
      const lastProgress = (scroll - folderEnterPositions[2] - folderDurations[2]) / 600;
      if (lastProgress > 0) {
          folderRefs.current.forEach((folder, i) => {
              // 滑出時，我們讓 folder 從其最終的堆疊居中位置 calc(-50% - i*30px) 開始向上移動
              
              // 最終的 translate Y 軸：
              // calc(-50%                 // 垂直居中
              //        - ${i * 30}px       // 堆疊偏移
              //        - ${slideUpDistance * lastProgress}px) // 向上滑出距離
              folder.style.transform = `translate(-50%, calc(-50% - ${i * 30}px - ${slideUpDistance * lastProgress}px))`;
          });
      }
  };

    lenis.on("scroll", onScroll);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const renderMultiLine = (text) =>
    text.split("\n").map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>);

  const folderKeys = ["profile", "skills", "experiences"];

  return (
    <div className="about-page">
      <HeaderMenu />

      {/* About Info 區塊 */}
      <section className="about-page-container">
        <h1 className="about-page-label">( About ) me</h1>
        <p className="about-page-subtitle">
          專注於品牌設計和網頁設計的細節設計師，對跨領域元素轉化為數位體驗有著濃厚的興趣。
        </p>
        <div className="scroll-down-indicator" />
      </section>

      {/* Folder Stack 區塊 */}
      <section className="folder-stack-container-wrapper">
        <div className="folder-stack-container">
          {folderKeys.map((key, idx) => (
            <div
              key={key}
              ref={(el) => (folderRefs.current[idx] = el)}
              className={`folder folder-key-${key}`}
            >
              {key === "profile" && (
                <div className="folder-threeParts">
                  <div className="profile-description">
                    <p className="pro-des-zh">
                      來自台灣的視覺&網站設計師 瑋儒。
                      <br /><br />
                      台灣 朝陽科技大學工業設計系，學士學位。加拿大 Greystone College前端開發專業，結業證書。
                      <br /><br />
                      專注於平面設計、網站設計與數位媒體領域，累積了豐富的實務經驗。
                    </p>
                    <p className="pro-des-en">
                      WeiRu is a Visual and Web Designer from Taiwan.
                      <br /><br />
                      Holds a Bachelor's degree in Industrial Design from Chaoyang University of Technology and a
                      certificate in Front-End Development from Greystone College, Canada.
                    </p>
                  </div>
                  <div className="profile-photo">
                    <img src="/src/assets/profile/profile-photo-wei.jpg" alt="profile photo" />
                  </div>
                </div>
              )}

              {key === "skills" && (
                <div className="skills-grid-container">
                  <div className="skills-header skillests-header">SKILLESTS</div>
                  <div className="skills-header softwares-header">SOFTWARES</div>
                  <div className="skillests-single-cell">
                    {skillsData.skillests.map((pair, index) => (
                      <React.Fragment key={index}>
                        <span className="skill-number">{pair[0]}</span>&nbsp;&nbsp;&nbsp;
                        <span className="skill-description">{pair[1]}</span>
                        {index < skillsData.skillests.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="softwares-languages-area">
                    {skillsData.softwares.map((row, rIdx) =>
                      row.map((cell, cIdx) => (
                        <div className="software-cell" key={`sw-${rIdx}-${cIdx}`}>{cell}</div>
                      ))
                    )}
                    <div className="languages-header">LANGUAGES</div>
                    <div className="languages-cell">{skillsData.languages[0]}</div>
                  </div>
                </div>
              )}

              {key === "experiences" && (
                <div className="experiences-container">
                  {experiencesData.map((exp, i) => (
                    <div className="experience-card" key={i}>
                      <div className="row-cell year">{renderMultiLine(exp.year)}</div>
                      <div className="row-cell company">{renderMultiLine(exp.company)}</div>
                      <div className="row-cell position">{renderMultiLine(exp.position)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
