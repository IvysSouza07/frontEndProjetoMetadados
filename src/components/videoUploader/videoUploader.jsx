import { useState, useRef } from "react";
import axios from "axios";
import UploadForm from "../uploadForm/uploadForm";
import "./videoUploader.css";
import cancelx from "../../assets/cancel-x.png";
import videofile from "../../assets/video-file.png";
import positive from "../../assets/positive.png"

const VideoUploader = () => {
  const [progress, setProgress] = useState(0);
  const [fileInfo, setFileInfo] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const controllerRef = useRef(null);
  const intervalRef = useRef(null);

  const handleFileUpload = async (file) => {
    setFileInfo({
      name: file.name,
      type: file.type,
      size: (file.size / 1024 / 1024).toFixed(2), // em MB
    });

    const formData = new FormData();
    formData.append("video", file);

    controllerRef.current = new AbortController();

    try {
      const res = await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        signal: controllerRef.current.signal,
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        },
      });

      console.log("Upload completo!", res.data);
      setShowSuccessModal(true);
    } catch (err) {
      if (axios.isCancel(err) || err.name === "CanceledError") {
        console.log("Upload de vídeo cancelado.");
      } else {
        console.error("Erro no Upload", err);
      }
    } finally {
      controllerRef.current = null;
    }
  };

  // Versão fake do upload para testes
  const fakeUpload = (file) => {
    setFileInfo({
      name: file.name,
      type: file.type,
      size: (file.size / 1024 / 1024).toFixed(2),
    });

    let fakeProgress = 0;
    setProgress(0);

    intervalRef.current = setInterval(() => {
      fakeProgress += 5;
      if (fakeProgress > 100) {
        fakeProgress = 100;
      }
      setProgress(fakeProgress);

      if (fakeProgress >= 100) {
        clearInterval(intervalRef.current);
        console.log("Upload simulado concluído!");
        setShowSuccessModal(true);
      }
    }, 100);
  };

  const cancelUpload = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    clearInterval(intervalRef.current);
    setProgress(0);
    setFileInfo(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setShowSuccessModal(false);
    }
  };

  return (
    <div className="upload-wrapper">
      <UploadForm onFileUpload={fakeUpload} /> {/* altere para `handleFileUpload` se quiser upload real */}

      {fileInfo && (
        <div className="upload-info">
          <div className="file-info-div">
            <div className="file-info">
              <img src={videofile} alt="Video Icon" />
              <div className="file-info-data">
                <p><strong>{fileInfo.name}</strong></p>
                <p><strong>{fileInfo.size}</strong> MB</p>
              </div>
            </div>
            <button onClick={cancelUpload} className="cancel-upload-button">
              <img src={cancelx} alt="Cancel Icon" />
            </button>
          </div>

          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <span className="close" onClick={() => setShowSuccessModal(false)}>&times;</span>
            <h3> Upload concluído com sucesso!</h3>
            <img className="positive-icon" src={positive} alt="Positive icon" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
