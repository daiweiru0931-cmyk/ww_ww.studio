import React, { useState, useEffect } from "react";

const InfoBox = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // 多段文字
  const texts = [
    "Designer, based in Tokyo.",
    "Visual & website creative developer.",
    "Transforming ideas into digital logic."
  ];

  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0); // 哪一段文字
  const [charIndex, setCharIndex] = useState(0); // 打到第幾個字
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
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
  }, [charIndex, isDeleting, textIndex, texts]);

  // 滑鼠移動效果 (logo 跟隨)
  const handleMouseMove = (e) => {
    const { offsetX, offsetY, currentTarget } = e.nativeEvent;
    const { clientWidth, clientHeight } = currentTarget;
    const x = (offsetX / clientWidth - 0.5) * 20;
    const y = (offsetY / clientHeight - 0.5) * 20;
    setPos({ x, y });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <div
      className="info-box"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="info-left">
        <img
          src="/images/logo.png"
          alt="WW logo"
          className="info-logo"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
        <span className="info-text">{displayText}</span>
      </div>
      <button className="info-btn">＋</button>
    </div>
  );
};

export default InfoBox;
