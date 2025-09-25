import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const styles = {
  wrapper: {
    display: 'inline-block',
    whiteSpace: 'pre-wrap'
  },
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

/**
 * texts: [
 *   { text: "WW.creative.studio", className: "h1-text" },
 *   { text: "creative development in visual and web design", className: "p-text" }
 * ]
 */
export default function DecryptedText({
  texts = [],
  speed = 50,
  maxIterations = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+',
  encryptedClassName = '',
  parentClassName = '',
}) {
  const [displayTextArr, setDisplayTextArr] = useState(texts.map(t => t.text));
  const [revealedIndicesArr, setRevealedIndicesArr] = useState(texts.map(() => new Set()));
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  const shuffleText = (originalText, revealedSet) => {
    const availableChars = characters.split('');
    return originalText
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' ';
        if (revealedSet.has(i)) return char;
        return availableChars[Math.floor(Math.random() * availableChars.length)];
      })
      .join('');
  };

  // 主動畫函式
  const animateText = (textIndex, onComplete) => {
    let interval;
    let iteration = 0;
    const text = texts[textIndex].text;
    const revealedSet = new Set();

    interval = setInterval(() => {
      let nextIndex = revealedSet.size;
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
        // 完成後顯示完整文字
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

  // 觀察器：滑動到畫面才播放
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    const current = containerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasAnimated]);

  // 當可播放時，依序播放 texts
  useEffect(() => {
    if (!hasAnimated) return;

    let timeout;

    const playSequence = () => {
      setCurrentTextIndex(0);
      setRevealedIndicesArr(texts.map(() => new Set()));
      setDisplayTextArr(texts.map(t => t.text));

      animateText(0, () => {
        if (texts.length > 1) {
          timeout = setTimeout(() => {
            animateText(1, () => {
              // 10 秒後重新播放
              timeout = setTimeout(playSequence, 10000);
            });
          }, 300); // P 延遲 H1 完成 0.3 秒再開始
        } else {
          timeout = setTimeout(playSequence, 10000);
        }
      });
    };

    playSequence();

    return () => clearTimeout(timeout);
  }, [hasAnimated, texts]);

  return (
    <motion.div className={parentClassName} ref={containerRef} style={{ display: 'inline-block' }}>
      {texts.map((t, idx) => (
        <span key={idx} style={{ display: 'block' }}>
          <span style={styles.srOnly}>{displayTextArr[idx]}</span>
          <span aria-hidden="true">
            {displayTextArr[idx].split('').map((char, i) => {
              const revealed = revealedIndicesArr[idx]?.has(i);
              return (
                <span key={i} className={revealed ? t.className : encryptedClassName}>
                  {char}
                </span>
              );
            })}
          </span>
        </span>
      ))}
    </motion.div>
  );
}
