import { useState } from "react";
import React from "react";
import "./uploadForm.css";

const UploadForm = ({ onFileUpload }) => {
    const [isDragging, setIsDragging] = useState(false);
    
const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
        onFileUpload(file);
    } else {
        alert("Por favor envie um arquivo de vídeo.");
    }
};

const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
};

const handleDragLeave = () => {
    setIsDragging(false);
};

const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
        onFileUpload(file);
    }
};

  return (
    <div
      className={`upload-container ${isDragging ? "dragging" : ""}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        accept="video/*"
        id="fileInput"
        hidden
        onChange={handleFileChange}
      />
      <label htmlFor="fileInput" className="upload-label">
        <p>Selecione ou arraste um arquivo de vídeo</p>
        <img src='src/assets/search-file.png' alt="Upload Icon" className="upload-icon" />
      </label>
    </div>
  );
};

export default UploadForm;