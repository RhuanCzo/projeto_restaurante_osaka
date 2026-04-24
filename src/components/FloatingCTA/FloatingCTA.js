import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.4); }
  50% { box-shadow: 0 0 0 12px rgba(37,211,102,0); }
`;

const Btn = styled(motion.a)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9000;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  background: #25d366;
  color: white;
  border-radius: 50px;
  font-family: var(--font-body);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  transition: background 0.3s ease;
  animation: ${pulse} 2.5s ease-in-out infinite;

  &:hover { background: #1db954; }

  .icon { font-size: 1.1rem; }
  .label { @media (max-width: 480px) { display: none; } }
`;

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <Btn
          href="https://wa.me/5511999999999?text=Olá! Gostaria de reservar uma mesa no Osaka."
          target="_blank"
          rel="noopener"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <span className="icon">💬</span>
          <span className="label">Reservar via WhatsApp</span>
        </Btn>
      )}
    </AnimatePresence>
  );
}
