import React from 'react';
import { FaChrome, FaFirefox, FaEdge } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ExtensionBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-red-600 to-red-800 py-16 px-4"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Baixe vídeos e músicas do YouTube com rapidez
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Instale a extensão SaveTec Helper e baixe com 1 clique
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <motion.button whileHover={{ scale: 1.05 }} className="bg-white text-red-600 font-bold py-3 px-8 rounded-xl flex items-center gap-2">
            <FaChrome /> Chrome
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} className="bg-white text-red-600 font-bold py-3 px-8 rounded-xl flex items-center gap-2">
            <FaFirefox /> Firefox
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} className="bg-white text-red-600 font-bold py-3 px-8 rounded-xl flex items-center gap-2">
            <FaEdge /> Edge
          </motion.button>
        </div>
        <p className="text-sm opacity-70">✓ Segurança confirmada por Norton Safe Web</p>
      </div>
    </motion.div>
  );
};

export default ExtensionBanner;
