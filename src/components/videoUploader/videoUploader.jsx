// Importando módulos necessários e estilos
import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import UploadForm from "../uploadForm/uploadForm"; // Componente para upload de arquivos
import VideoPlayer from "../videoPlayer/videoPlayer"; // Componente para reprodução de vídeos
import "./videoUploader.css"; // Estilos específicos para o componente VideoUploader
import cancelx from "../../assets/cancel-x.png"; // Ícone de cancelamento
import videofile from "../../assets/video-file.png"; // Ícone de arquivo de vídeo
import positive from "../../assets/positive.png"; // Ícone de sucesso

// Componente VideoUploader gerencia uploads de vídeo e exibe o progresso
const VideoUploader = () => {
  const [progress, setProgress] = useState(0); // Porcentagem de progresso do upload
  const [fileInfo, setFileInfo] = useState(null); // Informações sobre o arquivo enviado
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Visibilidade do modal de sucesso
  const [uploadMode, setUploadMode] = useState(
    import.meta.env.VITE_USE_FAKE_UPLOAD === "true" // Alterna entre upload real e simulado
  );
  const [error, setError] = useState(null); // Mensagem de erro durante o upload
  const [videoURL, setVideoURL] = useState(null); // URL do vídeo enviado
  const [isUploadComplete, setIsUploadComplete] = useState(false); // Status de conclusão do upload

  const controllerRef = useRef(null); // Referência para cancelar uploads reais
  const intervalRef = useRef(null); // Referência para gerenciar intervalos de upload simulado

  // Função para lidar com uploads reais usando Axios
  const handleRealUpload = async (file) => {
    setFileInfo({
      name: file.name,
      type: file.type,
      size: (file.size / (1024 * 1024)).toFixed(2),
    });
    setError(null);

    const formData = new FormData();
    formData.append("video", file);

    controllerRef.current = new AbortController();

    try {
      await axios.post(
        import.meta.env.VITE_API_URL + import.meta.env.VITE_UPLOAD_ENDPOINT,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          signal: controllerRef.current.signal,
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / e.total);
            setProgress(percent);
          },
        }
      );

      setShowSuccessModal(true);
      setVideoURL(URL.createObjectURL(file));
      setIsUploadComplete(true);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Upload cancelado pelo usuário");
      } else {
        setError(`Erro no upload: ${err.message}`);
        console.error("Erro no upload", err);
      }
    } finally {
      controllerRef.current = null;
    }
  };

  // Função para simular uploads com progresso falso
  const fakeUpload = (file) => {
    setFileInfo({
      name: file.name,
      type: file.type,
      size: (file.size / (1024 * 1024)).toFixed(2),
    });
    setError(null);

    let fakeProgress = 0;
    setProgress(0);

    const speeds = [3, 5, 8, 2, 10];
    let currentSpeed = 0;

    intervalRef.current = setInterval(() => {
      if (Math.random() > 0.7) {
        currentSpeed = Math.floor(Math.random() * speeds.length);
      }

      fakeProgress += speeds[currentSpeed];

      if (fakeProgress > 85 && fakeProgress < 100) {
        fakeProgress += 0.5;
      }

      if (fakeProgress >= 100) {
        fakeProgress = 100;
        clearInterval(intervalRef.current);
        setTimeout(() => {
          setShowSuccessModal(true);
          setVideoURL(URL.createObjectURL(file));
          setIsUploadComplete(true);
        }, 300);
      }

      setProgress(fakeProgress);
    }, 200 + Math.random() * 300);
  };

  // Função para lidar com uploads de arquivos com base no modo selecionado
  const handleUpload = (file) => {
    return uploadMode ? fakeUpload(file) : handleRealUpload(file);
  };

  // Função para cancelar uploads em andamento
  const cancelUpload = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    clearInterval(intervalRef.current);
    setProgress(0);
    setFileInfo(null);
    setError(null);
    setVideoURL(null);
  };

  // Função para lidar com cliques fora do modal para fechá-lo
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setShowSuccessModal(false);
    }
  };

  return (
    <div className="upload-wrapper">
      {!isUploadComplete && (
        <>
          <div className="upload-mode-toggle">
            <label>
              <input
                type="checkbox"
                checked={uploadMode}
                onChange={() => setUploadMode(!uploadMode)}
              />
              Usar Upload Simulado
            </label>
          </div>

          <UploadForm onFileUpload={handleUpload} />
        </>
      )}

      {!isUploadComplete && fileInfo && (
        <div className="upload-info">
          <div className="file-info-div">
            <div className="file-info">
              <img src={videofile} alt="Ícone de vídeo" />
              <div className="file-info-data">
                <p><strong>{fileInfo.name}</strong></p>
                <p><strong>{fileInfo.size}</strong> MB</p>
              </div>
            </div>
            <button onClick={cancelUpload} className="cancel-upload-button">
              <img src={cancelx} alt="Cancelar upload" />
            </button>
          </div>

          <div className="progress-bar" data-progress={progress}>
            <div
              className={`progress ${error ? "error" : ""}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
      )}

      {showSuccessModal && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <span
              className="close"
              onClick={() => setShowSuccessModal(false)}
            >
              &times;
            </span>
            <h3>Upload concluído com sucesso!</h3>
            <img className="positive-icon" src={positive} alt="Sucesso" />
          </div>
        </div>
      )}

      {videoURL && (
        <div className="video-preview">
          <VideoPlayer src={videoURL} />
        </div>
      )}
    </div>
  );
};

VideoUploader.propTypes = {};

export default VideoUploader;
