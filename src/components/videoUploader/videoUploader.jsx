import { useState,useRef } from "react";
import axios from "axios";
import UploadForm from "../uploadForm/uploadForm";
import "./videoUploader.css";
import cancelx from "../../assets/cancel-x.png";
import videofile from "../../assets/video-file.png";

const VideoUploader = () => {
  const [progress, setProgress] = useState(0);
  const [fileInfo, setFileInfo] = useState(null);

  const controllerRef = useRef(null);
  const handleFileUpload = async (file) => {
    setFileInfo({
      name: file.name,
      type: file.type,
      size: (file.size / 1024 / 1024).toFixed(2), // MB
    });

    const formData = new FormData();
    formData.append("video", file);

    controllerRef.current = new AbortController();

    try {
      const res = await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        },
      });

      console.log("Upload completo!", res.data);
    } catch (err) {
      if (axios.isCancel(err) || err.name == 'CanceledError'){
        console.log("Upload de vídeo cancelado.");
      } else {
        console.error("Erro no Upload", err);
      }
    }
  };

// const intervalRef = useRef(null);

// const handleFileUpload = (file) => {
//   setFileInfo({
//     name: file.name,
//     type: file.type,
//     size: (file.size / 1024 / 1024).toFixed(2), // em MB
//   });

//   let fakeProgress = 0;
//   setProgress(0);

//   const interval = setInterval(() => {
//     fakeProgress += 1; // avança 5% por vez
//     setProgress(fakeProgress);

//     if (fakeProgress >= 100) {
//       clearInterval(interval);
//       console.log("Upload simulado concluído!");
//     }
//   }, 200); // a cada 200ms
// };

// const cancelUpload = () => {
//   clearInterval(intervalRef.current);
//   setProgress(0);
//   setFileInfo(null);
//   console.log("Upload simulado cancelado!")
// }

  

  return (
    <div className="upload-wrapper">
      <UploadForm onFileUpload={handleFileUpload} />
      {fileInfo && (
        <div className="upload-info">

        <div className="file-info-div">

          <div className="file-info">
          
          <img src={videofile} alt="Video Icon" />
          <div className="file-info-data">
          <p><strong>{fileInfo.name}</strong> </p>
          <p><strong>{fileInfo.size}</strong>  MB</p>
          </div>
          
          </div>

          <button onClick={cancelUpload} className="cancel-upload-button" >
            <img src = {cancelx} alt="Cancel Icon"/>
          </button>

        </div>

          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;