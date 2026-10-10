import React from "react";
import { Link } from "react-router-dom";
import {
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaGithub,
  FaMusic,
  FaFilm,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/30 py-12 mt-20 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold glow-text mb-4">SaveTec</h3>
            <p className="text-gray-400 text-sm">
              Baixe vídeos e músicas do YouTube gratuitamente
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link
                  to="/mp4"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <FaFilm className="text-blue-500" /> YouTube MP4
                </Link>
              </li>
              <li>
                <Link
                  to="/mp3"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <FaMusic className="text-green-500" /> YouTube MP3
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  YouTube Shorts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Extensão
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Termos de Serviço
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  EULA
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Para Webmasters
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Redes Sociais</h4>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-400 hover:text-red-600 text-2xl"
              >
                <FaYoutube />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-400 hover:text-pink-600 text-2xl"
              >
                <FaInstagram />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-400 hover:text-blue-600 text-2xl"
              >
                <FaFacebook />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-400 hover:text-white text-2xl"
              >
                <FaTiktok />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-400 hover:text-gray-300 text-2xl"
              >
                <FaGithub />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© 2008-{currentYear} SaveTec. Todos os direitos reservados.</p>
          <p className="mt-2">Português (Brasil)</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
