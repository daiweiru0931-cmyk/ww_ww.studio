import React from 'react';
import './WorksDetail.css';
import HeaderMenu from "./HeaderMenu"; 
import Footer from "./Footer";
import { useParams, useNavigate } from 'react-router-dom';
import { projectData } from '../data/Projects';

const WorksDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 根據 ID 尋找對應作品
  const project = projectData.find(item => item.id === id);

  // 如果找不到作品，顯示錯誤提示
  if (!project) {
    return (
      <div className="works-detail-wrapper">
        <HeaderMenu />
        <div style={{ padding: '100px', textAlign: 'center' }}>
          <h2>Project not found</h2>
          <button onClick={() => navigate('/works')}>Back to Gallery</button>
        </div>
        <Footer />
      </div>
    );
  }

  const { info } = project;

  // function（支援字串 or 陣列）
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
        {/* 左側標籤與標題 */}
        <div className="project-left">
          <div className="tags">
            {/* 確保 tags 是陣列才執行 map */}
            {Array.isArray(project.tags) ? (
              project.tags.map((tag) => (
                <span key={tag} className="tag-btn">{tag}</span>
              ))
            ) : (
              // 如果 tags 是單一字串，直接顯示
              project.tags && <span className="tag-btn">{project.tags}</span>
            )}
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
            {renderInfoItem('Illustration', info?.illustration)}
            {renderInfoItem('Environmental Display Design', info?.environmentaldisplayDesign)}
            {renderInfoItem('Photography', info?.photography)}
            {renderInfoItem('Printing', info?.printing)}
          </ul>
        </div>
      </div>

      {/* 作品圖片列表 */}
      <main className="detail-gallery">
        {project.detailImages && project.detailImages.map((img, index) => (
          <div key={index} className="detail-image-box">
            <img
              src={img}
              alt={`${project.title} - ${index + 1}`}
            />
          </div>
        ))}
      </main>

      {/* 返回按鈕：改為回到瀏覽器上一頁狀態 */}
      <div className="detail-footer">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← BACK TO WORKS
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default WorksDetail;