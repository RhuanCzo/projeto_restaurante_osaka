import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Section = styled.section`
  padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 6rem);
  background: var(--dark);
  position: relative;
  overflow: hidden;

  &::before {
    content: '大阪';
    position: absolute;
    font-size: 20vw;
    color: rgba(255,255,255,0.015);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    white-space: nowrap;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: clamp(3rem, 6vw, 5rem);
`;

const Label = styled.div`
  font-size: 0.8rem;
  letter-spacing: 0.5em;
  color: var(--red);
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  //font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--white);
  line-height: 1.2;

  span { color: var(--red); }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 10px;
  max-width: 1100px;
  margin: 0 auto;
`;

const Card = styled(motion.div)`
  padding: 3rem 2.5rem;
  background: var(--black);
  position: relative;
  overflow: hidden;
  transition: var(--transition);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(200,16,46,0.06), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--red), var(--gold));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  &:hover {
    transform: translateY(-4px);
    &::before { opacity: 1; }
    &::after { transform: scaleX(1); }

    .icon-wrap { 
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 0 30px var(--red-glow);
    }
  }
`;

const IconWrap = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(200, 16, 46, 0.1);
  border: 1px solid rgba(200, 16, 46, 0.2);
  border-radius: 2px;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  transition: var(--transition);
`;

const CardTitle = styled.h3`
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 0.8rem;
`;

const CardText = styled.p`
  font-family: var(--font-body);
  font-size: 0.88rem;
  line-height: 1.7;
  color: var(--gray);
  font-weight: 300;
`;

const features = [
  {
    icon: '🐟',
    title: 'Ingredientes Frescos',
    text: 'Selecionamos os melhores peixes e frutos do mar diariamente, garantindo frescor e qualidade em cada prato.',
  },
  {
    icon: '👨‍🍳',
    title: 'Chefs Especializados',
    text: 'Nossa equipe foi treinada nas melhores técnicas da culinária japonesa, com anos de experiência e paixão.',
  },
  {
    icon: '🏮',
    title: 'Ambiente Sofisticado',
    text: 'Um espaço cuidadosamente decorado para criar uma atmosfera única, perfeita para ocasiões especiais.',
  },
  {
    icon: '⭐',
    title: 'Atendimento Impecável',
    text: 'Nossa equipe dedicada garante que cada visita seja memorável, com atenção aos mínimos detalhes.',
  },
];

export default function Features() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <Section ref={ref} id="features">
      <Header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Label>Por que nos escolher</Label>
          <Title>Tradição que se <span>sente</span> no sabor</Title>
        </motion.div>
      </Header>

      <Grid>
        {features.map((f, i) => (
          <Card
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.7 }}
          >
            <IconWrap className="icon-wrap">{f.icon}</IconWrap>
            <CardTitle>{f.title}</CardTitle>
            <CardText>{f.text}</CardText>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
