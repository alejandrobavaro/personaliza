import React from 'react';
import { useAplicaPersonaliza3CapasPersonalizacion } from '../context/AplicaPersonaliza3CapasPersonalizacionContext';

const AplicaPersonaliza3CapasBase = () => {
  const { base, setBase } = useAplicaPersonaliza3CapasPersonalizacion();

  return (
    <div>
      <h3>Base de la Cartera</h3>
      <button onClick={() => setBase('base1')}>Seleccionar Base 1</button>
      <button onClick={() => setBase('base2')}>Seleccionar Base 2</button>
      <p>Base actual: {base}</p>
    </div>
  );
};

export default AplicaPersonaliza3CapasBase;
