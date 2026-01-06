import React, { useState, useRef, useEffect } from 'react';
import './WorksDetail.css';
import HeaderMenu from "./HeaderMenu"; 
import Footer from "./Footer";
import { useParams, useNavigate } from 'react-router-dom';
import { projectData } from '../data/Projects';

const WorksDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 尋找資料
  const project = projectData.find(item => item.id === id);

  if (!project) return <div>Project not found</div>;

  return (
    <div className="works-detail-wrapper">
      <HeaderMenu />
      
      <div className="project-main-content">
        <div className="project-left">
          <div className="tags">
            {project.tags.map(tag => <span key={tag} className="tag-btn">{tag}</span>)}
          </div>
          <h1 className="project-title">{project.title}</h1>
        </div>

        {/* 右側資訊欄 */}
        <div className="project-right">
          <ul className="info-list">
            <li><span>Year | </span>{project.info.year}</li>
            <li><span>Production | </span>{project.info.production}</li>
            <li><span>Project Planning | </span>{project.info.planning}</li>
            <li><span>Art Director | </span>{project.info.artDirector}</li>
            <li><span>Visual Design | </span>{project.info.visualDesign}</li>
          </ul>
        </div>
      </div>

      {/* 作品大圖列表 */}
      <main className="detail-gallery">
        {project.detailImages.map((img, index) => (
          <div key={index} className="detail-image-box">
            <img src={img} alt={`${project.title} - ${index}`} />
          </div>
        ))}
      </main>

      {/* 返回按鈕 (選配) */}
      <div className="detail-footer">
        <button className="back-btn" onClick={() => navigate('/works')}>← BACK TO WORKS</button>
      </div>

      <Footer />

    </div>
  );
};

export default WorksDetail;
