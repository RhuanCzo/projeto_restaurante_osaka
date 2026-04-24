import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0; }
  10% { opacity: 0.7; }
  90% { opacity: 0.5; }
  100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  min-height: 650px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--black);
`;

const ParallaxBg = styled.div`
  position: absolute;
  inset: -10%;
  background-image: url('https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=1800&q=80');
  background-size: cover;
  background-position: center;
  transform: translateY(${props => props.$offset}px);
  transition: transform 0.05s linear;
  filter: brightness(0.25) saturate(1.2);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(200, 16, 46, 0.08) 0%,
      transparent 50%,
      rgba(212, 168, 67, 0.05) 100%
    );
  }
`;

const Noise = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1;
`;

const RedVignette = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 100% 50%, rgba(200,16,46,0.15) 0%, transparent 60%);
  z-index: 1;
`;

const PetalContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  overflow: hidden;
`;

const Petal = styled.div`
  position: absolute;
  bottom: -20px;
  width: ${props => props.$size}px;
  height: ${props => props.$size * 1.4}px;
  left: ${props => props.$left}%;
  background: radial-gradient(ellipse, rgba(255,183,197,0.5) 0%, rgba(232,160,176,0.2) 100%);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  animation: ${float} ${props => props.$duration}s ease-in ${props => props.$delay}s infinite;
`;

const Content = styled.div`
  position: relative;
  z-index: 3;
  padding: 0 clamp(1.5rem, 8vw, 8rem);
  max-width: 750px;
`;

const Eyebrow = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1.5rem;

  .line {
    width: 40px;
    height: 1px;
    background: var(--red);
  }

  .text {
    ////
    font-size: 0.85rem;
    letter-spacing: 0.4em;
    color: var(--gold);
    text-transform: uppercase;
  }
`;

const Headline = styled(motion.h1)`
  //font-family: var(--font-display);
  font-size: clamp(2.8rem, 6vw, 5rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: var(--white);

  em {
    font-style: italic;
    color: var(--red);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--red), transparent);
    }
  }
`;

const Sub = styled(motion.p)`
  //font-family: var(--font-body);
  font-size: clamp(0.95rem, 1.8vw, 1.1rem);
  font-weight: 300;
  line-height: 1.8;
  color: rgba(248, 245, 240, 0.7);
  margin-bottom: 2.5rem;
  max-width: 500px;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

const BtnPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: var(--red);
  color: var(--white);
  //font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: 2px;
  transition: var(--transition);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--red-dark);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s ease;
  }

  &:hover::before { transform: scaleX(1); transform-origin: left; }
  span { position: relative; z-index: 1; }

  &:hover { transform: translateY(-2px); box-shadow: 0 12px 40px var(--red-glow); }
`;

const BtnOutline = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 28px;
  border: 1px solid rgba(248, 245, 240, 0.3);
  color: var(--white);
  //font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: 2px;
  transition: var(--transition);
  backdrop-filter: blur(8px);

  &:hover {
    border-color: var(--gold);
    color: var(--gold);
    transform: translateY(-2px);
  }
`;

const BtnWhatsApp = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 28px;
  background: rgba(37, 211, 102, 0.12);
  border: 1px solid rgba(37, 211, 102, 0.3);
  color: #25d366;
  //font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 2px;
  transition: var(--transition);

  &:hover {
    background: rgba(37, 211, 102, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(37, 211, 102, 0.2);
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  .text {
    //font-family: var(--font-body);
    font-size: 0.65rem;
    letter-spacing: 0.3em;
    color: rgba(248,245,240,0.4);
    text-transform: uppercase;
  }

  .line {
    width: 1px;
    height: 50px;
    background: linear-gradient(to bottom, rgba(200,16,46,0.8), transparent);
    animation: scrollLine 2s ease-in-out infinite;
  }

  @keyframes scrollLine {
    0%, 100% { transform: scaleY(1); opacity: 1; }
    50% { transform: scaleY(0.5); opacity: 0.4; }
  }
`;

const RightAccent = styled(motion.div)`
  position: absolute;
  right: clamp(2rem, 6vw, 6rem);
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  .jp {
    ////
    font-size: 1.1rem;
    letter-spacing: 0.3em;
    color: rgba(212,168,67,0.4);
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const petalData = Array.from({ length: 14 }, () => ({
  left: Math.random() * 100,
  delay: Math.random() * 6,
  duration: 6 + Math.random() * 5,
  size: 6 + Math.random() * 8,
}));

export default function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handler = () => setOffset(window.scrollY * 0.3);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <HeroSection id="hero">
      <ParallaxBg $offset={offset} />
      <Noise />
      <RedVignette />
      <PetalContainer>
        {petalData.map((p, i) => (
          <Petal key={i} $left={p.left} $delay={p.delay} $duration={p.duration} $size={p.size} />
        ))}
      </PetalContainer>

      <Content>
        <Eyebrow
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3.1, duration: 0.8 }}
        >
          <div className="line" />
          <div className="text">大阪 · Desde 2015 · Cotia – SP</div>
        </Eyebrow>

        <Headline
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          A Verdadeira<br />
          Experiência da<br />
          Culinária <em>Japonesa</em><br />
          em Cotia
        </Headline>

        <Sub
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.6, duration: 0.8 }}
        >
          Sabores autênticos, ambiente sofisticado e momentos inesquecíveis para você e sua família.
        </Sub>

        <ButtonGroup
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 0.8 }}
        >
          <BtnPrimary href="#reservas">
            <span>Reservar Mesa</span>
          </BtnPrimary>
          <BtnOutline href="#menu">
            <span>Ver Cardápio</span>
          </BtnOutline>
          <BtnWhatsApp href="https://wa.me/5511999999999" target="_blank" rel="noopener">
            <span>WhatsApp</span>
          </BtnWhatsApp>
        </ButtonGroup>
      </Content>

      <RightAccent
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 4, duration: 0.8 }}
      >
        <div className="jp">日本の味をお楽しみください</div>
      </RightAccent>

      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.2 }}
      >
        <div className="text">Explorar</div>
        <div className="line" />
      </ScrollIndicator>
    </HeroSection>
  );
}
