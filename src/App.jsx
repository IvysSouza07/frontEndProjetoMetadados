import React, { useState } from "react";
import UploadForm from "./components/uploadForm/uploadForm";
import VideoUploader from "./components/videoUploader/videoUploader";
import "./App.css";

function App() {
  const [video, setVideo] = useState(null);

  return (
    <div>
       <VideoUploader />

      {video && (
        <video controls width="500" style={{ marginTop: "20px" }}>
          <source src={URL.createObjectURL(video)} type={video.type} />
          Seu navegador não suporta vídeo.
        </video>
      )}
    </div>
  );
}

export default App;
