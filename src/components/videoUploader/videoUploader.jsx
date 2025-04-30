import { useState } from "react";
// import axios from "axios";
import UploadForm from "../uploadForm/uploadForm";
import "./videoUploader.css";

const VideoUploader = () => {
  const [progress, setProgress] = useState(0);
  const [fileInfo, setFileInfo] = useState(null);

//   const handleFileUpload = async (file) => {
//     setFileInfo({
//       name: file.name,
//       type: file.type,
//       size: (file.size / 1024 / 1024).toFixed(2), // MB
//     });

//     const formData = new FormData();
//     formData.append("video", file);

//     try {
//       const res = await axios.post("http://localhost:8000/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         onUploadProgress: (e) => {
//           const percent = Math.round((e.loaded * 100) / e.total);
//           setProgress(percent);
//         },
//       });

//       console.log("Upload completo!", res.data);
//     } catch (err) {
//       console.error("Erro no upload:", err);
//     }
//   };

const handleFileUpload = (file) => {
  setFileInfo({
    name: file.name,
    type: file.type,
    size: (file.size / 1024 / 1024).toFixed(2), // em MB
  });

  let fakeProgress = 0;
  setProgress(0);

  const interval = setInterval(() => {
    fakeProgress += 5; // avança 5% por vez
    setProgress(fakeProgress);

    if (fakeProgress >= 100) {
      clearInterval(interval);
      console.log("Upload simulado concluído!");
    }
  }, 200); // a cada 200ms
};

  

  return (
    <div className="upload-wrapper">
      <UploadForm onFileUpload={handleFileUpload} />
      {fileInfo && (
        <div className="file-info">
          <p><strong>Nome:</strong> {fileInfo.name}</p>
          <p><strong>Tipo:</strong> {fileInfo.type}</p>
          <p><strong>Tamanho:</strong> {fileInfo.size} MB</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;