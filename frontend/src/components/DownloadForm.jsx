import React, { useState } from "react";
import { FaDownload, FaSpinner, FaMusic, FaFilm } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import VideoInfo from "./VideoInfo";

const DownloadForm = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);

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
      toast.success("Vídeo encontrado! Escolha o formato");
    } catch (error) {
      toast.error(error.response?.data?.error || "Erro ao processar o vídeo");
    } finally {
      setLoading(false);
    }
  };

  const handleFormatSelect = (format) => {
    setSelectedFormat(format);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Cole o link do seu vídeo aqui (ex: https://youtube.com/watch?v=...)"
            className="input-gradient"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center justify-center gap-2 min-w-[150px]"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" /> Processando...
              </>
            ) : (
              <>
                <FaDownload /> Baixar
              </>
            )}
          </motion.button>
        </div>
      </form>

      <p className="text-center text-gray-500 text-sm">
        Ao usar nosso serviço, você aceita nossos Termos de Serviço e Política
        de Privacidade
      </p>

      {videoInfo && !selectedFormat && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <h3 className="text-center text-xl font-semibold mb-4">
            Escolha o formato de download:
          </h3>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFormatSelect("mp3")}
              className="btn-mp3 flex flex-col items-center gap-3 p-8 min-w-[200px]"
            >
              <FaMusic className="text-5xl" />
              <span className="text-xl font-bold">MP3</span>
              <span className="text-sm">Baixar música</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFormatSelect("mp4")}
              className="btn-mp4 flex flex-col items-center gap-3 p-8 min-w-[200px]"
            >
              <FaFilm className="text-5xl" />
              <span className="text-xl font-bold">MP4</span>
              <span className="text-sm">Baixar vídeo</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {videoInfo && selectedFormat && (
          <VideoInfo
            video={videoInfo}
            format={selectedFormat}
            onBack={() => setSelectedFormat(null)}
            url={url}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DownloadForm;
