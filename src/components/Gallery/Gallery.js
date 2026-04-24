import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Section = styled.section`
  padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 6rem);
  background: var(--darker);
  overflow: hidden;
`;

const Header = styled.div`
  max-width: 600px;
  margin-bottom: 3rem;
`;

const Label = styled.div`
  //
  font-size: 0.8rem;
  letter-spacing: 0.5em;
  color: var(--gold);
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--white);
  line-height: 1.2;

  em { color: var(--red); font-style: italic; }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(2, 240px);
  gap: 2px;
  max-width: 1100px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(3, 200px);
  }
`;

const GalleryItem = styled(motion.div)`
  grid-column: ${p => p.$col};
  grid-row: ${p => p.$row};
  overflow: hidden;
  position: relative;
  background: var(--dark);

  @media (max-width: 768px) {
    grid-column: unset;
    grid-row: unset;
    ${p => p.$mobileSpan && `grid-column: span 2;`}
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    filter: brightness(0.8) saturate(1.1);
  }

  &:hover img {
    transform: scale(1.06);
    filter: brightness(0.6) saturate(1.3);
  }

  &:hover .gi-overlay { opacity: 1; }
`;

const GiOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(200,16,46,0.2);
  opacity: 0;
  transition: opacity 0.4s ease;

  svg {
    width: 36px;
    height: 36px;
    color: white;
  }
`;

const Lightbox = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0,0,0,0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  img {
    max-width: 90vw;
    max-height: 85vh;
    object-fit: contain;
    border-radius: 2px;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: 1px solid rgba(255,255,255,0.2);
  color: white;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  border-radius: 50%;
  transition: var(--transition);

  &:hover { border-color: var(--red); color: var(--red); }
`;

const Quote = styled.div`
  text-align: center;
  margin-top: 3rem;
  font-family: var(--font-display);
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-style: italic;
  color: rgba(248,245,240,0.4);

  span { color: var(--gold); }
`;

const images = [
  { src: 'https://www.comidaereceitas.com.br/wp-content/uploads/2022/12/salmao-camarao-780x520.jpg', col: 'span 5', row: '1', alt: 'Sushi premium' },
  { src: 'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=800&q=80', col: 'span 3', row: '1', alt: 'Temaki' },
  { src: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800&q=80', col: 'span 4', row: 'span 2', alt: 'Combinado' },
  { src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80', col: 'span 3', row: '2', alt: 'Ambiente', mobileSpan: true },
  { src: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80', col: 'span 5', row: '2', alt: 'Pratos quentes' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <Section id="gallery" ref={ref}>
      <Header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Label>雰囲気 — Nosso Ambiente</Label>
          <Title>
            Um espaço pensado para<br />
            <em>momentos especiais</em>
          </Title>
        </motion.div>
      </Header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <GalleryGrid>
          {images.map((img, i) => (
            <GalleryItem
              key={i}
              $col={img.col}
              $row={img.row}
              $mobileSpan={img.mobileSpan}
              onClick={() => setLightbox(img.src)}
              style={{ cursor: 'zoom-in' }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <GiOverlay className="gi-overlay">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </GiOverlay>
            </GalleryItem>
          ))}
        </GalleryGrid>
      </motion.div>

      <Quote>
        "Cada detalhe foi pensado para <span>transformar sua refeição em memória</span>"
      </Quote>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox}
              alt="Gallery"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
            />
            <CloseBtn onClick={() => setLightbox(null)}>✕</CloseBtn>
          </Lightbox>
        )}
      </AnimatePresence>
    </Section>
  );
}
