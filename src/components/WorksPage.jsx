import React, { useState, useRef, useEffect } from 'react';
import './WorksPage.css';
import HeaderMenu from "./HeaderMenu"; 
import Footer from "./Footer";
import { Link } from 'react-router-dom';
import { projectData } from '../data/Projects'; 

const WorksPage = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const itemsPerPage = 6;

  const leftRef = useRef(null);
  const footerRef = useRef(null);
  const galleryRefs = useRef([]);

  // ---------- 更新過濾 ----------
  useEffect(() => {
    let filtered = [];
    if (activeFilter === 'All') {
      filtered = projectData;
    } else {
      filtered = projectData.filter(
        project =>
          project.category &&
          project.category.toLowerCase() === activeFilter.toLowerCase()
      );
    }

    setFilteredProjects(filtered);
    setCurrentPage(1);          // 切換篩選時回到第1頁
    setExpandedId(null);         // 清除展開作品
    galleryRefs.current = [];    // 清空 refs 避免動畫重疊
  }, [activeFilter]);

  // ---------- 當前頁作品 ----------
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

  // ---------- 切換頁數 ----------
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setExpandedId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    galleryRefs.current = []; // 清空 refs 避免動畫重疊
  };

  // ---------- 左側 fixed → footer 推走 ----------
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
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [filteredProjects]);

  // ---------- 作品淡入 ----------
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
      { threshold: 0.2 }
    );

    galleryRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, [currentProjects]);

  // ---------- 切換篩選 ----------
  const handleFilterChange = (type) => {
    setActiveFilter(type);
  };

  return (
    <div className="works-page-wrapper">
      <HeaderMenu />

      <main className="works-main-content">
        {/* ---------- 左側 ---------- */}
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

        {/* ---------- 右側 ---------- */}
        <section className="works-right-section">
          <div className="accordion-gallery">
            {currentProjects.map((project, idx) => (
              <Link
                key={project.id + '-' + currentPage} // 避免重複 key
                to={`/works/${project.id}`}
                ref={(el) => (galleryRefs.current[idx] = el)}
                className="gallery-item"
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

          {/* ---------- 分頁 (右側底部) ---------- */}
          {totalPages > 1 && (
            <div className="pagination-container right-pagination">
              <div className="pagination-numbers">
                {currentPage > 1 && (
                  <span className="page-arrow prev" onClick={() => handlePageChange(currentPage - 1)}>
                    &lt;
                  </span>
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
                  <span className="page-arrow next" onClick={() => handlePageChange(currentPage + 1)}>
                    &gt;
                  </span>
                )}
              </div>
            </div>
          )}
        </section>
      </main>

      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default WorksPage;
