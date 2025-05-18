// Importando módulos necessários e estilos
import React from "react";
import PropTypes from "prop-types";
import "./uploadForm.css"; // Estilos específicos para o componente UploadForm
import searchfile from "../../assets/search-file.png"; // Ícone para busca de arquivos

// Componente UploadForm para lidar com uploads de arquivos
const UploadForm = ({ onFileUpload }) => {
  // Estado para rastrear interação de arrastar e soltar
  const [isDragging, setIsDragging] = React.useState(false); // Indica se um arquivo está sendo arrastado sobre o componente

  // Função para lidar com o evento de soltar arquivo
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

  // Função para lidar com o evento de arrastar sobre o componente
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Função para lidar com o evento de sair do componente ao arrastar
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Função para lidar com a seleção de arquivos via input
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
        <img src={searchfile} alt="Ícone de Upload" className="upload-icon" />
      </label>
    </div>
  );
};

UploadForm.propTypes = {
  onFileUpload: PropTypes.func.isRequired, // Função de callback para upload de arquivos
};

export default UploadForm; // Exportando o componente UploadForm