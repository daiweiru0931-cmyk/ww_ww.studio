import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  speed = 40,
  maxIterations = 10,
  characters = 'abcdefghijklmnopqrstuvwxyz',
  encryptedClassName = '',
  parentClassName = ''
}) {
  const containerRef = useRef(null);
  const [displayTextArr, setDisplayTextArr] = useState(texts.map(t => t.text));
  const [revealedIndicesArr, setRevealedIndicesArr] = useState(texts.map(() => new Set()));
  const [hasAnimated, setHasAnimated] = useState(false);
  const iterationCountRef = useRef(0);

  const shuffleText = useCallback((originalText, revealedSet) => {
    const availableChars = characters.split('');
    return originalText
      .split('')
      .map((char, i) => {
        if (char === ' ' || revealedSet.has(i)) return char;
        if (char === '<' || char === 'b' || char === 'r' || char === '/' || char === '>') return char; 
        return availableChars[Math.floor(Math.random() * availableChars.length)];
      })
      .join('');
  }, [characters]);

  const animateText = useCallback((textIndex, onComplete) => {
    if (textIndex >= texts.length) return; 

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
      if (iteration > maxIterations * text.length + 50) clearInterval(interval); 
    }, speed);
    
    return () => clearInterval(interval);

  }, [texts, maxIterations, speed, shuffleText]);

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

  useEffect(() => {
    if (!hasAnimated) return;

    let timeout;
    const LOOP_DELAY = 5000;
    const LINE_DELAY = 500;

    const startNewCycle = () => {
      if (iterationCountRef.current >= maxIterations) return;
      iterationCountRef.current += 1;
      setRevealedIndicesArr(texts.map(() => new Set()));
      setDisplayTextArr(texts.map(t => t.text));
      animateLine(0);
    };
    
    const animateLine = (index) => {
      if (index >= texts.length) {
        timeout = setTimeout(startNewCycle, LOOP_DELAY);
        return;
      }
      const cleanupInterval = animateText(index, () => {
        if (index < texts.length - 1) {
          timeout = setTimeout(() => animateLine(index + 1), LINE_DELAY);
        } else {
          timeout = setTimeout(startNewCycle, LOOP_DELAY);
        }
      });
      return cleanupInterval; 
    };

    startNewCycle();
    
    return () => {
      clearTimeout(timeout);
    };
  }, [hasAnimated, texts, animateText, maxIterations]);

  return (
    <motion.div
      className={parentClassName}
      ref={containerRef}
      style={{ display: 'inline-block', minHeight: '4rem' }}
    >
      {texts.map((t, idx) => {
        const textContent = displayTextArr[idx];
        const isHtmlContent = textContent.includes('<br'); 

        return (
          <span
            key={idx}
            className={t.className}
            style={{ display: 'block', lineHeight: 1.2, minHeight: '4rem' }}
          >
            {isHtmlContent ? (
                <span 
                  dangerouslySetInnerHTML={{ __html: textContent }} 
                />
            ) : (
                <>
                <span style={styles.srOnly}>{textContent}</span>
                <span aria-hidden="true">
                    {textContent.split('').map((char, i) => {
                    const revealed = revealedIndicesArr[idx]?.has(i);
                    return (
                        <span
                        key={i}
                        className={revealed ? t.className : `${t.className} ${encryptedClassName}`}
                        style={{
                            display: 'inline-block',
                            minWidth: '0.5ch',
                            fontVariantNumeric: 'tabular-nums',
                            lineHeight: 1.2,
                        }}
                        >
                        {char === ' ' ? '\u00A0' : char}
                        </span>
                    );
                    })}
                </span>
                </>
            )}
          </span>
        );
      })}
    </motion.div>
  );
}
