import React from 'react';
import { useAplicaPersonaliza3CapasPersonalizacion } from '../context/AplicaPersonaliza3CapasPersonalizacionContext';
import "../assets/scss/_03-Componentes/_AplicaPersonaliza3CapasColor.scss";

const AplicaPersonaliza3CapasColor = () => {
  const { setColor } = useAplicaPersonaliza3CapasPersonalizacion();

  const handleChange = (e) => {
    setColor(e.target.value); // Actualiza el color seleccionado
  };

  return (
    <div className="color-layer">
      <h3>Selecciona un color:</h3>
      <input type="color" onChange={handleChange} />
    </div>
  );
};

export default AplicaPersonaliza3CapasColor;
