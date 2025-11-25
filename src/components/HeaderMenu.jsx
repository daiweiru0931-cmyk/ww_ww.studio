// HeaderMenu.jsx - 完整且可接收 Ref 的版本

import React, { useState, useEffect, forwardRef } from "react";
import "./HeaderMenu.css";
import { Link } from 'react-router-dom';

// 使用 forwardRef 讓 HeaderMenu 可以接收來自父組件的 ref
const HeaderMenu = forwardRef((props, ref) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBottomMenu, setShowBottomMenu] = useState(false);
  const [atFooter, setAtFooter] = useState(false);

  // 點擊空白區關閉選單
  useEffect(() => {
    const handleOutsideClick = (e) => {
      // 確保點擊事件發生在這些元素之外時才關閉選單
      if (
        !e.target.closest(".side-menu") &&
        !e.target.closest(".menu-icon") &&
        !e.target.closest(".menu-btn") &&
        !e.target.closest(".contact-inside-btn") &&
        !e.target.closest(".close-btn")
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // 滾動控制底部按鈕顯示
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;
      
      // 判斷是否接近頁面底部 (例如底部 150px)
      const isAtFooter = scrollY + windowHeight >= docHeight - 150;
      
      setAtFooter(isAtFooter);
      // 滾動超過 100px 且不在底部時，顯示底部選單
      setShowBottomMenu(scrollY > 100 && !isAtFooter);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // ⭐️ 將 ref 綁定到最外層的 header 元素上 ⭐️
    <header className={`header ${atFooter ? "at-footer" : ""}`} ref={ref}>
      {/* Logo */}
      {!showBottomMenu && !atFooter && <Link to="/" className="logo">WW Studio</Link>}

      {/* 右上角按鈕 */}
      {!showBottomMenu && !atFooter && (
        <div className="header-right">
          <button className="contact-btn">CONTACT</button>
          <button
            className={`menu-icon ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      )}

      {/* 底部置中按鈕 (滾動後出現) */}
      <div className={`bottom-buttons ${showBottomMenu ? "visible" : ""}`}>
        <button
          className={`menu-btn ${showBottomMenu ? "expanded" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
        >
          <div className="menu-icon-small">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="menu-label">MENU</span>

          <div
            className="contact-inside-btn"
            onClick={(e) => {
              e.stopPropagation();
              alert("CONTACT clicked!");
            }}
          >
            CONTACT
          </div>
        </button>
      </div>

      {/* 半屏下滑選單 */}
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <ul className="side-menu-list">
          <Link to="/about" className="menu-about-li" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/works" className="menu-works-li" onClick={() => setMenuOpen(false)}>Works</Link>
          <Link to="/service" className="menu-service-li" onClick={() => setMenuOpen(false)}>Service</Link>
          <Link to="/taste" className="menu-taste-li" onClick={() => setMenuOpen(false)}>Taste</Link>
        </ul>

        {/* X 關閉按鈕 */}
        <button
          className={`close-btn ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          {/* 替換為 X 符號的 Span */}
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
});

export default HeaderMenu;