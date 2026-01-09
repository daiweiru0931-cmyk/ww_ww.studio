import React from 'react';
import './WorksDetail.css';
import HeaderMenu from "./HeaderMenu"; 
import Footer from "./Footer";
import { useParams, useNavigate } from 'react-router-dom';
import { projectData } from '../data/Projects';

const WorksDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projectData.find(item => item.id === id);

  if (!project) {
    return <div>Project not found</div>;
  }

  const { info } = project;

  // 🔹 通用輸出 function（支援字串 or 陣列）
  const renderInfoItem = (label, value) => {
    if (!value) return null;

    const content = Array.isArray(value)
      ? value.join(', ')
      : value;

    return (
      <li>
        <span>{label} | </span>
        {content}
      </li>
    );
  };

  return (
    <div className="works-detail-wrapper">
      <HeaderMenu />

      <div className="project-main-content">
        {/* 左側 */}
        <div className="project-left">
          <div className="tags">
            {project.tags.map(tag => (
              <span key={tag} className="tag-btn">{tag}</span>
            ))}
          </div>
          <h1 className="project-title">{project.title}</h1>
        </div>

        {/* 右側資訊欄 */}
        <div className="project-right">
          <ul className="info-list">
            {renderInfoItem('Year', info?.year)}
            {renderInfoItem('Production', info?.production)}
            {renderInfoItem('Project Planning', info?.planning)}
            {renderInfoItem('Art Director', info?.artDirector)}
            {renderInfoItem('Visual Design', info?.visualDesign)}
            {renderInfoItem('Photography', info?.photography)}
          </ul>
        </div>
      </div>

      {/* 作品圖片 */}
      <main className="detail-gallery">
        {project.detailImages.map((img, index) => (
          <div key={index} className="detail-image-box">
            <img
              src={img}
              alt={`${project.title} - ${index + 1}`}
            />
          </div>
        ))}
      </main>

      {/* 返回 */}
      <div className="detail-footer">
        <button
          className="back-btn"
          onClick={() => navigate('/works')}
        >
          ← BACK TO WORKS
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default WorksDetail;
