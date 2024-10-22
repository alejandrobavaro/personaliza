import React from 'react';
import { useAplicaPersonaliza3CapasPersonalizacion } from '../context/AplicaPersonaliza3CapasPersonalizacionContext';
import "../assets/scss/_03-Componentes/_AplicaPersonaliza3CapasTextura.scss";

const AplicaPersonaliza3CapasTextura = () => {
  const { setTextura } = useAplicaPersonaliza3CapasPersonalizacion();

  const handleChange = (e) => {
    setTextura(e.target.value); // Actualiza la textura seleccionada
  };

  return (
    <div className="textura-layer">
      <h3>Selecciona una textura:</h3>
      <select onChange={handleChange}>
        <option value="">Seleccionar textura</option>
        <option value="textura1.jpg">Textura 1</option>
        <option value="textura2.jpg">Textura 2</option>
        <option value="textura3.jpg">Textura 3</option>
      </select>
    </div>
  );
};

export default AplicaPersonaliza3CapasTextura;
