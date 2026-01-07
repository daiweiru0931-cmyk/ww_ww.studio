import React, { useRef, useEffect, useState } from 'react';
import './AboutPage.css';
import HeaderMenu from "./HeaderMenu"; 
import Footer from "./Footer";
import CardSwap, { Card } from './CardSwap';

const AboutPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollIndicatorRef = useRef(null);

  const contentData = [
    { label: "WHY I DESIGN",  en: "I love transforming stories into visual experiences." },
    { label: "HOW I SOLVE PROBLEMS",  en: "I refine brand personality into clear visual direction." },
    { label: "WHAT",  en: "I focus on integrating branding with web design." }
  ];

  useEffect(() => {
    const onScroll = () => {
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.opacity =
          window.scrollY > 40 ? 0 : 1;
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="about-page">

      <HeaderMenu />

      <section className="about-hero">
        <h1 className="about-title">( About ) me</h1>
        <h4 className="about-introduce">Why I design, how I solve problems, and what I focus on.</h4>
        <div ref={scrollIndicatorRef} className="scroll-down-indicator">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

      </section>

      <section className="whw-section">
        <div className="whw-inner">

          <div className="text-content-side">
            <span className="text-index">0{activeIndex + 1}'</span>
            <h2 className="text-title">{contentData[activeIndex].label}</h2>
            <p className="text-en">{contentData[activeIndex].en}</p>
          </div>

          <div className="card-stage">
            <CardSwap
              delay={5000}
              cardDistance={15}
              verticalDistance={20}
              onCardChange={setActiveIndex}
            >
              <Card><div className="card-inner why">WHY</div></Card>
              <Card><div className="card-inner how">HOW</div></Card>
              <Card><div className="card-inner what">WHAT</div></Card>
            </CardSwap>
          </div>

        </div>
      </section>

      <section className="profile-section">
        <div className="profile-wrapper">
          <div className="profile-item-left">
            <span className="profile-label">( Profile )</span>
          </div>
        
          <div className="profile-item-right">
            <div className="profile-connect">
              <p>I am a visual designer from Taiwan with a background in self-learning and professional training across design and digital technologies.
              My work centers on graphic design, web design, and digital media, where I have built strong experience through projects.</p>
              <p>Driven by a passion for visual storytelling, I enjoy blending multiple disciplines and mediums to push creative boundaries and create brand experiences that balance aesthetics with functionality.</p>
            </div>

            <div className="profile-table">
              <div className="table-row">
                <span className="label">NAME</span>
                <span className="value">Wei Ru, Tai</span>
              </div>
              <div className="table-row">
                <span className="label">EXPERIENCE</span>

                <div className="experience-list">

                  <div className="exp-item">
                    <span className="exp-role">Graphic Designer</span>
                    <span className="exp-meta">自由接案 / Taiwan · 2024 – Present</span>
                  </div>

                  <div className="exp-item">
                    <span className="exp-role">Video Editor</span>
                    <span className="exp-meta">EMPOWER BASKETBALL / Canada · 2025 – 2026</span>
                  </div>

                  <div className="exp-item">
                    <span className="exp-role">Brand Designer</span>
                    <span className="exp-meta">薰衣草森林股份有限公司 / Taiwan · 2018 – 2024</span>
                  </div>

                  <div className="exp-item">
                    <span className="exp-role">Graphic Designer</span>
                    <span className="exp-meta">加聯達股份有限公司 / Taiwan · 2016 – 2018</span>
                  </div>

                </div>
              </div>
              
              <div className="table-row">
                <span className="label">EDUCATION</span>

                <div className="education-list">

                  <div className="edu-item">
                    <span className="edu-degree">Front End Development</span>
                    <span className="edu-meta">
                      Greystone College / Canada · 2025
                    </span>
                  </div>

                  <div className="edu-item">
                    <span className="edu-degree">Industrial Design</span>
                    <span className="edu-meta">
                      Chaoyang University / Taiwan · 2016
                    </span>
                  </div>

                </div>
              </div>

              <div className="table-row">
                <span className="label">SKILLS</span>

                <div className="skill-tags">
                  <span>Graphic Design</span>
                  <span>Branding</span>
                  <span>Web Design</span>
                  <span>Illustration</span>
                  <span>Visual Content Planning</span>
                  <span>Taste Profiling</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
};

export default AboutPage;
