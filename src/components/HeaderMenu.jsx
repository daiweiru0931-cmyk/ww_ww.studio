import React, { useState, useEffect } from "react";
import "./HeaderMenu.css";

const HeaderMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBottomMenu, setShowBottomMenu] = useState(false);
  const [atFooter, setAtFooter] = useState(false);

  // 點擊空白區關閉選單
  useEffect(() => {
    const handleOutsideClick = (e) => {
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
      const isAtFooter = scrollY + windowHeight >= docHeight - 150;
      setAtFooter(isAtFooter);
      setShowBottomMenu(scrollY > 100 && !isAtFooter);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${atFooter ? "at-footer" : ""}`}>
      {/* Logo */}
      {!showBottomMenu && !atFooter && <div className="logo">WW Studio</div>}

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

      {/* 底部置中按鈕 */}
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
          <li>About</li>
          <li>Works</li>
          <li>Service</li>
          <li>Taste</li>
        </ul>

        {/* X 關閉按鈕 */}
        <button
          className={`close-btn ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default HeaderMenu;
