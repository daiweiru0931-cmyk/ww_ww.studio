import React, { useState, useEffect } from "react";
import icon from "../assets/wei-info-icon.png";

const InfoBox = () => {
  const texts = [
    "Hi! I am WeiRu.",
    "Visual & Website creative designer.",
    "Based in Taiwan.",
    "Transforming ideas into digital logic.",
    "Welcome to my portfolio."
  ];

  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  // 新增：控制懸浮視窗的開關
  const [isIntroOpen, setIsIntroOpen] = useState(false);

  useEffect(() => {
    // 如果視窗展開，則暫停打字效果
    if (isIntroOpen) return; 

    const currentText = texts[textIndex];
    let timer;

    if (!isDeleting && charIndex < currentText.length) {
      timer = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 100);
    } else if (isDeleting && charIndex > 0) {
      timer = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 50);
    } else if (!isDeleting && charIndex === currentText.length) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, texts, isIntroOpen]);
  
  // 處理按鈕點擊：切換視窗開關
  const handleToggleIntro = () => {
    setIsIntroOpen((prev) => !prev);
  };

  return (
    // 外層容器：給它 position: relative，讓懸浮視窗可以在其下方定位
    <div className="info-box-container"> 
        <div className="info-box">
            <div className="info-left">
                <img
                    src={icon}
                    alt="WW icon"
                    className="info-icon"
                    style={{
                        width: "20px",
                        height: "20px"
                    }}
                />
                {/* 展開時，這裡的文字最好停止打字或顯示固定文字 */}
                <span className="info-text">{isIntroOpen ? "Welcome to my portfolio" : displayText}</span>
            </div>
            {/* 點擊按鈕時切換狀態 */}
            <button className="info-btn" onClick={handleToggleIntro}>
                {isIntroOpen ? "－" : "＋"}
            </button>
        </div>

        {/* 懸浮視窗 (僅在 isIntroOpen 為 true 時渲染) */}
        {isIntroOpen && (
            // 懸浮視窗本體：給它 position: absolute; top: 100%; 來讓它從 info-box 下方出現
            <div className="dropdown-intro-modal"> 
                
                {/* 視窗頂部: 標題與控制按鈕 */}
                <div className="modal-header-controls">
                <span className="modal-title-text">Hi! I'm WeiRu</span>
                </div>

                {/* 視窗內容: 你的個人介紹 */}
                <div className="modal-body-content">  
                  <p>A visual and website creative designer based in Taiwan.
                      I work on transforming ideas into clear digital logic and thoughtful visual experiences.
                  </p>
                </div>
            </div>
        )}
    </div>
  );
};

export default InfoBox;