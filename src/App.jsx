// Importando React e o componente VideoUploader
import React from "react";
import VideoUploader from "./components/videoUploader/videoUploader";
import "./App.css"; // Importando estilos globais para o componente App

// Componente principal da aplicação
function App() {
  return (
    <div>
      <VideoUploader /> {/* Renderizando o componente VideoUploader */}
    </div>
  );
}

export default App; // Exportando o componente App como exportação padrão
