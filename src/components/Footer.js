import React from 'react';
import styled from 'styled-components';

const FooterWrap = styled.footer`
  background: #050505;
  padding: 3rem clamp(1.5rem, 6vw, 6rem) 1.5rem;
  border-top: 1px solid rgba(200,16,46,0.1);
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  margin-bottom: 1.5rem;
`;

const Logo = styled.div`
  .name {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    color: var(--white);
    span { color: var(--red); }
  }
  .sub {
    //
    font-size: 0.55rem;
    //letter-spacing: 0.4em;
    color: var(--gold);
    opacity: 0.6;
    margin-top: 2px;
  }
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;

  a {
    font-family: var(--font-body);
    font-size: 0.78rem;
    color: var(--gray);
    letter-spacing: 0.08em;
    transition: color 0.3s ease;

    &:hover { color: var(--white); }
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Copyright = styled.p`
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: rgba(248,245,240,0.25);
  letter-spacing: 0.05em;
`;

const JpText = styled.div`
  //
  font-size: 0.7rem;
  color: rgba(212,168,67,0.3);
  letter-spacing: 0.2em;
`;

export default function Footer() {
  return (
    <FooterWrap>
      <Top>
        <Logo>
          <div className="name">O<span>S</span>AKA</div>
          <div className="sub">Restaurante Japonês · Cotia–SP</div>
        </Logo>
        <Links>
          {['Início','Cardápio','Ambiente','Promoções','Avaliações','Localização'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}>{link}</a>
          ))}
        </Links>
      </Top>
      <Bottom>
        <Copyright>© {new Date().getFullYear()} Osaka Restaurante Japonês. Todos os direitos reservados.</Copyright>
        <JpText>大阪 · 日本料理 · Cotia</JpText>
      </Bottom>
    </FooterWrap>
  );
}
