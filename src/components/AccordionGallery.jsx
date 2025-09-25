import React, { useState } from 'react';
import './AccordionGallery.css'; 
import Img01 from '../assets/works/works-img01.jpg';
import Img02 from '../assets/works/works-img02.jpg';
import Img03 from '../assets/works/works-img03.jpg';
import Img04 from '../assets/works/works-img04.jpg';
import Img05 from '../assets/works/works-img05.jpg';

const projectData = [
  { id: 1, title: 'Project One', detailUrl: '/works/project-one', imageUrl: Img01 },
  { id: 2, title: 'Project Two', detailUrl: '/works/project-two', imageUrl: Img02 },
  { id: 3, title: 'Project Three', detailUrl: '/works/project-three', imageUrl: Img03 },
  { id: 4, title: 'Project Four', detailUrl: '/works/project-four', imageUrl: Img04 },
  { id: 5, title: 'Project Five', detailUrl: '/works/project-five', imageUrl: Img05 },
];

const AccordionGallery = () => {
  // 預設展開第一個項目 (id: 1)
  const [expandedId, setExpandedId] = useState(1);

  return (
    <div className="accordion-gallery">
      {projectData.map((project) => {
        const isExpanded = project.id === expandedId;

        return (
          <a
            key={project.id}
            href={project.detailUrl}
            className={`gallery-item ${isExpanded ? 'is-expanded' : ''}`}
            onMouseEnter={() => setExpandedId(project.id)}
          >
            <div className="item-content">
              <img src={project.imageUrl} alt={project.title} />
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>點擊查看詳細介紹</p>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default AccordionGallery;
