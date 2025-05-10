// Importando módulos necessários e estilos
import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import play from "../../assets/play.png"; // Ícone de reprodução
import pause from "../../assets/pause.png"; // Ícone de pausa
import "./videoPlayer.css"; // Estilos específicos para o componente VideoPlayer

// Componente VideoPlayer para reprodução de vídeos com controles personalizados
const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null); // Referência para o elemento de vídeo
  const [isPlaying, setIsPlaying] = useState(false); // Estado de reprodução
  const [progress, setProgress] = useState(0); // Porcentagem de progresso da reprodução

  // Função para alternar entre os estados de reprodução e pausa
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

  // Função para atualizar o progresso conforme o vídeo é reproduzido
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    const percent = (video.currentTime / video.duration) * 100;
    setProgress(percent);
  };

  // Função para manipular alterações manuais na barra de progresso
  const handleProgressChange = (e) => {
    const video = videoRef.current;
    const newTime = (e.target.value / 100) * video.duration;
    video.currentTime = newTime;
    setProgress(e.target.value);
  };

  // Reseta o estado de reprodução quando a fonte do vídeo muda
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
  }, [src]);

  return (
    <div className="custom-video-player">
      <div className="video-container">
      <video className="video-screen"
        ref={videoRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
      />
      </div>
      <div className="controls">
        <button className="botao-player" onClick={togglePlay}>
          <img className="botao-player-icon" src= { isPlaying ? pause : play} alt= {isPlaying ? "Pause" : "Play"} />
        </button>
        <input className="range-bar"
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
        />
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired, // URL da fonte do vídeo é obrigatória
};

export default VideoPlayer; // Exportando o componente VideoPlayer
