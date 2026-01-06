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
  const itemsPerPage = 5;

  const leftRef = useRef(null);
  const footerRef = useRef(null);
  const galleryRefs = useRef([]);

  // ---------- 過濾 ----------
  const filteredProjects =
    activeFilter === 'All'
      ? projectData
      : projectData.filter((project) => project.category === activeFilter);

  // ---------- 分頁 ----------
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

  // ---------- 頁面切換 ----------
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setExpandedId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // ---------- 作品淡入動畫 ----------
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // 只做一次
          }
        });
      },
      { threshold: 0.2 }
    );

    galleryRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentProjects]);

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
                  onClick={() => {
                    setActiveFilter(type);
                    setCurrentPage(1);
                  }}
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
            {currentProjects.map((project, idx) => {
              const isExpanded = project.id === expandedId;

              return (
                <Link
                  key={project.id}
                  to={`/works/${project.id}`}
                  ref={(el) => (galleryRefs.current[idx] = el)}
                  className={`gallery-item ${isExpanded ? 'is-expanded' : ''}`}
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
              );
            })}
          </div>

          {/* ---------- 分頁 ---------- */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <div className="pagination-numbers">
                {currentPage > 1 && (
                  <span
                    className="page-arrow prev"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    &lt;
                  </span>
                )}

                {[...Array(totalPages)].map((_, i) => (
                  <span
                    key={i + 1}
                    className={`page-num ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                ))}

                {currentPage < totalPages && (
                  <span
                    className="page-arrow next"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
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
