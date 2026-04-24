import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const CursorOuter = styled.div`
  position: fixed;
  width: 36px;
  height: 36px;
  border: 1.5px solid var(--red);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  transition: transform 0.15s ease, opacity 0.2s ease;
  transform: translate(-50%, -50%);
  opacity: 0.7;
`;

const CursorInner = styled.div`
  position: fixed;
  width: 6px;
  height: 6px;
  background: var(--red);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
`;

export default function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let ox = mx, oy = my;

    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (innerRef.current) {
        innerRef.current.style.left = mx + 'px';
        innerRef.current.style.top = my + 'px';
      }
    };

    const lerp = () => {
      ox += (mx - ox) * 0.12;
      oy += (my - oy) * 0.12;
      if (outerRef.current) {
        outerRef.current.style.left = ox + 'px';
        outerRef.current.style.top = oy + 'px';
      }
      requestAnimationFrame(lerp);
    };

    const raf = requestAnimationFrame(lerp);
    window.addEventListener('mousemove', move);

    const links = document.querySelectorAll('a, button, [data-hover]');
    const enter = () => {
      if (outerRef.current) {
        outerRef.current.style.transform = 'translate(-50%, -50%) scale(1.8)';
        outerRef.current.style.borderColor = 'var(--gold)';
        outerRef.current.style.opacity = '1';
      }
    };
    const leave = () => {
      if (outerRef.current) {
        outerRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        outerRef.current.style.borderColor = 'var(--red)';
        outerRef.current.style.opacity = '0.7';
      }
    };

    links.forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
    };
  }, []);

  return (
    <>
      <CursorOuter ref={outerRef} />
      <CursorInner ref={innerRef} />
    </>
  );
}
