import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const torii = keyframes`
  0% { stroke-dashoffset: 500; opacity: 0; }
  50% { opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 1; }
`;

const petals = keyframes`
  0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translateY(120vh) rotate(720deg); opacity: 0; }
`;

const pulse = keyframes`
  0%, 100% { transform: scaleX(0); }
  50% { transform: scaleX(1); }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: var(--black);
  z-index: 99998;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  overflow: hidden;
`;

const LogoText = styled(motion.div)`
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  color: var(--white);
  letter-spacing: 0.15em;
  position: relative;
  
  span {
    color: var(--red);
  }

  &::after {
    content: 'RESTAURANTE JAPONÊS';
    position: absolute;
    bottom: -18px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.9rem;
    letter-spacing: 0.5em;
    font-family: var(--font-body);
    font-weight: 300;
    color: var(--gold);
    white-space: nowrap;
  }
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 1px;
  background: rgba(255,255,255,0.1);
  position: relative;
  overflow: hidden;
  margin-top: 20px;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--red);
    transform-origin: left;
    animation: ${pulse} 1.4s ease-in-out infinite;
  }
`;

const PetalContainer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const Petal = styled.div`
  position: absolute;
  width: 8px;
  height: 12px;
  background: radial-gradient(ellipse, #ffb7c5 0%, #e8a0b0 100%);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  opacity: 0;
  animation: ${petals} ${props => props.$duration}s ease-in ${props => props.$delay}s infinite;
  left: ${props => props.$left}%;
  top: -20px;
  transform-origin: center;
`;

const petalData = Array.from({ length: 18 }, (_, i) => ({
  left: Math.random() * 100,
  delay: Math.random() * 4,
  duration: 4 + Math.random() * 3,
}));

const JapaneseChar = styled(motion.div)`
  //
  font-size: 1rem;
  color: rgba(212, 168, 67, 0.4);
  letter-spacing: 0.3em;
`;

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(onComplete, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      >
        <PetalContainer>
          {petalData.map((p, i) => (
            <Petal key={i} $left={p.left} $delay={p.delay} $duration={p.duration} />
          ))}
        </PetalContainer>

        <JapaneseChar
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          大阪 · 日本料理
        </JapaneseChar>

        <LogoText
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          O<span>S</span>AKA
        </LogoText>

        <ProgressBar />

        <JapaneseChar
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Bem-vindo · ようこそ
        </JapaneseChar>
      </Overlay>
    </AnimatePresence>
  );
}
