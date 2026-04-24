import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Section = styled.section`
  padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 6rem);
  background: var(--black);
  position: relative;
  overflow: hidden;
`;

const Header = styled.div`
  text-align: center;
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

  span { color: var(--red); font-style: italic; }
`;

const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 3.5rem;
`;

const Tab = styled.button`
  padding: 10px 22px;
  background: ${p => p.$active ? 'var(--red)' : 'transparent'};
  border: 1px solid ${p => p.$active ? 'var(--red)' : 'rgba(255,255,255,0.12)'};
  color: ${p => p.$active ? 'var(--white)' : 'var(--gray)'};
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 2px;
  transition: var(--transition);

  &:hover {
    border-color: var(--red);
    color: var(--white);
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2px;
  max-width: 1100px;
  margin: 0 auto;
`;

const Card = styled(motion.div)`
  position: relative;
  overflow: hidden;
  background: var(--dark);
  aspect-ratio: 4/3;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    filter: brightness(0.75) saturate(1.1);
  }

  &:hover img {
    transform: scale(1.08);
    filter: brightness(0.55) saturate(1.3);
  }

  &:hover .overlay { opacity: 1; }
  &:hover .btn { transform: translateY(0); opacity: 1; }
  &:hover .title { transform: translateY(-8px); }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(200,16,46,0.15) 50%, transparent 100%);
  opacity: 0.8;
  transition: opacity 0.4s ease;
  className: overlay;
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.8rem;
`;

const CardTitle = styled.div`
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 0.4rem;
  transition: transform 0.3s ease;
`;

const CardSub = styled.div`
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: rgba(248,245,240,0.55);
  font-weight: 300;
  margin-bottom: 1rem;
`;

const CardBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  background: var(--red);
  color: var(--white);
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 2px;
  transform: translateY(12px);
  opacity: 0;
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover { background: var(--red-dark); }
`;

const CategoryTag = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 4px 12px;
  background: rgba(10,10,10,0.8);
  border: 1px solid rgba(212,168,67,0.3);
  color: var(--gold);
  //
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  backdrop-filter: blur(8px);
`;

const menuData = {
  all: [
    { title: 'Salmão Especial', sub: 'Sushi & Sashimi', tag: '寿司', img: 'https://www.comidaereceitas.com.br/wp-content/uploads/2022/12/salmao-camarao-780x520.jpg' },
    { title: 'Temaki Crispy', sub: 'Temakis', tag: '手巻き', img: 'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=600&q=80' },
    { title: 'Combinado Premium', sub: 'Combinados', tag: '盛り合わせ', img: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=600&q=80' },
    { title: 'Frango Karaage', sub: 'Pratos Quentes', tag: '唐揚げ', img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80' },
    { title: 'Mochi Ice Cream', sub: 'Sobremesas', tag: 'デザート', img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80' },
    { title: 'Uramaki Rainbow', sub: 'Sushi & Sashimi', tag: '裏巻き', img: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&q=80' },
  ],
  sushi: [
    { title: 'Salmão Especial', sub: 'Fatias premium', tag: '寿司', img: 'https://www.comidaereceitas.com.br/wp-content/uploads/2022/12/salmao-camarao-780x520.jpg' },
    { title: 'Uramaki Rainbow', sub: 'Com 5 tipos de peixe', tag: '裏巻き', img: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&q=80' },
    { title: 'Nigiri Mix', sub: '10 peças variadas', tag: '握り', img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80' },
  ],
  temaki: [
    { title: 'Temaki Crispy', sub: 'Com tempurá crocante', tag: '手巻き', img: 'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=600&q=80' },
    { title: 'Temaki Hot Philly', sub: 'Cream cheese e salmão grelhado', tag: '手巻き', img: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80' },
  ],
  combinados: [
    { title: 'Combinado Premium', sub: '30 peças selecionadas', tag: '盛り合わせ', img: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=600&q=80' },
    { title: 'Combinado Família', sub: '50 peças para 4 pessoas', tag: '家族', img: 'https://images.unsplash.com/photo-1617196034099-e8c1e63d0fcb?w=600&q=80' },
  ],
  quentes: [
    { title: 'Frango Karaage', sub: 'Frango crocante japonês', tag: '唐揚げ', img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80' },
    { title: 'Yakissoba Premium', sub: 'Macarrão salteado com legumes', tag: '焼きそば', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80' },
  ],
  sobremesas: [
    { title: 'Mochi Ice Cream', sub: 'Sorvete em massa de arroz', tag: 'デザート', img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80' },
  ],
};

const tabs = [
  { key: 'all', label: 'Todos' },
  { key: 'sushi', label: 'Sushi & Sashimi' },
  { key: 'temaki', label: 'Temakis' },
  { key: 'combinados', label: 'Combinados' },
  { key: 'quentes', label: 'Pratos Quentes' },
  { key: 'sobremesas', label: 'Sobremesas' },
];

export default function Menu() {
  const [active, setActive] = useState('all');
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const items = menuData[active] || menuData.all;

  return (
    <Section id="menu" ref={ref}>
      <Header>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Label>カード — Nosso Cardápio</Label>
          <Title>Sabores que <span>encantam</span></Title>
        </motion.div>
      </Header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
      >
        <Tabs>
          {tabs.map(t => (
            <Tab key={t.key} $active={active === t.key} onClick={() => setActive(t.key)}>
              {t.label}
            </Tab>
          ))}
        </Tabs>
      </motion.div>

      <AnimatePresence mode="wait">
        <Grid
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          {items.map((item, i) => (
            <Card
              key={item.title + i}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
            >
              <img src={item.img} alt={item.title} loading="lazy" />
              <Overlay className="overlay" />
              <CategoryTag>{item.tag}</CategoryTag>
              <CardContent>
                <CardTitle className="title">{item.title}</CardTitle>
                <CardSub>{item.sub}</CardSub>
                <CardBtn href="#menu" className="btn">Ver Detalhes</CardBtn>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </AnimatePresence>
    </Section>
  );
}
