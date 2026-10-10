import React, { useState } from "react";
import { FaFilm, FaDownload, FaSpinner, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Mp4Page = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const [selectedQuality, setSelectedQuality] = useState(null);
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
      toast.success("Vídeo encontrado! Selecione a qualidade");
    } catch (error) {
      toast.error(error.response?.data?.error || "Erro ao processar");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!selectedQuality) {
      toast.error("Selecione uma qualidade primeiro");
      return;
    }

    setDownloading(true);
    try {
      const selected = videoInfo.formats.mp4.find(
        (q) => q.quality === selectedQuality,
      );

      await axios.post("http://localhost:5000/api/download", {
        url: url,
        titulo: videoInfo.title,
        formato: "mp4",
        qualidade: selectedQuality,
        downloadUrl: selected.url,
      });

      const link = document.createElement("a");
      link.href = selected.url;
      link.download = `${videoInfo.title}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Download do vídeo iniciado!");
    } catch (error) {
      toast.error("Erro ao baixar");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-32 pb-20 px-4 bg-gradient-to-b from-dark to-blue-900/20">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-block p-4 bg-blue-500/20 rounded-full mb-4">
              <FaFilm className="text-6xl text-blue-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Baixador de Vídeos do{" "}
              <span className="text-blue-500">YouTube MP4</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Baixe vídeos do YouTube em MP4 com alta qualidade
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Cole o link do vídeo do YouTube aqui"
                className="input-gradient"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="btn-mp4 flex items-center justify-center gap-2 min-w-[150px]"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Processando...
                  </>
                ) : (
                  <>
                    <FaDownload /> Buscar Vídeo
                  </>
                )}
              </motion.button>
            </div>
          </form>

          {videoInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-2xl p-8"
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
                    {videoInfo.author} • {videoInfo.views} views •{" "}
                    {videoInfo.duration}
                  </p>

                  <label className="block text-sm mb-2">
                    Selecione a qualidade do vídeo:
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
                    {videoInfo.formats.mp4.map((q) => (
                      <button
                        key={q.quality}
                        onClick={() => setSelectedQuality(q.quality)}
                        className={`p-2 rounded-lg transition-all ${
                          selectedQuality === q.quality
                            ? "bg-blue-600 text-white"
                            : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                        }`}
                      >
                        {q.quality}
                        <span className="text-xs block">{q.size}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleDownload}
                    disabled={!selectedQuality || downloading}
                    className="btn-mp4 w-full flex items-center justify-center gap-2"
                  >
                    {downloading ? (
                      <>
                        <FaSpinner className="animate-spin" /> Baixando...
                      </>
                    ) : (
                      <>
                        <FaDownload /> Baixar Vídeo MP4
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>✓ Suporte a 4K, 8K e 60fps</p>
            <p>✓ Download rápido e seguro</p>
            <p>✓ Mantém a qualidade original</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Mp4Page;
