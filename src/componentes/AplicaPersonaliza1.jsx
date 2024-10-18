import React, { useState } from 'react';
import "../assets/scss/_03-Componentes/_AplicaPersonaliza1.scss";

const AplicaPersonaliza1 = () => {
  const [base, setBase] = useState('base1'); 
  const [color, setColor] = useState('color1'); 
  const [textura, setTextura] = useState('textura1'); 
  const [accesorios, setAccesorios] = useState('accesorio1'); 
  const [tamaño, setTamaño] = useState('pequeña');
  const [diseño, setDiseño] = useState('rayas');
  const [cierre, setCierre] = useState('cremallera');
  const [forro, setForro] = useState('forro1');
  const [textoGrabado, setTextoGrabado] = useState('');

  const bases = ['base1', 'base2'];
  const colores = ['color1', 'color2'];
  const texturas = ['textura1', 'textura2'];
  const accesoriosOptions = ['accesorio1', 'accesorio2'];
  const tamaños = ['pequeña', 'mediana', 'grande'];
  const diseños = ['rayas', 'puntos', 'flores'];
  const cierres = ['cremallera', 'botón', 'magnético'];
  const forros = ['forro1', 'forro2'];

  const renderOption = (options, selected, setSelected) => {
    return options.map(option => (
      <button
        key={option}
        className={`option-button ${selected === option ? 'selected' : ''}`}
        onClick={() => setSelected(option)}
      >
        {option}
      </button>
    ));
  };

  return (
    <div className="aplica-personaliza1-container">
      <h1 className="aplica-personaliza1-title">Personaliza tu Cartera</h1>

      <div className="selectors">
        <div className="selector">
          <h3>Base</h3>
          {renderOption(bases, base, setBase)}
        </div>
        <div className="selector">
          <h3>Color</h3>
          {renderOption(colores, color, setColor)}
        </div>
        <div className="selector">
          <h3>Textura</h3>
          {renderOption(texturas, textura, setTextura)}
        </div>
        <div className="selector">
          <h3>Accesorios</h3>
          {renderOption(accesoriosOptions, accesorios, setAccesorios)}
        </div>
        <div className="selector">
          <h3>Tamaño</h3>
          {renderOption(tamaños, tamaño, setTamaño)}
        </div>
        <div className="selector">
          <h3>Diseño</h3>
          {renderOption(diseños, diseño, setDiseño)}
        </div>
        <div className="selector">
          <h3>Cierre</h3>
          {renderOption(cierres, cierre, setCierre)}
        </div>
        <div className="selector">
          <h3>Forro Interior</h3>
          {renderOption(forros, forro, setForro)}
        </div>
      </div>

      <div className="text-grabado">
        <h3>Texto Grabado</h3>
        <input
          type="text"
          value={textoGrabado}
          onChange={(e) => setTextoGrabado(e.target.value)}
          placeholder="Escribe tu texto aquí"
        />
      </div>

      <div className="visualizacion">
        <h2>Vista Previa de la Cartera</h2>
        <div className={`cartera ${base} ${color} ${textura} ${accesorios} ${tamaño} ${diseño} ${cierre} ${forro}`}>
          <img src={`/${base}.png`} alt="Cartera" />
          {textoGrabado && <div className="grabado">{textoGrabado}</div>}
        </div>
      </div>
    </div>
  );
};

export default AplicaPersonaliza1;
