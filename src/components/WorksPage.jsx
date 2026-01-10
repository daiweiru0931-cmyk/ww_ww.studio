import React, { useState, useRef, useEffect } from 'react';
import './WorksPage.css';
import HeaderMenu from "./HeaderMenu"; 
import Footer from "./Footer";
import { Link, useSearchParams } from 'react-router-dom'; // 🔹 改用 useSearchParams
import { projectData } from '../data/Projects'; 

const WorksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // 從網址取得參數，若無則預設為 1 和 'All'
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const activeFilter = searchParams.get('filter') || 'All';

  const [expandedId, setExpandedId] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const itemsPerPage = 6;

  const leftRef = useRef(null);
  const footerRef = useRef(null);
  const galleryRefs = useRef([]);

  // ---------- 過濾列表 ----------
  useEffect(() => {
    let filtered = [];
    if (activeFilter === 'All') {
      filtered = projectData;
    } else {
      filtered = projectData.filter(project => {
        if (!project.category) return false;
        if (Array.isArray(project.category)) {
          return project.category.some(cat => cat.toLowerCase() === activeFilter.toLowerCase());
        }
        return project.category.toLowerCase() === activeFilter.toLowerCase();
      });
    }
    setFilteredProjects(filtered);
    setExpandedId(null);
    galleryRefs.current = [];
  }, [activeFilter]);

  // ---------- 當前頁作品計算 ----------
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

  // ---------- 切換頁數 (更新網址) ----------
  const handlePageChange = (pageNumber) => {
    setSearchParams({ filter: activeFilter, page: pageNumber }); // 更新網址參數
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ---------- 手動切換篩選分類 (更新網址) ----------
  const handleFilterChange = (type) => {
    setSearchParams({ filter: type, page: 1 }); // 切換分類時重置頁碼為 1 並更新網址
  };

  // ---------- 左側固定邏輯 ----------
  useEffect(() => {
    const leftEl = leftRef.current;
    const footerEl = footerRef.current;
    if (!leftEl || !footerEl) return;
    let isReleased = false;
    const onScroll = () => {
      const footerTop = footerEl.getBoundingClientRect().top;
      const vh = window.innerHeight;
      if (footerTop <= vh && !isReleased) {
        const leftRect = leftEl.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        leftEl.style.position = 'absolute';
        leftEl.style.top = `${scrollY + leftRect.top}px`;
        leftEl.style.transform = 'none';
        isReleased = true;
      }
      if (footerTop > vh && isReleased) {
        leftEl.style.position = 'fixed';
        leftEl.style.top = '50%';
        leftEl.style.transform = 'translateY(-50%)';
        isReleased = false;
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [filteredProjects]);

  // ---------- 作品淡入動畫 ----------
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    galleryRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, [currentProjects]);

  return (
    <div className="works-page-wrapper">
      <HeaderMenu />
      <main className="works-main-content">
        <section className="works-left-section" ref={leftRef}>
          <div className="left-content-inner">
            <h1 className="works-title">( Works )</h1>
            <div className="filter-buttons">
              {['All', 'Graphic', 'Web'].map((type) => (
                <button
                  key={type}
                  className={`filter-btn ${activeFilter === type ? 'active' : ''}`}
                  onClick={() => handleFilterChange(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="works-right-section">
          <div className="accordion-gallery">
            {currentProjects.map((project, idx) => (
              <Link
                key={project.id}
                to={`/works/${project.id}`}
                ref={(el) => (galleryRefs.current[idx] = el)}
                className={`gallery-item ${expandedId === project.id ? 'is-expanded' : ''}`}
                onMouseEnter={() => setExpandedId(project.id)}
                onMouseLeave={() => setExpandedId(null)}
              >
                <div className="item-content">
                  <img src={project.imageUrl} alt={project.title} />
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>VIEW DETAIL</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination-container right-pagination">
              <div className="pagination-numbers">
                {currentPage > 1 && (
                  <span className="page-arrow prev" onClick={() => handlePageChange(currentPage - 1)}> &lt; </span>
                )}
                {[...Array(totalPages)].map((_, i) => (
                  <span
                    key={i}
                    className={`page-num ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                ))}
                {currentPage < totalPages && (
                  <span className="page-arrow next" onClick={() => handlePageChange(currentPage + 1)}> &gt; </span>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
      <div ref={footerRef}><Footer /></div>
    </div>
  );
};

export default WorksPage;