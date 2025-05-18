// Importando módulos necessários e estilos
import React, { useRef, useState, useEffect, forwardRef } from "react";
import PropTypes from "prop-types";
import play from "../../assets/play.png";
import pause from "../../assets/pause.png";
import "./videoPlayer.css";

// Player customizado React
const VideoPlayer = forwardRef(({ src }, ref) => {
  const localVideoRef = useRef(null);
  const videoRef = ref || localVideoRef;
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(false);

  // Play/Pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Atualiza progresso
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    setCurrentTime(video.currentTime);
    setProgress((video.currentTime / video.duration) * 100);
  };

  // Volume
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  // Duração
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    setDuration(video.duration);
  };

  // Mostrar controles ao mover mouse
  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(window._hideControlsTimeout);
    window._hideControlsTimeout = setTimeout(() => setShowControls(false), 2000);
  };

  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
  }, [src]);

  return (
    <div className="video-container" onMouseMove={handleMouseMove}>
      <video
        className="video-screen"
        ref={videoRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
        volume={volume}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
      <div className="video-controls" style={{ opacity: showControls ? 1 : 0 }} tabIndex={0}>
        <input
          className="progress-container"
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progress}
          onChange={e => {
            const video = videoRef.current;
            const newTime = (e.target.value / 100) * video.duration;
            video.currentTime = newTime;
            setProgress(e.target.value);
          }}
          aria-label="Progresso do vídeo"
        />
        <div className="controls-bottom">
          <div className="controls-left">
            <button className="play-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
              <img
                className="botao-player-icon"
                src={isPlaying ? pause : play}
                alt={isPlaying ? "Pause" : "Play"}
                style={{ width: 24, height: 24 }}
              />
            </button>
            <div className="volume-container">
              <input
                className="volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                aria-label="Volume"
              />
            </div>
            <span className="time-display">
              {new Date(currentTime * 1000).toISOString().substr(11, 8)} /{" "}
              {new Date(duration * 1000).toISOString().substr(11, 8)}
            </span>
          </div>
          <div className="controls-right">
            {/* Botão de fullscreen pode ser implementado aqui se desejar */}
          </div>
        </div>
      </div>
    </div>
  );
});

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired, // URL da fonte do vídeo é obrigatória
};

export default VideoPlayer; // Exportando o componente VideoPlayer
