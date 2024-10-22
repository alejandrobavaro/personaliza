import React from 'react';
import { useAplicaPersonaliza3CapasPersonalizacion } from '../context/AplicaPersonaliza3CapasPersonalizacionContext';
import "../assets/scss/_03-Componentes/_AplicaPersonaliza3CapasAccesorios.scss";

const AplicaPersonaliza3CapasAccesorios = () => {
  const { setAccesorios } = useAplicaPersonaliza3CapasPersonalizacion();

  const handleChange = (e) => {
    const value = e.target.value;
    setAccesorios((prev) => 
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
    );
  };

  return (
    <div className="accesorios-layer">
      <h3>Selecciona accesorios:</h3>
      <label>
        <input type="checkbox" value="accesorio1" onChange={handleChange} />
        Accesorio 1
      </label>
      <label>
        <input type="checkbox" value="accesorio2" onChange={handleChange} />
        Accesorio 2
      </label>
    </div>
  );
};

export default AplicaPersonaliza3CapasAccesorios;
