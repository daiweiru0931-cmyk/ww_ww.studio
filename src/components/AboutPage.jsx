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
            <span className="text-index">' 0{activeIndex + 1}</span>
            <h2 className="text-title">{contentData[activeIndex].label}</h2>
            <p className="text-en">{contentData[activeIndex].en}</p>
          </div>

          <div className="card-stage">
            <CardSwap
              delay={5000}
              cardDistance={40}
              verticalDistance={30}
              onCardChange={setActiveIndex}
            >
              <Card><div className="card-inner why">WHY</div></Card>
              <Card><div className="card-inner how">HOW</div></Card>
              <Card><div className="card-inner what">WHAT</div></Card>
            </CardSwap>
          </div>

        </div>
      </section>

      <section className="exp-section">
        <div className="exp">
          <h1>my exp</h1>
        </div>
      </section>

      <Footer />

    </div>
  );
};

export default AboutPage;
