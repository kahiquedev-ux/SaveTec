import React from 'react';
import { FaYoutube, FaLink, FaDownload, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Tutorial = () => {
  const steps = [
    { icon: FaYoutube, title: "Copie o link", desc: "Copie a URL do vídeo do YouTube" },
    { icon: FaLink, title: "Cole no SaveTec", desc: "Cole o link no campo acima" },
    { icon: FaDownload, title: "Escolha o formato", desc: "Selecione MP3 ou MP4" },
    { icon: FaCheckCircle, title: "Baixe grátis", desc: "Seu arquivo será baixado" }
  ];

  const methods = [
    { number: 1, title: "Método Recomendado", desc: "Instale a extensão SaveTec Helper para downloads com 1 clique", button: "Instalar Agora", highlight: true },
    { number: 2, title: "Método Alternativo", desc: "Adicione 'ss' antes da URL do YouTube: ssyoutube.com/..." },
    { number: 3, title: "Método Rápido", desc: "Use o prefixo 'sfrom.net/' antes da URL" }
  ];

  return (
    <div id="como-baixar" className="py-16">
      <h2 className="text-3xl font-bold text-center mb-4 glow-text">Como Baixar Vídeos e Músicas do YouTube</h2>
      <p className="text-center text-gray-400 mb-12">Tutorial completo 2024</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card text-center"
          >
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <step.icon className="text-3xl text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Passo {index + 1}</h3>
            <p className="font-semibold mb-2">{step.title}</p>
            <p className="text-gray-500 text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        {methods.map((method) => (
          <motion.div
            key={method.number}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={`card flex flex-col md:flex-row justify-between items-center gap-4 ${method.highlight ? 'border-red-500/50 bg-red-500/10' : ''}`}
          >
            <div className="flex-1">
              <h3 className="font-bold text-lg">Método {method.number}: {method.title}</h3>
              <p className="text-gray-400">{method.desc}</p>
            </div>
            {method.button && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-6 py-2 text-sm"
              >
                {method.button}
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tutorial;
