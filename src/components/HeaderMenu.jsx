import React, { useState, useEffect, forwardRef } from "react";
import "./HeaderMenu.css";
import { Link, useNavigate } from "react-router-dom";

// 使用 forwardRef 讓 HeaderMenu 可以接收父組件傳入的 ref
const HeaderMenu = forwardRef((props, ref) => {
  const navigate = useNavigate();
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
        !e.target.closest(".close-btn") &&
        !e.target.closest(".logo")
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

  // Logo 點擊回首頁
  const handleLogoClick = () => {
    navigate("/"); // 導向首頁
  };

  return (
    <header className={`header ${atFooter ? "at-footer" : ""}`} ref={ref}>
      
      {/* Logo */}
      {!showBottomMenu && !atFooter && (
        <div className="logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
          WW Studio
        </div>
      )}

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
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
});

export default HeaderMenu;
