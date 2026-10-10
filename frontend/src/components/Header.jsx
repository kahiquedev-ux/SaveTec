import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaDownload,
  FaBars,
  FaTimes,
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaHome,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-dark/90 backdrop-blur-md shadow-lg" : "bg-transparent"}`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <FaDownload className="text-primary text-2xl animate-pulse" />
            <span className="text-2xl font-bold glow-text">SaveTec</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Suporta:</span>
              <FaYoutube className="text-red-600" />
              <FaInstagram className="text-pink-600" />
              <FaFacebook className="text-blue-600" />
              <FaTiktok className="text-white" />
            </div>

            {/* Links de navegação */}
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <FaHome className="text-sm" /> Início
            </Link>
            <Link to="/mp3" className="hover:text-green-500 transition-colors">
              MP3
            </Link>
            <Link to="/mp4" className="hover:text-blue-500 transition-colors">
              MP4
            </Link>
            <a
              href="#como-baixar"
              className="hover:text-primary transition-colors"
            >
              Como Baixar
            </a>
            <a href="#faq" className="hover:text-primary transition-colors">
              FAQ
            </a>
            <motion.a
              href="#instalar"
              className="bg-primary hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Instalar Extensão
            </motion.a>
          </div>

          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-4 space-y-4 bg-card rounded-xl p-6"
            >
              <Link
                to="/"
                className="flex items-center gap-2 block hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                <FaHome /> Início
              </Link>
              <Link
                to="/mp3"
                className="block hover:text-green-500"
                onClick={() => setIsOpen(false)}
              >
                MP3
              </Link>
              <Link
                to="/mp4"
                className="block hover:text-blue-500"
                onClick={() => setIsOpen(false)}
              >
                MP4
              </Link>
              <a
                href="#como-baixar"
                className="block hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Como Baixar
              </a>
              <a
                href="#faq"
                className="block hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </a>
              <a
                href="#instalar"
                className="block bg-primary text-center px-4 py-2 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Instalar Extensão
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
