import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const Section = styled.section`
  padding: clamp(5rem, 10vw, 10rem) clamp(1.5rem, 6vw, 6rem);
  position: relative;
  overflow: hidden;
  background: var(--black);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 30% 50%, rgba(200,16,46,0.18) 0%, transparent 60%),
      radial-gradient(ellipse at 70% 50%, rgba(212,168,67,0.08) 0%, transparent 60%);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=1800&q=80');
    background-size: cover;
    background-position: center;
    filter: brightness(0.07) saturate(1.5);
    z-index: 0;
  }
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
`;

const JpChar = styled(motion.div)`
  //
  font-size: 0.85rem;
  letter-spacing: 0.5em;
  color: var(--gold);
  opacity: 0.6;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
`;

const Title = styled(motion.h2)`
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  line-height: 1.1;
  color: var(--white);
  margin-bottom: 1.5rem;

  em {
    font-style: italic;
    background: linear-gradient(135deg, var(--red), var(--gold), var(--red));
    background-size: 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 4s linear infinite;
  }
`;

const Sub = styled(motion.p)`
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.7;
  color: rgba(248,245,240,0.6);
  margin-bottom: 3rem;
`;

const BtnGroup = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;

const BtnPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 18px 36px;
  background: var(--red);
  color: var(--white);
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: 2px;
  transition: var(--transition);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 50px rgba(200,16,46,0.5);
  }
`;

const BtnWA = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 17px 30px;
  background: rgba(37,211,102,0.1);
  border: 1px solid rgba(37,211,102,0.3);
  color: #25d366;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 2px;
  transition: var(--transition);

  &:hover {
    background: rgba(37,211,102,0.2);
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(37,211,102,0.2);
  }
`;

const BtnCall = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 17px 30px;
  border: 1px solid rgba(248,245,240,0.2);
  color: var(--white);
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 2px;
  transition: var(--transition);

  &:hover {
    border-color: var(--gold);
    color: var(--gold);
    transform: translateY(-3px);
  }
`;

const Divider = styled.div`
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--red), transparent);
  margin: 3rem auto 0;
`;

export default function CTA() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <Section id="reservas" ref={ref}>
      <Inner>
        <JpChar
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 0.6, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          ご予約 · Reservas · 大阪
        </JpChar>

        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Sua Próxima<br />
          Experiência <em>Japonesa</em><br />
          Começa Aqui
        </Title>

        <Sub
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Reserve sua mesa agora e garanta momentos inesquecíveis com quem você ama. Cotia te espera para uma experiência autêntica da culinária japonesa.
        </Sub>

        <BtnGroup
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.7 }}
        >
          <BtnPrimary href="https://wa.me/5511992944737?text=Olá! Gostaria de reservar uma mesa." target="_blank" rel="noopener">
            🍣 Reservar Mesa
          </BtnPrimary>
          <BtnWA href="https://wa.me/5511992944737" target="_blank" rel="noopener">
            💬 WhatsApp
          </BtnWA>
          <BtnCall href="tel:+5511992944737">
            📞 Ligar Agora
          </BtnCall>
        </BtnGroup>

        <Divider />
      </Inner>
    </Section>
  );
}
