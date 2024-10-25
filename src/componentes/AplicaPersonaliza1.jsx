import React, { useEffect, useState } from 'react';
import "../assets/scss/_03-Componentes/_AplicaPersonaliza1.scss";

const AplicaPersonaliza1 = () => {
  const [seleccionados, setSeleccionados] = useState({
    solapa: '01-solapa-negro-floather',
    cuerpo: '02-cuerpo-azul-serpiente',
    fuelle: '03-fuelle-azul-gamuzado',
    correa: '04-correa-azul-liso',
    portamanijas: '05-portamanijas-azul-liso',
    herrajes: '06-herrajes-dorado-bronce-natural'
  });
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

  const bocetoImagen = productosData.find(producto =>
    producto.tipo === 'boceto_inicial' && producto.id === bocetoSeleccionado
  )?.imagen;

  const renderOption = (tipo, selected, setSelected) => {
    const options = productosData.filter(producto => producto.tipo === tipo);
    return options.map(option => (
      <button
        key={option.id}
        className={`option-button ${selected === option.id ? 'selected' : ''}`}
        onClick={() => {
          setSelected(option.id);
          setSeleccionados(prev => ({ ...prev, [tipo]: option.id }));
        }}
      >
        {option.descripcion}
      </button>
    ));
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

  const getImagenSeleccionada = (tipo) => {
    const selectedProduct = productosData.find(producto => producto.id === seleccionados[tipo]);
    return selectedProduct ? selectedProduct.imagen : null;
  };

  const handleSaveDesign = () => {
    const designOptions = `
      Boceto: ${bocetoSeleccionado}
      Solapa: ${seleccionados.solapa}
      Cuerpo: ${seleccionados.cuerpo}
      Fuelle: ${seleccionados.fuelle}
      Correa: ${seleccionados.correa}
      Portamanijas: ${seleccionados.portamanijas}
      Herrajes: ${seleccionados.herrajes}
    `.trim();

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
              {bocetoImagen && (
                <img
                  src={bocetoImagen}
                  alt="Boceto Inicial"
                  className="cartera-img"
                  style={{ position: 'absolute', zIndex: 1, width: '100%', height: 'auto' }}
                />
              )}
              {/* Renderizar las imágenes seleccionadas */}
              {['solapa', 'cuerpo', 'fuelle', 'correa', 'portamanijas', 'herrajes'].map(tipo => (
                <img
                  key={tipo}
                  src={getImagenSeleccionada(tipo)}
                  alt={tipo}
                  style={{ position: 'absolute', zIndex: 2, width: '100%', height: 'auto', pointerEvents: 'none' }} 
                />
              ))}
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
                <td>{renderOption('solapa', seleccionados.solapa, (id) => setSeleccionados(prev => ({ ...prev, solapa: id })))} </td>
              </tr>
              <tr>
                <td><h5>Cuerpo</h5></td>
                <td>{renderOption('cuerpo', seleccionados.cuerpo, (id) => setSeleccionados(prev => ({ ...prev, cuerpo: id })))} </td>
              </tr>
              <tr>
                <td><h5>Fuelle</h5></td>
                <td>{renderOption('fuelle', seleccionados.fuelle, (id) => setSeleccionados(prev => ({ ...prev, fuelle: id })))} </td>
              </tr>
              <tr>
                <td><h5>Correa</h5></td>
                <td>{renderOption('correa', seleccionados.correa, (id) => setSeleccionados(prev => ({ ...prev, correa: id })))} </td>
              </tr>
              <tr>
                <td><h5>Portamanijas</h5></td>
                <td>{renderOption('portamanijas', seleccionados.portamanijas, (id) => setSeleccionados(prev => ({ ...prev, portamanijas: id })))} </td>
              </tr>
              <tr>
                <td><h5>Herrajes</h5></td>
                <td>{renderOption('herrajes', seleccionados.herrajes, (id) => setSeleccionados(prev => ({ ...prev, herrajes: id })))} </td>
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
