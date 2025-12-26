import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';

export const Card = forwardRef((props, ref) => (
  <div ref={ref} className="card" {...props} />
));
Card.displayName = 'Card';

const makeSlot = (i, dx, dy, total) => ({
  x: i * dx,
  y: -i * dy,
  z: -i * 40,
  zIndex: total - i
});

const CardSwap = ({ children, delay, cardDistance, verticalDistance, onCardChange }) => {
  const cards = useMemo(() => Children.toArray(children), [children]);
  const refs = useRef(cards.map(() => React.createRef()));
  const order = useRef(cards.map((_, i) => i));

  useEffect(() => {
    const total = refs.current.length;

    refs.current.forEach((r, i) => {
      const slot = makeSlot(i, cardDistance, verticalDistance, total);
      gsap.set(r.current, {
        ...slot,
        position: 'absolute',
        top: '50%',
        yPercent: -50
      });
    });

    const swap = () => {
      const [front, ...rest] = order.current;
      onCardChange?.(rest[0]);

      const el = refs.current[front].current;

      const tl = gsap.timeline({
        onComplete: () => {
          order.current = [...rest, front];
        }
      });

      tl.to(el, { y: '+=100', opacity: 0, duration: 1.1 });

      rest.forEach((i, idx) => {
        const slot = makeSlot(idx, cardDistance, verticalDistance, total);
        tl.to(refs.current[i].current, slot, '-=0.6');
      });

      const back = makeSlot(total - 1, cardDistance, verticalDistance, total);
      tl.set(el, { opacity: 1 });
      tl.to(el, back, '-=0.3');
    };

    const id = setInterval(swap, delay);
    return () => clearInterval(id);
  }, [delay, cardDistance, verticalDistance, onCardChange]);

  return <div className="card-swap-wrapper">{cards.map((c, i) => cloneElement(c, { ref: refs.current[i], key: i }))}</div>;
};

export default CardSwap;
