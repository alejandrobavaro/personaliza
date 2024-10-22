import React from 'react';
import { useAplicaPersonaliza3CapasPersonalizacion } from '../context/AplicaPersonaliza3CapasPersonalizacionContext';
import "../assets/scss/_03-Componentes/_AplicaPersonaliza3CapasCanvas.scss";

const AplicaPersonaliza3CapasCanvas = () => {
  const { color, textura, accesorios } = useAplicaPersonaliza3CapasPersonalizacion();

  return (
    <div className="canvas-layer">
      {/* Renderizado de la cartera personalizada */}
      <div style={{ backgroundColor: color, backgroundImage: `url(${textura})` }}>
        <h2>Vista previa de la cartera</h2>
        <p>Accesorios seleccionados: {accesorios.join(', ') || "Ninguno"}</p>
      </div>
    </div>
  );
};

export default AplicaPersonaliza3CapasCanvas;
