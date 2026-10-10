import React, { useState } from "react";
import { FaMusic, FaDownload, FaSpinner, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Mp3Page = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const [downloading, setDownloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      toast.error("Por favor, insira uma URL do YouTube");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/video-info",
        { url },
      );
      setVideoInfo(response.data);
      toast.success("Música encontrada! Clique em baixar");
    } catch (error) {
      toast.error(error.response?.data?.error || "Erro ao processar");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await axios.post("http://localhost:5000/api/download", {
        url: url,
        titulo: videoInfo.title,
        formato: "mp3",
        qualidade: "MP3 128kbps",
        downloadUrl: videoInfo.formats.mp3.url,
      });

      const link = document.createElement("a");
      link.href = videoInfo.formats.mp3.url;
      link.download = `${videoInfo.title}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Download da música iniciado!");
    } catch (error) {
      toast.error("Erro ao baixar");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-32 pb-20 px-4 bg-gradient-to-b from-dark to-green-900/20">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-block p-4 bg-green-500/20 rounded-full mb-4">
              <FaMusic className="text-6xl text-green-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Baixador de Músicas do{" "}
              <span className="text-green-500">YouTube MP3</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Converta vídeos do YouTube para MP3 gratuitamente
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Cole o link do vídeo ou música do YouTube aqui"
                className="input-gradient"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="btn-mp3 flex items-center justify-center gap-2 min-w-[150px]"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Processando...
                  </>
                ) : (
                  <>
                    <FaDownload /> Converter MP3
                  </>
                )}
              </motion.button>
            </div>
          </form>

          {videoInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-green-600/20 to-green-800/20 rounded-2xl p-8"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={videoInfo.thumbnail}
                  alt={videoInfo.title}
                  className="w-full md:w-48 rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{videoInfo.title}</h3>
                  <p className="text-gray-400 mb-4">
                    {videoInfo.author} • {videoInfo.duration}
                  </p>

                  <div className="bg-green-500/10 rounded-xl p-4 mb-6">
                    <p className="text-green-400">✓ Formato: MP3 128kbps</p>
                    <p className="text-green-400">
                      ✓ Qualidade de áudio premium
                    </p>
                    <p className="text-green-400">
                      ✓ Compatível com todos os dispositivos
                    </p>
                  </div>

                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="btn-mp3 w-full flex items-center justify-center gap-2"
                  >
                    {downloading ? (
                      <>
                        <FaSpinner className="animate-spin" /> Baixando...
                      </>
                    ) : (
                      <>
                        <FaDownload /> Baixar Música MP3 Grátis
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>✓ Downloads ilimitados de música MP3</p>
            <p>✓ Conversão rápida e segura</p>
            <p>✓ Qualidade de áudio original</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Mp3Page;
