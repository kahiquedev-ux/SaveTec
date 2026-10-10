import React, { useState } from "react";
import {
  FaDownload,
  FaSpinner,
  FaArrowLeft,
  FaCheckCircle,
  FaMusic,
} from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const VideoInfo = ({ video, format, onBack, url }) => {
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const extractVideoId = (videoUrl) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&?#]+)/,
    ];
    for (const pattern of patterns) {
      const match = videoUrl.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleDownload = async () => {
    setDownloading(true);
    setDownloadProgress(0);
    
    try {
      let qualidade = format === "mp4" ? selectedQuality : "MP3";
      const videoId = extractVideoId(url);

      // Simular progresso
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      // Chamar o backend para obter o link de download
      const response = await axios.post("http://localhost:5000/api/download", {
        url: url,
        titulo: video.title,
        formato: format,
        qualidade: qualidade,
      });

      clearInterval(progressInterval);
      setDownloadProgress(100);

      if (response.data.success) {
        let downloadSuccess = false;
        
        // TENTATIVA 1: Download direto via API pública
        const directApiUrls = {
          mp4: `https://pipedapi.kavin.rocks/streams/${videoId}`,
          mp3: `https://pipedapi.kavin.rocks/streams/${videoId}`
        };

        try {
          const streamResponse = await axios.get(directApiUrls[format]);
          if (format === 'mp4') {
            const videoStream = streamResponse.data.videoStreams?.find(s => s.quality === selectedQuality || s.qualityLabel === selectedQuality);
            if (videoStream?.url) {
              window.open(videoStream.url, '_blank');
              downloadSuccess = true;
            }
          } else {
            const audioStream = streamResponse.data.audioStreams?.[0];
            if (audioStream?.url) {
              window.open(audioStream.url, '_blank');
              downloadSuccess = true;
            }
          }
        } catch (e) {
          console.log("API direta falhou");
        }

        // TENTATIVA 2: Usar api.gomlab.com
        if (!downloadSuccess) {
          const gomlabUrl = format === 'mp4' 
            ? `https://api.gomlab.com/youtube/mp4?url=${encodeURIComponent(url)}&quality=${qualidade}`
            : `https://api.gomlab.com/youtube/mp3?url=${encodeURIComponent(url)}`;
          
          const gomlabResponse = await axios.get(gomlabUrl);
          if (gomlabResponse.data?.url) {
            window.open(gomlabResponse.data.url, '_blank');
            downloadSuccess = true;
          }
        }

        // TENTATIVA 3: Usar y2mate (fallback)
        if (!downloadSuccess) {
          const y2mateUrl = `https://www.y2mate.com/youtube/${videoId}`;
          window.open(y2mateUrl, '_blank');
          toast.success("Redirecionando para serviço de download...");
          downloadSuccess = true;
        }

        if (downloadSuccess) {
          toast.success("Download iniciado!");
          setDownloaded(true);
          setTimeout(() => onBack(), 3000);
        } else {
          throw new Error("Nenhum link disponível");
        }
      }
    } catch (error) {
      console.error("Erro detalhado:", error);
      toast.error("Erro ao gerar download");
      
      // FALLBACK FINAL
      const videoId = extractVideoId(url);
      const finalFallback = `https://en.savefrom.net/1-youtube-video-downloader-5/?video_url=https://www.youtube.com/watch?v=${videoId}`;
      window.open(finalFallback, "_blank");
      setDownloaded(true);
      setTimeout(() => onBack(), 2000);
    } finally {
      setDownloading(false);
    }
  };

  const getLayoutContent = () => {
    if (format === "mp3") {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-green-600/20 to-green-800/20 rounded-2xl p-8 text-center backdrop-blur-sm"
        >
          <FaMusic className="text-7xl text-green-500 mx-auto mb-4 animate-bounce" />
          <h3 className="text-2xl font-bold mb-2">Baixar Música MP3</h3>
          <p className="text-gray-400 mb-6">
            Converta vídeo para MP3 gratuitamente
          </p>
          <div className="bg-green-500/10 rounded-xl p-4 mb-6">
            <p className="text-green-400">✓ Qualidade: MP3 128kbps</p>
            <p className="text-green-400">✓ Tamanho: ~3-5 MB</p>
            <p className="text-green-400">✓ Download direto no seu navegador</p>
          </div>
          
          {downloading && (
            <div className="mb-4">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${downloadProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-2">Gerando link de download...</p>
            </div>
          )}
          
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="btn-mp3 w-full flex items-center justify-center gap-2"
          >
            {downloading ? (
              <>
                <FaSpinner className="animate-spin" /> Gerando link...
              </>
            ) : (
              <>
                <FaDownload /> Baixar MP3 Agora
              </>
            )}
          </button>
          
          <p className="text-xs text-gray-500 mt-4">
            O download será aberto em uma nova aba
          </p>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-2xl p-8 backdrop-blur-sm"
      >
        <h3 className="text-2xl font-bold mb-4 text-center">
          Baixar Vídeo MP4
        </h3>
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full md:w-48 rounded-xl shadow-lg object-cover"
          />
          <div className="flex-1">
            <h4 className="font-bold text-lg mb-2 line-clamp-2">{video.title}</h4>
            <p className="text-gray-400 text-sm mb-4">
              {video.author} • {video.views} visualizações
            </p>

            <label className="block text-sm mb-2 font-semibold">Selecione a qualidade:</label>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {video.formats.mp4.map((q) => (
                <button
                  key={q.quality}
                  onClick={() => setSelectedQuality(q.quality)}
                  className={`p-2 rounded-lg transition-all ${
                    selectedQuality === q.quality
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {q.quality}
                  <span className="text-xs block opacity-75">{q.size}</span>
                </button>
              ))}
            </div>

            {downloading && (
              <div className="mb-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${downloadProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">Preparando download...</p>
              </div>
            )}

            <button
              onClick={handleDownload}
              disabled={!selectedQuality || downloading}
              className="btn-mp4 w-full flex items-center justify-center gap-2"
            >
              {downloading ? (
                <>
                  <FaSpinner className="animate-spin" /> Gerando link...
                </>
              ) : (
                <>
                  <FaDownload /> Baixar Vídeo {selectedQuality || "MP4"}
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              {!selectedQuality 
                ? "Selecione uma qualidade para continuar" 
                : "O download será aberto em uma nova aba"}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  if (downloaded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 text-center"
      >
        <FaCheckCircle className="text-6xl text-white mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Download Iniciado!</h3>
        <p className="text-white/80 mb-4">Seu arquivo está sendo baixado...</p>
        <button
          onClick={onBack}
          className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Baixar outro vídeo
        </button>
      </motion.div>
    );
  }

  return (
    <div className="mt-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
      >
        <FaArrowLeft /> Voltar para formatos
      </button>
      {getLayoutContent()}
    </div>
  );
};

export default VideoInfo;