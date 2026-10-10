import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const faqs = [
    { q: "Como baixar vídeos do YouTube?", a: "Basta copiar a URL do vídeo, colar no campo acima e escolher entre MP3 ou MP4. O download será iniciado automaticamente!" },
    { q: "É realmente gratuito?", a: "Sim! O SaveTec é 100% gratuito. Você pode baixar quantos vídeos quiser sem pagar nada." },
    { q: "Quais qualidades estão disponíveis?", a: "Suportamos desde 144p até 4K e 8K, incluindo 60fps. A qualidade disponível depende do vídeo original." },
    { q: "Posso baixar apenas o áudio (MP3)?", a: "Sim! Basta escolher a opção MP3 e o vídeo será convertido para música automaticamente." },
    { q: "É seguro usar o SaveTec?", a: "Sim! Somos verificados pelo Norton Safe Web e não armazenamos nenhum dado pessoal." },
    { q: "Funciona no celular?", a: "Sim! Nosso site é responsivo e funciona perfeitamente em smartphones e tablets." }
  ];

  return (
    <div id="faq" className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="card cursor-pointer"
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">{faq.q}</h3>
            {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 text-gray-400"
              >
                {faq.a}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default FAQ;
