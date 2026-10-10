import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DownloadForm from './DownloadForm';
import { FaShieldAlt, FaBolt, FaHeart } from 'react-icons/fa';

const Hero = () => {
  const [showStats, setShowStats] = useState(true);

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-4 overflow-hidden">
      {/* Background Animado */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block"
          >
            <span className="bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
              🔥 +100.000 Downloads Hoje
            </span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Baixador de Vídeos do{' '}
            <span className="glow-text">YouTube</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Baixe vídeos e músicas do YouTube gratuitamente em MP4 e MP3. 
            Suporte a 4K, 8K, 60fps e muito mais!
          </p>

          <DownloadForm />

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <FaShieldAlt className="text-green-500" />
              <span>Scanned by Norton Safe Web</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <FaBolt className="text-yellow-500" />
              <span>Download Turbo</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <FaHeart className="text-red-500" />
              <span>100% Grátis</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
