import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Tutorial from '../components/Tutorial';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import ExtensionBanner from '../components/ExtensionBanner';
import SupportedSites from '../components/SupportedSites';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ExtensionBanner />
      <div className="container mx-auto px-4 py-16">
        <Tutorial />
        <SupportedSites />
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 glow-text">Perguntas Frequentes</h2>
          <FAQ />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
