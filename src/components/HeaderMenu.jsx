import React, { useState, useEffect, forwardRef } from "react";
import "./HeaderMenu.css";
import { Link } from "react-router-dom";

const HeaderMenu = forwardRef((props, ref) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBottomMenu, setShowBottomMenu] = useState(false);
  const [atFooter, setAtFooter] = useState(false);

  // 點擊空白區關閉選單
  useEffect(() => {
    const handleOutsideClick = (e) => {
      const clickedMenuItems =
        e.target.closest(".side-menu") ||
        e.target.closest(".menu-icon") ||
        e.target.closest(".menu-btn") ||
        e.target.closest(".contact-inside-btn") ||
        e.target.closest(".close-btn");

      if (!clickedMenuItems) setMenuOpen(false);
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // 滾動控制
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const isAtFooter = scrollY + windowHeight >= docHeight - 500;
      setAtFooter(isAtFooter);
      setShowBottomMenu(scrollY > 80 && !isAtFooter);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header ref={ref} className={`header ${atFooter ? "at-footer" : ""}`}>
      {/* Logo */}
      {!showBottomMenu && !atFooter && (
        <Link
          to="/"
          className="logo"
          style={{ cursor: "pointer", textDecoration: "none" }}
          onClick={() => setMenuOpen(false)}
        >
          WW Studio
        </Link>
      )}

      {/* 右上角按鈕 */}
      {!showBottomMenu && !atFooter && (
        <div className="header-right">
          <button className="contact-btn">CONTACT</button>
          <button
            className={`menu-icon ${menuOpen ? "open" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
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
          <div className="contact-inside-btn">CONTACT</div>
        </button>
      </div>

      {/* 選單內容 */}
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <ul className="side-menu-list">
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/works" onClick={() => setMenuOpen(false)}>Works</Link></li>
          <li><Link to="/service" onClick={() => setMenuOpen(false)}>Service</Link></li>
          <li><Link to="/taste" onClick={() => setMenuOpen(false)}>Taste</Link></li>
        </ul>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
});

export default HeaderMenu;