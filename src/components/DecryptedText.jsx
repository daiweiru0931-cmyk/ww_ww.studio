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
  speed = 50,
  maxIterations = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  encryptedClassName = '',
  parentClassName = '',
}) {
  const containerRef = useRef(null);
  const [displayTextArr, setDisplayTextArr] = useState(texts.map(t => t.text));
  const [revealedIndicesArr, setRevealedIndicesArr] = useState(texts.map(() => new Set()));
  const [hasAnimated, setHasAnimated] = useState(false);
  const [fontSizes, setFontSizes] = useState(texts.map(t => (t.className.includes('h1-text') ? 36 : 24)));

  // 依螢幕寬度設定字體，避免手機跳動
  useEffect(() => {
    const updateFontSizes = () => {
      const width = window.innerWidth;
      setFontSizes(
        texts.map(t => {
          if (t.className.includes('h1-text')) {
            // 桌機: max 48, 手機: min 24
            return Math.max(30, Math.min(48, Math.floor(width * 0.04)));
          } else if (t.className.includes('p-text')) {
            return Math.max(14, Math.min(22, Math.floor(width * 0.02)));
          } else {
            return Math.max(12, Math.min(20, Math.floor(width * 0.015)));
          }
        })
      );
    };
    updateFontSizes();
    window.addEventListener('resize', updateFontSizes);
    return () => window.removeEventListener('resize', updateFontSizes);
  }, [texts]);

  const shuffleText = (originalText, revealedSet) => {
    const availableChars = characters.split('');
    return originalText
      .split('')
      .map((char, i) => {
        if (char === ' ' || revealedSet.has(i)) return char;
        return availableChars[Math.floor(Math.random() * availableChars.length)];
      })
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
  }, [hasAnimated, texts]);

  return (
    <motion.div
      className={parentClassName}
      ref={containerRef}
      style={{
        display: 'inline-block',
        minHeight: '4rem', // 最小高度避免亂碼跳動
      }}
    >
      {texts.map((t, idx) => (
        <span
          key={idx}
          style={{
            display: 'block',
            fontSize: fontSizes[idx],
            lineHeight: 1.2, // 固定行高避免跳動
            minHeight: fontSizes[idx] * 1.2, // 高度隨字體調整
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
                    minWidth: '0.5ch',
                    fontVariantNumeric: 'tabular-nums',
                    lineHeight: 1.2, // 固定行高
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
