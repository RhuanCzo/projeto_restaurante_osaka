import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Noto+Serif+JP:wght@300;400;600&family=Montserrat:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --black: #0a0a0a;
    --dark: #111111;
    --darker: #0d0d0d;
    --red: #c8102e;
    --red-dark: #9e0c23;
    --red-glow: rgba(200, 16, 46, 0.4);
    --gold: #d4a843;
    --gold-light: #e8c96d;
    --white: #f8f5f0;
    --white-dim: rgba(248, 245, 240, 0.85);
    --gray: #888;
    --gray-light: #ccc;
    --font-display: 'Playfair Display', serif;
    --font-jp: 'Noto Serif JP', serif;
    --font-body: 'Montserrat', sans-serif;
    --nav-height: 80px;
    --transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    font-family: var(--font-body);
    background: var(--black);
    color: var(--white);
    overflow-x: hidden;
    cursor: none;
  }

  /* Custom cursor */
  body * {
    cursor: none !important;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    max-width: 100%;
    display: block;
  }

  ::selection {
    background: var(--red);
    color: var(--white);
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: var(--dark);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--red);
    border-radius: 2px;
  }

  section {
    position: relative;
  }
`;

export const theme = {
  black: '#0a0a0a',
  dark: '#111111',
  red: '#c8102e',
  redDark: '#9e0c23',
  gold: '#d4a843',
  goldLight: '#e8c96d',
  white: '#f8f5f0',
  gray: '#888',
};
