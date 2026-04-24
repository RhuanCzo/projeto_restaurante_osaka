import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(200,16,46,0.4); }
  50% { box-shadow: 0 0 0 12px rgba(200,16,46,0); }
`;

const Section = styled.section`
  padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 6rem);
  background: var(--dark);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--red), transparent);
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;
`;

const Label = styled.div`
  //
  font-size: 0.8rem;
  letter-spacing: 0.5em;
  color: var(--red);
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--white);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2px;
  max-width: 1100px;
  margin: 0 auto;
`;

const PromoCard = styled(motion.div)`
  background: var(--black);
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  transition: var(--transition);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 0;
    background: ${p => p.$color || 'var(--red)'};
    transition: height 0.4s ease;
  }

  &:hover {
    transform: translateY(-4px);
    &::before { height: 100%; }
  }
`;

const Badge = styled.div`
  display: inline-block;
  padding: 4px 12px;
  background: ${p => p.$bg || 'rgba(200,16,46,0.12)'};
  border: 1px solid ${p => p.$border || 'rgba(200,16,46,0.3)'};
  color: ${p => p.$color || 'var(--red)'};
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border-radius: 2px;
  margin-bottom: 1.2rem;
  animation: ${pulse} 2.5s ease-in-out infinite;
`;

const PromoTitle = styled.h3`
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 0.6rem;
`;

const PromoDesc = styled.p`
  font-family: var(--font-body);
  font-size: 0.87rem;
  line-height: 1.7;
  color: var(--gray);
  font-weight: 300;
  margin-bottom: 1.5rem;
`;

const Price = styled.div`
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 900;
  color: ${p => p.$color || 'var(--red)'};

  sup { font-size: 1rem; vertical-align: super; }
  span { font-size: 0.9rem; font-weight: 400; color: var(--gray); margin-left: 4px; }
`;

const CountdownWrapper = styled.div`
  margin-top: 1.2rem;
  padding-top: 1.2rem;
  border-top: 1px solid rgba(255,255,255,0.06);
`;

const CountLabel = styled.div`
  font-family: var(--font-body);
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  color: var(--gray);
  text-transform: uppercase;
  margin-bottom: 0.6rem;
`;

const CountNumbers = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const CountUnit = styled.div`
  text-align: center;

  .num {
    font-family: var(--font-display);
    font-size: 1.4rem;
    font-weight: 900;
    color: ${p => p.$color || 'var(--red)'};
    display: block;
    min-width: 36px;
  }

  .unit {
    font-family: var(--font-body);
    font-size: 0.6rem;
    color: var(--gray);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;

const CountSep = styled.div`
  font-size: 1.2rem;
  color: var(--gray);
  margin-bottom: 12px;
`;

function useCountdown(targetHour) {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(targetHour, 0, 0, 0);
      if (target <= now) target.setDate(target.getDate() + 1);
      const diff = Math.max(0, target - now);
      setTime({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetHour]);

  return time;
}

function Countdown({ targetHour, color }) {
  const t = useCountdown(targetHour);
  return (
    <CountdownWrapper>
      <CountLabel>Encerra em</CountLabel>
      <CountNumbers>
        <CountUnit $color={color}><span className="num">{String(t.h).padStart(2,'0')}</span><span className="unit">hrs</span></CountUnit>
        <CountSep>:</CountSep>
        <CountUnit $color={color}><span className="num">{String(t.m).padStart(2,'0')}</span><span className="unit">min</span></CountUnit>
        <CountSep>:</CountSep>
        <CountUnit $color={color}><span className="num">{String(t.s).padStart(2,'0')}</span><span className="unit">seg</span></CountUnit>
      </CountNumbers>
    </CountdownWrapper>
  );
}

const promos = [
  {
    badge: '🍣 Mais Popular',
    badgeBg: 'rgba(200,16,46,0.12)',
    badgeBorder: 'rgba(200,16,46,0.3)',
    badgeColor: 'var(--red)',
    color: 'var(--red)',
    title: 'Rodízio Japonês',
    desc: 'Peças ilimitadas de sushi, sashimi e temaki com qualidade premium. Noites de sexta e sábado.',
    price: '79',
    priceSuffix: '/pessoa',
    countdown: 20,
  },
  {
    badge: '🥢 Happy Hour',
    badgeBg: 'rgba(212,168,67,0.12)',
    badgeBorder: 'rgba(212,168,67,0.3)',
    badgeColor: 'var(--gold)',
    color: 'var(--gold)',
    title: 'Happy Hour',
    desc: 'De terça a quinta das 18h às 21h. Drinques japoneses com 30% off e aperitivos especiais.',
    price: '18h–21h',
    priceSuffix: '',
    countdown: 21,
  },
  {
    badge: '🌸 Noite Especial',
    badgeBg: 'rgba(255,183,197,0.1)',
    badgeBorder: 'rgba(255,183,197,0.2)',
    badgeColor: '#ffb7c5',
    color: '#ffb7c5',
    title: 'Jantar à Dois',
    desc: 'Menu degustação exclusivo com 5 tempos, harmonização de saquê e sobremesa especial.',
    price: '249',
    priceSuffix: '/casal',
    countdown: 22,
  },
  {
    badge: '🎉 Eventos',
    badgeBg: 'rgba(100,180,255,0.1)',
    badgeBorder: 'rgba(100,180,255,0.2)',
    badgeColor: '#64b4ff',
    color: '#64b4ff',
    title: 'Datas Especiais',
    desc: 'Aniversários, confraternizações e comemorações com menu personalizado e decoração temática.',
    price: 'Consulte',
    priceSuffix: '',
    countdown: 23,
  },
];

export default function Promotions() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <Section id="promotions" ref={ref}>
      <Header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Label>特別 — Promoções</Label>
          <Title>Ofertas que valem a visita</Title>
        </motion.div>
      </Header>

      <Grid>
        {promos.map((p, i) => (
          <PromoCard
            key={i}
            $color={p.color}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.7 }}
          >
            <Badge $bg={p.badgeBg} $border={p.badgeBorder} $color={p.badgeColor}>{p.badge}</Badge>
            <PromoTitle>{p.title}</PromoTitle>
            <PromoDesc>{p.desc}</PromoDesc>
            <Price $color={p.color}>
              <sup>R$</sup>{p.price}
              {p.priceSuffix && <span>{p.priceSuffix}</span>}
            </Price>
            <Countdown targetHour={p.countdown} color={p.color} />
          </PromoCard>
        ))}
      </Grid>
    </Section>
  );
}
