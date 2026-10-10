import express from 'express';
import axios from 'axios';
import { getDb } from '../database.js';

const router = express.Router();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

function extractVideoId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function formatDurationISO(isoDuration) {
  if (!isoDuration) return "0:00";
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";
  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

router.post("/video-info", async (req, res) => {
  console.log("Recebida requisição:", req.body);
  
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: "URL não fornecida" });
  }

  const videoId = extractVideoId(url);
  console.log("Video ID extraído:", videoId);
  
  if (!videoId) {
    return res.status(400).json({ error: "URL do YouTube inválida" });
  }

  try {
    // Chamar API do YouTube
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`;
    console.log("Chamando API:", apiUrl);
    
    const videoResponse = await axios.get(apiUrl);
    console.log("Resposta da API recebida");

    const videoData = videoResponse.data.items?.[0];
    
    if (!videoData) {
      return res.status(404).json({ error: "Vídeo não encontrado" });
    }

    // Pegar thumbnail de alta qualidade
    const thumbnail = videoData.snippet.thumbnails.maxres?.url || 
                     videoData.snippet.thumbnails.high?.url || 
                     videoData.snippet.thumbnails.medium?.url ||
                     `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    const videoInfo = {
      title: videoData.snippet.title,
      duration: formatDurationISO(videoData.contentDetails.duration),
      thumbnail: thumbnail,
      author: videoData.snippet.channelTitle,
      views: "Visualizações",
      videoId: videoId,
      formats: {
        mp4: [
          { quality: "1080p", size: "~45 MB" },
          { quality: "720p", size: "~25 MB" },
          { quality: "480p", size: "~15 MB" },
          { quality: "360p", size: "~8 MB" },
        ],
        mp3: {
          quality: "MP3 128kbps",
          size: "~3-5 MB",
        },
      },
    };

    console.log("Enviando resposta:", videoInfo.title);
    res.json(videoInfo);
    
  } catch (error) {
    console.error("Erro detalhado:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Dados:", error.response.data);
    }
    
    // Fallback
    const fallbackInfo = {
      title: "Vídeo do YouTube",
      duration: "5:00",
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      author: "YouTube Creator",
      views: "1.000+",
      videoId: videoId,
      formats: {
        mp4: [
          { quality: "1080p", size: "~45 MB" },
          { quality: "720p", size: "~25 MB" },
          { quality: "480p", size: "~15 MB" },
          { quality: "360p", size: "~8 MB" },
        ],
        mp3: {
          quality: "MP3 128kbps",
          size: "~3-5 MB",
        },
      },
    };
    res.json(fallbackInfo);
  }
});

router.post("/download", async (req, res) => {
  const { url, formato, qualidade } = req.body;
  const videoId = extractVideoId(url);
  const ip = req.ip;
  const db = getDb();

  try {
    await db.run(
      "INSERT INTO downloads (url, titulo, formato, qualidade, ip) VALUES (?, ?, ?, ?, ?)",
      [url, `Vídeo ${videoId}`, formato, qualidade, ip]
    );

    const hoje = new Date().toISOString().split("T")[0];
    const analytics = await db.get("SELECT * FROM analytics WHERE data = ?", [hoje]);
    
    if (analytics) {
      await db.run("UPDATE analytics SET total_downloads = total_downloads + 1 WHERE data = ?", [hoje]);
    } else {
      await db.run("INSERT INTO analytics (data, total_downloads) VALUES (?, 1)", [hoje]);
    }

    res.json({
      success: true,
      message: "Download processado!",
      downloadUrl: `https://en.savefrom.net/1-youtube-video-downloader-5/?video_url=https://www.youtube.com/watch?v=${videoId}`
    });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ error: "Erro ao registrar download" });
  }
});

router.get("/stats", async (req, res) => {
  const db = getDb();
  try {
    const totalDownloads = await db.get("SELECT COUNT(*) as total FROM downloads");
    const hoje = new Date().toISOString().split("T")[0];
    const downloadsHoje = await db.get("SELECT total_downloads FROM analytics WHERE data = ?", [hoje]);
    res.json({
      totalDownloads: totalDownloads?.total || 0,
      downloadsHoje: downloadsHoje?.total_downloads || 0,
    });
  } catch (error) {
    res.json({ totalDownloads: 0, downloadsHoje: 0 });
  }
});

export default router;