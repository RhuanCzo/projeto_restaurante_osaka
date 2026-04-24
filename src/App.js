import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GlobalStyles } from './styles/GlobalStyles';
import CustomCursor from './components/Cursor';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Menu from './components/Menu/Menu';
import Gallery from './components/Gallery/Gallery';
import Promotions from './components/Promotions/Promotions';
import Reviews from './components/Reviews/Reviews';
import Location from './components/Location/Location';
import CTA from './components/CTA/CTA';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA/FloatingCTA';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <GlobalStyles />
      <CustomCursor />

      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && (
        <>
          <Navbar />
          <main>
            <Hero />
            <Features />
            <Menu />
            <Gallery />
            <Promotions />
            <Reviews />
            <Location />
            <CTA />
          </main>
          <Footer />
          <FloatingCTA />
        </>
      )}
    </>
  );
}
