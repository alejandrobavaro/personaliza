import React, { useEffect, useState } from 'react';
import "../assets/scss/_03-Componentes/_AplicaPersonaliza1.scss";

const AplicaPersonaliza1 = () => {
  const [solapa, setSolapa] = useState('solapa-negro-floather');
  const [cuerpo, setCuerpo] = useState('cuerpo-azul-serpiente');
  const [fuelle, setFuelle] = useState('fuelle-azul-gamuzado');
  const [correa, setCorrea] = useState('correa-azul-liso');
  const [portamanijas, setPortamanijas] = useState('portamanijas-azul-liso');
  const [herrajes, setHerrajes] = useState('herrajes-dorado-bronce-natural');
  const [bocetoSeleccionado, setBocetoSeleccionado] = useState('boceto-1');
  const [productosData, setProductosData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/aplicapersonaliza1.json');
        const data = await response.json();
        setProductosData(data.productos);
      } catch (error) {
        console.error('Error al cargar los datos del JSON:', error);
      }
    };
    fetchData();
  }, []);

  const imagenSeleccionada = productosData.find(producto => 
    producto.solapa === solapa && producto.cuerpo === cuerpo && producto.fuelle === fuelle
  )?.imagen;

  const bocetoImagen = productosData.find(producto => 
    producto.tipo === 'boceto_inicial' && producto.id === bocetoSeleccionado
  )?.imagen;

  const renderOption = (options, selected, setSelected) => {
    return options.map(option => {
      const [id, description] = option.split('|');
      return (
        <button
          key={id}
          className={`option-button ${selected === id ? 'selected' : ''}`}
          onClick={() => setSelected(id)}
        >
          {description}
        </button>
      );
    });
  };

  const renderBocetos = () => {
    return productosData
      .filter(producto => producto.tipo === 'boceto_inicial')
      .map(producto => (
        <button 
          key={producto.id} 
          className={`boceto-button ${bocetoSeleccionado === producto.id ? 'selected' : ''}`}
          onClick={() => setBocetoSeleccionado(producto.id)}
        >
          <img src={producto.imagen} alt={producto.id} className="boceto-img" />
        </button>
      ));
  };

  const handleSaveDesign = () => {
    const designOptions = [
      `Boceto: ${bocetoSeleccionado}`,
      `Solapa: ${solapa}`,
      `Cuerpo: ${cuerpo}`,
      `Fuelle: ${fuelle}`,
      `Correa: ${correa}`,
      `Portamanijas: ${portamanijas}`,
      `Herrajes: ${herrajes}`
    ].join('\n');

    const blob = new Blob([designOptions], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'diseño_cartera.txt';
    link.click();
  };

  return (
    <div className="aplica-personaliza1-container">
      <h1 className="aplica-personaliza1-title">Aplica - Personaliza</h1>

      <div className="content-container">
        <div className="left-section">
          <div className="visualizacion">
            <h2>Vista Previa de la Cartera</h2>
            <hr />
            <div className="cartera">
              <img
                src={bocetoImagen}
                alt="Boceto Inicial"
                className="cartera-img"
                style={{ position: 'absolute', zIndex: 1 }}
              />
              {imagenSeleccionada ? (
                <img
                  src={imagenSeleccionada}
                  alt="Cartera Personalizada"
                  className="cartera-img"
                  style={{ position: 'absolute', zIndex: 2 }}
                />
              ) : (
                <p>No se encontró imagen para la selección actual</p>
              )}
            </div>
          </div>
          <div className="boceto-inicial">
            <h2>Boceto Inicial</h2>
            <div className="boceto-images">
              {renderBocetos()}
            </div>
          </div>
        </div>

        <div className="right-section">
          <h2>Personalicemos tu Producto</h2>
          <hr />
          <table className="options-table">
            <tbody>
              <tr>
                <td><h5>Solapa</h5></td>
                <td>{renderOption([
                  '01-solapa-azul-serpiente|Solapa Azul Serpiente',
                  '01-solapa-blanco-liso|Solapa Blanco Liso',
                  '01-solapa-blanco-tramado|Solapa Blanco Tramado',
                  '01-solapa-negro-floather|Solapa Negro Floather',
                  '01-solapa-negro-lagarto-transfer|Solapa Negro Lagarto Transfer',
                  '01-solapa-negro-serpiente|Solapa Negro Serpiente'
                ], solapa, setSolapa)}</td>
              </tr>
              <tr>
                <td><h5>Cuerpo</h5></td>
                <td>{renderOption([
                  '02-cuerpo-azul-serpiente|Cuerpo Azul Serpiente',
                  '02-cuerpo-blanco-liso|Cuerpo Blanco Liso',
                  '02-cuerpo-lila-senna-figure|Cuerpo Lila Senna Figure',
                  '02-cuerpo-negro-lagarto-transfer|Cuerpo Negro Lagarto Transfer',
                  '02-cuerpo-negro-listo|Cuerpo Negro Listo',
                  '02-cuerpo-rojo-liso|Cuerpo Rojo Liso',
                  '02-cuerpo-verde-liso|Cuerpo Verde Liso'
                ], cuerpo, setCuerpo)}</td>
              </tr>
              <tr>
                <td><h5>Fuelle</h5></td>
                <td>{renderOption([
                  '03-fuelle-azul-gamuzado|Fuelle Azul Gamuzado',
                  '03-fuelle-negro-gamuzado|Fuelle Negro Gamuzado',
                  '03-fuelle-rojo-gamuzado|Fuelle Rojo Gamuzado',
                  '03-fuelle-verde-gamuzado|Fuelle Verde Gamuzado',
                  '03-fuelle-violeta-gamuzado|Fuelle Violeta Gamuzado'
                ], fuelle, setFuelle)}</td>
              </tr>
              <tr>
                <td><h5>Correa</h5></td>
                <td>{renderOption([
                  '04-correa-amarillo-liso|Correa Amarillo Liso',
                  '04-correa-azul-liso|Correa Azul Liso',
                  '04-correa-negro-liso|Correa Negro Liso',
                  '04-correa-rojo-liso|Correa Rojo Liso',
                  '04-correa-violeta-listo|Correa Violeta Listo'
                ], correa, setCorrea)}</td>
              </tr>
              <tr>
                <td><h5>Portamanijas</h5></td>
                <td>{renderOption([
                  '05-portamanijas-azul-liso|Portamanijas Azul Liso',
                  '05-portamanijas-blanco-liso|Portamanijas Blanco Liso',
                  '05-portamanijas-rojo-liso|Portamanijas Rojo Liso',
                  '05-portamanijas-violeta-liso|Portamanijas Violeta Liso'
                ], portamanijas, setPortamanijas)}</td>
              </tr>
              <tr>
                <td><h5>Herrajes</h5></td>
                <td>{renderOption([
                  '06-herrajes-dorado-bronce-natural|Herrajes Dorado Bronce Natural',
                  '06-herrajes-plateado-niquel|Herrajes Plateado Niquel'
                ], herrajes, setHerrajes)}</td>
              </tr>
            </tbody>
          </table>
          <div className="save-share-buttons">
            <button className="save-button" onClick={handleSaveDesign}>Guardar Diseño</button>
            <button className="share-button">Compartir Diseño</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AplicaPersonaliza1;
