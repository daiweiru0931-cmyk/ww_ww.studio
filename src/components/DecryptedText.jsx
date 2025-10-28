import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const styles = {
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    border: 0
  }
};

export default function DecryptedText({
  texts = [],
  maxIterations = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  encryptedClassName = '',
  parentClassName = '',
}) {
  const containerRef = useRef(null);
  const [displayTextArr, setDisplayTextArr] = useState(texts.map(t => t.text));
  const [revealedIndicesArr, setRevealedIndicesArr] = useState(texts.map(() => new Set()));
  const [hasAnimated, setHasAnimated] = useState(false);
  const [fontSizes, setFontSizes] = useState([]);
  const [speed, setSpeed] = useState(50);

  // 計算響應式字體與動畫速度
  useEffect(() => {
    const updateResponsive = () => {
      const width = window.innerWidth;
      // 字體
      setFontSizes(
        texts.map(t => {
          if (t.className.includes('h1-text')) {
            return Math.max(20, Math.min(48, Math.floor(width * 0.05))); // clamp 16~48px
          } else if (t.className.includes('p-text')) {
            return Math.max(10, Math.min(24, Math.floor(width * 0.02))); // clamp 10~24px
          } else {
            return Math.max(12, Math.min(20, Math.floor(width * 0.025)));
          }
        })
      );
      // 動畫速度 (ms)
      if (width <= 480) setSpeed(30);       // 手機較快
      else if (width <= 768) setSpeed(40);  // 平板中速
      else setSpeed(50);                     // 桌機較慢
    };

    updateResponsive();
    window.addEventListener('resize', updateResponsive);
    return () => window.removeEventListener('resize', updateResponsive);
  }, [texts]);

  const shuffleText = (originalText, revealedSet) => {
    const availableChars = characters.split('');
    return originalText
      .split('')
      .map((char, i) => (char === ' ' || revealedSet.has(i) ? char : availableChars[Math.floor(Math.random() * availableChars.length)]))
      .join('');
  };

  const animateText = (textIndex, onComplete) => {
    const text = texts[textIndex].text;
    const revealedSet = new Set();
    let iteration = 0;

    const interval = setInterval(() => {
      const nextIndex = revealedSet.size;
      if (nextIndex < text.length) {
        revealedSet.add(nextIndex);
        setRevealedIndicesArr(prev => {
          const newArr = [...prev];
          newArr[textIndex] = new Set(revealedSet);
          return newArr;
        });
        setDisplayTextArr(prev => {
          const newArr = [...prev];
          newArr[textIndex] = shuffleText(text, revealedSet);
          return newArr;
        });
      } else {
        clearInterval(interval);
        setDisplayTextArr(prev => {
          const newArr = [...prev];
          newArr[textIndex] = text;
          return newArr;
        });
        if (onComplete) onComplete();
      }
      iteration++;
      if (iteration > maxIterations * text.length) clearInterval(interval);
    }, speed);
  };

  // IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) setHasAnimated(true);
        });
      },
      { threshold: 0.1 }
    );
    const current = containerRef.current;
    if (current) observer.observe(current);
    return () => current && observer.unobserve(current);
  }, [hasAnimated]);

  // 播放序列
  useEffect(() => {
    if (!hasAnimated) return;
    let timeout;
    const playSequence = () => {
      setRevealedIndicesArr(texts.map(() => new Set()));
      setDisplayTextArr(texts.map(t => t.text));

      animateText(0, () => {
        if (texts.length > 1) {
          timeout = setTimeout(() => {
            animateText(1, () => {
              timeout = setTimeout(playSequence, 10000);
            });
          }, 300);
        } else {
          timeout = setTimeout(playSequence, 10000);
        }
      });
    };
    playSequence();
    return () => clearTimeout(timeout);
  }, [hasAnimated, texts, speed]);

  return (
    <motion.div className={parentClassName} ref={containerRef} style={{ display: 'inline-block' }}>
      {texts.map((t, idx) => (
        <span
          key={idx}
          style={{
            display: 'block',
            fontSize: fontSizes[idx],
            lineHeight: 1.2,
            overflow: 'hidden',
          }}
        >
          <span style={styles.srOnly}>{displayTextArr[idx]}</span>
          <span aria-hidden="true">
            {displayTextArr[idx].split('').map((char, i) => {
              const revealed = revealedIndicesArr[idx]?.has(i);
              return (
                <span
                  key={i}
                  className={revealed ? t.className : `${t.className} ${encryptedClassName}`}
                  style={{
                    display: 'inline-block',
                    minWidth: '0.55ch',
                    fontVariantNumeric: 'tabular-nums'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </span>
        </span>
      ))}
    </motion.div>
  );
}
