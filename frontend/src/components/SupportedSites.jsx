import React from 'react';
import { FaYoutube, FaFacebook, FaInstagram, FaTiktok, FaVimeo, FaReddit, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SupportedSites = () => {
  const sites = [
    { icon: FaYoutube, name: "YouTube", color: "text-red-600" },
    { icon: FaFacebook, name: "Facebook", color: "text-blue-600" },
    { icon: FaInstagram, name: "Instagram", color: "text-pink-600" },
    { icon: FaTiktok, name: "TikTok", color: "text-white" },
    { icon: FaVimeo, name: "Vimeo", color: "text-blue-400" },
    { icon: FaReddit, name: "Reddit", color: "text-orange-500" },
    { icon: FaTwitter, name: "Twitter", color: "text-blue-400" }
  ];

  return (
    <div className="py-16">
      <h3 className="text-2xl font-bold text-center mb-8">Recursos Suportados</h3>
      <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
        {sites.map((site, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1, y: -5 }}
            className="card text-center p-4 cursor-pointer"
          >
            <site.icon className={`text-3xl mx-auto mb-2 ${site.color}`} />
            <p className="text-sm font-semibold">{site.name}</p>
          </motion.div>
        ))}
      </div>
      <p className="text-center text-gray-500 mt-8 text-sm">E todos os sites da web</p>
    </div>
  );
};

export default SupportedSites;
