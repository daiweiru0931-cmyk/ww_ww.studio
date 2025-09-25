import React, { useState, useEffect } from "react";
import icon from "../assets/wei-info-icon.png";

const InfoBox = () => {
  const texts = [
    "Hi! I am WeiRu.",
    "Visual & Website creative designer, based in Taiwan.",
    "Transforming ideas into digital logic.",
    "Welcome to my portfolio."
  ];

  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // 打字效果
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

  return (
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
        <span className="info-text">{displayText}</span>
      </div>
      <button className="info-btn">＋</button>
    </div>
  );
};

export default InfoBox;
