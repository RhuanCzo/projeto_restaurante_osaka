import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Section = styled.section`
  padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 6rem);
  background: var(--black);
  overflow: hidden;
`;

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 3.5rem;
`;

const Left = styled.div``;

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
`;

const GoogleRating = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1.2rem 2rem;
  background: var(--dark);
  border: 1px solid rgba(212,168,67,0.2);

  .score {
    font-family: var(--font-display);
    font-size: 2.5rem;
    font-weight: 900;
    color: var(--gold);
    line-height: 1;
  }

  .meta {
    .stars { font-size: 1.1rem; margin-bottom: 2px; }
    .label { font-family: var(--font-body); font-size: 0.7rem; color: var(--gray); letter-spacing: 0.1em; }
  }
`;

const SliderWrap = styled.div`
  position: relative;
  overflow: hidden;
`;

const Slider = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ReviewCard = styled(motion.div)`
  padding: 2.5rem;
  background: var(--dark);
  position: relative;

  &::before {
    content: '"';
    position: absolute;
    top: 1.5rem;
    right: 2rem;
    font-family: var(--font-display);
    font-size: 5rem;
    color: rgba(200,16,46,0.08);
    line-height: 1;
  }
`;

const Stars = styled.div`
  color: var(--gold);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  letter-spacing: 2px;
`;

const ReviewText = styled.p`
  font-family: var(--font-body);
  font-size: 0.9rem;
  line-height: 1.75;
  color: rgba(248,245,240,0.7);
  font-weight: 300;
  margin-bottom: 1.5rem;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${p => p.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
`;

const AuthorInfo = styled.div`
  .name {
    font-family: var(--font-body);
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--white);
  }
  .date {
    font-family: var(--font-body);
    font-size: 0.75rem;
    color: var(--gray);
  }
`;

const reviews = [
  { name: 'Fernanda L.', date: 'Março 2025', rating: 5, text: 'O melhor sushi que já comi em Cotia, sem dúvida! O ambiente é lindo, a comida é fresca e o atendimento é excelente. Voltarei muitas vezes!', bg: '#c8102e', initial: 'F' },
  { name: 'Ricardo M.', date: 'Fevereiro 2025', rating: 5, text: 'Fizemos aniversário lá e foi perfeito. O combinado premium surpreendeu por qualidade e quantidade. Chef incrível!', bg: '#d4a843', initial: 'R' },
  { name: 'Beatriz S.', date: 'Janeiro 2025', rating: 5, text: 'O ambiente é sofisticado e aconchegante ao mesmo tempo. Os temakis são os melhores da região. Super recomendo!', bg: '#6b4e9e', initial: 'B' },
  { name: 'Thiago C.', date: 'Março 2025', rating: 5, text: 'Fui no rodízio e valeu muito o valor. Qualidade premium em todas as peças. Ambiente climatizado e bem decorado.', bg: '#2d8a4e', initial: 'T' },
  { name: 'Mariana K.', date: 'Fevereiro 2025', rating: 5, text: 'Atendimento nota 10! O sashimi estava fresco demais. Ótima experiência para ocasiões especiais.', bg: '#c04e9e', initial: 'M' },
  { name: 'André F.', date: 'Janeiro 2025', rating: 5, text: 'Descobri este restaurante recentemente e já é meu favorito em Cotia. Tudo muito bem preparado e apresentado.', bg: '#4e7ec0', initial: 'A' },
];

export default function Reviews() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <Section id="reviews" ref={ref}>
      <Inner>
        <TopRow>
          <Left>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Label>評価 — Avaliações</Label>
              <Title>O que nossos clientes dizem</Title>
            </motion.div>
          </Left>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <GoogleRating>
              <div className="score">4.9</div>
              <div className="meta">
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <div className="label">Nota no Google · 200+ avaliações</div>
              </div>
            </GoogleRating>
          </motion.div>
        </TopRow>

        <Slider>
          {reviews.map((r, i) => (
            <ReviewCard
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7 }}
            >
              <Stars>{'★'.repeat(r.rating)}</Stars>
              <ReviewText>"{r.text}"</ReviewText>
              <Author>
                <Avatar $bg={r.bg}>{r.initial}</Avatar>
                <AuthorInfo>
                  <div className="name">{r.name}</div>
                  <div className="date">{r.date}</div>
                </AuthorInfo>
              </Author>
            </ReviewCard>
          ))}
        </Slider>
      </Inner>
    </Section>
  );
}
