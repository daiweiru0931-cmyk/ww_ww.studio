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
  parentClassName = '',
  encryptedFontSize = '0.7em', 
}) {
  const containerRef = useRef(null);
  const [displayTextArr, setDisplayTextArr] = useState(texts.map(t => t.text));
  const [revealedIndicesArr, setRevealedIndicesArr] = useState(texts.map(() => new Set()));
  const [hasAnimated, setHasAnimated] = useState(false);
  const [fontSizes, setFontSizes] = useState(texts.map(t => (t.className.includes('h1-text') ? 60 : 20)));
  const iterationCountRef = useRef(0);

  // 依螢幕寬度設定字體，避免手機跳動 (RWD)
  useEffect(() => {
    const updateFontSizes = () => {
      const width = window.innerWidth;
      setFontSizes(
        texts.map(t => {
          if (t.className.includes('h1-text')) {
            // h1-text: 最大 60px, 最小 36px, 縮放比例 0.05
            // 由於 clamp 已經在 CSS 處理，這裡的邏輯可以簡化或移除，但保持以確保行高計算的穩定性
            return Math.max(36, Math.min(60, Math.floor(width * 0.05)));
          } 
          // 其他文字：最大 24px, 最小 14px, 縮放比例 0.02
          else {
            return Math.max(14, Math.min(24, Math.floor(width * 0.02)));
          }
        })
      );
    };
    updateFontSizes();
    window.addEventListener('resize', updateFontSizes);
    return () => window.removeEventListener('resize', updateFontSizes);
  }, [texts]);

  const shuffleText = useCallback((originalText, revealedSet) => {
    const availableChars = characters.split('');
    return originalText
      .split('')
      .map((char, i) => {
        if (char === ' ' || revealedSet.has(i)) return char;
        // 確保 <br /> 不被加密
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
      // 確保不會無限循環，特別是當 speed 太慢時
      if (iteration > maxIterations * text.length + 50) clearInterval(interval); 
    }, speed);
    
    return () => clearInterval(interval);

  }, [texts, maxIterations, speed, shuffleText]);


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
    const LOOP_DELAY = 5000; // 總循環間隔
    const LINE_DELAY = 500; // 行間延遲

    // 啟動一個新循環
    const startNewCycle = () => {
      // 檢查是否達到最大循環次數
      if (iterationCountRef.current >= maxIterations) return;
      
      iterationCountRef.current += 1;
      
      // 重置顯示狀態，準備新的動畫
      setRevealedIndicesArr(texts.map(() => new Set()));
      setDisplayTextArr(texts.map(t => t.text));
      
      // 啟動遍歷
      animateLine(0);
    };
    
    // 遞迴函數：按順序播放每一行文本
    const animateLine = (index) => {
      if (index >= texts.length) {
        // 所有行都已播放完畢，等待 LOOP_DELAY 後開始新循環
        timeout = setTimeout(startNewCycle, LOOP_DELAY);
        return;
      }
      
      // 執行當前行的動畫
      const cleanupInterval = animateText(index, () => {
        if (index < texts.length - 1) {
          // 如果還有下一行，則等待 LINE_DELAY 後執行下一行
          timeout = setTimeout(() => animateLine(index + 1), LINE_DELAY);
        } else {
          // 這是最後一行，等待 LOOP_DELAY 後開始新循環
          timeout = setTimeout(startNewCycle, LOOP_DELAY);
        }
      });
      // 在遞迴調用中，我們需要確保清除之前的 timeout，但這裡的 cleanup 是針對 animateText 內部的 interval
      return cleanupInterval; 
    };

    // 初始啟動
    startNewCycle();
    
    // 清除函數
    return () => {
      clearTimeout(timeout);
    };
  }, [hasAnimated, texts, animateText, maxIterations]); // 依賴項已更新

  // HTML 渲染部分
  return (
    <motion.div
      className={parentClassName}
      ref={containerRef}
      style={{
        display: 'inline-block',
        // 確保容器有足夠的最小高度以避免跳動
        minHeight: '4rem', 
      }}
    >
      {texts.map((t, idx) => {
        // 使用 innerHTML 處理 <br /> 標籤
        const textContent = displayTextArr[idx];
        const isHtmlContent = textContent.includes('<br'); 

        return (
          <span
            key={idx}
            className={t.className}
            style={{
              display: 'block', // 確保每行文本單獨佔據一行
              fontSize: fontSizes[idx],
              lineHeight: 1.2,
              minHeight: fontSizes[idx] * 1.2,
            }}
          >
            {isHtmlContent ? (
                
                <span 
                    // 為了避免複雜化，我們假設外部調用者會盡量避免在 DecryptedText 中傳入 <br />
                    // 如果必須傳入 <br />，則動畫效果會比較差
                    dangerouslySetInnerHTML={{ __html: textContent }} 
                />
            ) : (
                <>
                {/* 輔助技術隱藏的純文本 */}
                <span style={styles.srOnly}>{textContent}</span>
                {/* 實際渲染的逐字動畫 */}
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
                            // 加密狀態下字體變小
                            fontSize: revealed ? 'inherit' : encryptedFontSize, 
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