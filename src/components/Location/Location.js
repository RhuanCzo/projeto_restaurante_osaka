import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Section = styled.section`
  padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 6rem);
  background: var(--darker);
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
`;

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Left = styled.div``;

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
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  color: var(--white);
  line-height: 1.2;
  margin-bottom: 2.5rem;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`;

const Icon = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(200,16,46,0.08);
  border: 1px solid rgba(200,16,46,0.2);
  border-radius: 2px;
  font-size: 1.1rem;
  flex-shrink: 0;
`;

const InfoText = styled.div`
  .label {
    font-family: var(--font-body);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 4px;
  }
  .value {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: rgba(248,245,240,0.8);
    line-height: 1.6;
  }
`;

const MapWrap = styled(motion.div)`
  aspect-ratio: 1;
  background: var(--dark);
  border: 1px solid rgba(255,255,255,0.05);
  overflow: hidden;
  position: relative;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    filter: grayscale(0.8) invert(0.9) contrast(0.9);
    opacity: 0.85;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    box-shadow: inset 0 0 40px rgba(10,10,10,0.5);
  }
`;

const Hours = styled.div`
  margin-top: 2.5rem;
  padding: 1.5rem;
  background: var(--black);
  border-left: 2px solid var(--red);
`;

const HoursTitle = styled.div`
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--red);
  margin-bottom: 1rem;
`;

const HoursGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 6px 16px;
`;

const HoursRow = styled.div`
  font-family: var(--font-body);
  font-size: 0.82rem;
  color: ${p => p.$accent ? 'var(--gold)' : 'rgba(248,245,240,0.65)'};
  font-weight: ${p => p.$accent ? '600' : '300'};
`;

export default function Location() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <Section id="location" ref={ref}>
      <Inner>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Left>
            <Label>場所 — Onde nos encontrar</Label>
            <Title>Venha nos visitar<br />em Cotia</Title>

            <InfoList>
              <InfoItem>
                <Icon>📍</Icon>
                <InfoText>
                  <div className="label">Endereço</div>
                  <div className="value">Rua das Flores, 123 — Centro<br />Cotia – SP, 06700-000</div>
                </InfoText>
              </InfoItem>
              <InfoItem>
                <Icon>📞</Icon>
                <InfoText>
                  <div className="label">Telefone / WhatsApp</div>
                  <div className="value">(11) 99999-9999</div>
                </InfoText>
              </InfoItem>
              <InfoItem>
                <Icon>🅿️</Icon>
                <InfoText>
                  <div className="label">Estacionamento</div>
                  <div className="value">Estacionamento próprio gratuito<br />para clientes · 20 vagas</div>
                </InfoText>
              </InfoItem>
            </InfoList>

            <Hours>
              <HoursTitle>Horário de Funcionamento</HoursTitle>
              <HoursGrid>
                <HoursRow>Segunda – Quinta</HoursRow>
                <HoursRow>18h – 23h</HoursRow>
                <HoursRow $accent>Sexta – Sábado</HoursRow>
                <HoursRow $accent>12h – 00h</HoursRow>
                <HoursRow>Domingo</HoursRow>
                <HoursRow>12h – 22h</HoursRow>
              </HoursGrid>
            </Hours>
          </Left>
        </motion.div>

        <MapWrap
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <iframe
            title="Osaka Restaurante"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58695.69537399388!2d-47.006534!3d-23.601778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf02b14bc01777%3A0x7c80e7e7e4e4e4e4!2sCotia%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m2!1spt-BR!2sbr"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </MapWrap>
      </Inner>
    </Section>
  );
}
