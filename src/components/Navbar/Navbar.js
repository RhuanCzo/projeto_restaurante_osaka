import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(1.5rem, 4vw, 4rem);
  transition: background 0.4s ease, backdrop-filter 0.4s ease;

  ${props => props.$scrolled && css`
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(200, 16, 46, 0.15);
  `}
`;

const Logo = styled.a`
  display: flex;
  flex-direction: column;
  line-height: 1;

  .name {
    //font-family: var(--font-display);
    font-size: 1.8rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    color: var(--white);

    span { color: var(--red); }
  }

  .sub {
    ////
    font-size: 0.55rem;
    letter-spacing: 0.4em;
    color: var(--gold);
    margin-top: 1px;
  }
`;

const ToriiIcon = styled.div`
  width: 28px;
  height: 24px;
  position: relative;
  margin-right: 10px;
  flex-shrink: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--red);
    border-radius: 1px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 5px;
    left: 20%;
    right: 20%;
    height: 2px;
    background: var(--red);
    border-radius: 1px;
  }

  .left-pillar, .right-pillar {
    position: absolute;
    width: 3px;
    background: var(--red);
    bottom: 0;
    top: 5px;
    border-radius: 1px;
  }

  .left-pillar { left: 4px; }
  .right-pillar { right: 4px; }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: clamp(1.5rem, 2.5vw, 2.5rem);
  list-style: none;

  @media (max-width: 900px) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--white-dim);
  position: relative;
  padding: 4px 0;
  //transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--red);
    //transition: width 0.3s ease;
  }

  &:hover {
    color: var(--white);
    &::after { width: 100%; }
  }
`;

const ReserveBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  background: var(--red);
  color: var(--white);
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 2px;
  //transition: var(--transition);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--gold);
    transform: translateX(-100%);
    //transition: transform 0.4s ease;
  }

  &:hover::before { transform: translateX(0); }
  &:hover { color: var(--black); }

  span { position: relative; z-index: 1; }

  @media (max-width: 900px) {
    display: none;
  }
`;

const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 8px;
  z-index: 1001;

  @media (max-width: 900px) {
    display: flex;
  }

  span {
    display: block;
    width: 24px;
    height: 1.5px;
    background: var(--white);
    //transition: var(--transition);
  }

  ${props => props.$open && css`
    span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
    span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
  `}
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.98);
  backdrop-filter: blur(30px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  z-index: 999;

  a {
    font-family: var(--font-display);
    font-size: clamp(2rem, 8vw, 3rem);
    font-weight: 700;
    color: var(--white-dim);
    //transition: color 0.3s ease;

    &:hover { color: var(--red); }
  }
`;

const navItems = [
  { label: 'Início', href: '#hero' },
  { label: 'Cardápio', href: '#menu' },
  { label: 'Ambiente', href: '#gallery' },
  { label: 'Promoções', href: '#promotions' },
  { label: 'Avaliações', href: '#reviews' },
  { label: 'Localização', href: '#location' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <Nav
        $scrolled={scrolled}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        //={{ duration: 0.8, delay: 2.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <LogoWrapper>
          <ToriiIcon>
            <div className="left-pillar" />
            <div className="right-pillar" />
          </ToriiIcon>
          <Logo href="#hero">
            <div className="name">O<span>S</span>AKA</div>
            <div className="sub">Restaurante Japonês</div>
          </Logo>
        </LogoWrapper>

        <NavLinks>
          {navItems.map(item => (
            <li key={item.href}>
              <NavLink href={item.href}>{item.label}</NavLink>
            </li>
          ))}
        </NavLinks>

        <ReserveBtn href="#reservas">
          <span>Reservar Agora</span>
        </ReserveBtn>

        <Hamburger
          $open={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </Hamburger>
      </Nav>

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            //transition={{ duration: 0.3 }}
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                //={{ delay: i * 0.06 }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href="#reservas"
              style={{ color: 'var(--red)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              //transition={{ delay: 0.4 }}
              onClick={() => setMobileOpen(false)}
            >
              Reservar Mesa
            </motion.a>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
}
