import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAplicaPersonaliza3CapasPersonalizacion } from '../context/AplicaPersonaliza3CapasPersonalizacionContext';
import "../assets/scss/_03-Componentes/_AplicaPersonaliza3GaleriaPersonalizable.scss";

const AplicaPersonaliza3GaleriaPersonalizable = () => {
  const { productoId } = useParams();
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const { color, setColor } = useAplicaPersonaliza3CapasPersonalizacion();

  useEffect(() => {
    fetch("/aplicapersonaliza3Galeria.json")
      .then((response) => response.json())
      .then((data) => {
        const producto = data.componentes.flap;
        setProductoSeleccionado(producto);
        setColor(producto?.opciones[0]?.colores[0]?.nombre || '#FFFFFF');
      })
      .catch((error) => console.error("Error al cargar el JSON:", error));
  }, [setColor]);

  if (!productoSeleccionado) {
    return <div>Producto no encontrado.</div>;
  }

  const handleColorChange = (color) => {
    setColor(color);
  };

  return (
    <div className="personaliza-producto-container">
      <h1>{productoSeleccionado.titulo}</h1>
      <div className="producto-grid">
        <div className="producto-preview">
          <img
            src={productoSeleccionado.opciones[0]?.colores[0]?.imagen}
            alt={productoSeleccionado.titulo}
            style={{ borderColor: color }}
          />
        </div>

        <div className="personalizacion-capas">
          <h3>Selecciona un material y color:</h3>
          <table className="material-color-table">
            <thead>
              <tr>
                <th>Material</th>
                <th>Colores</th>
              </tr>
            </thead>
            <tbody>
              {productoSeleccionado.opciones.map((opcion) => (
                <tr key={opcion.material}>
                  <td>{opcion.material}</td>
                  <td>
                    {opcion.colores.map((colorOption) => (
                      <button
                        key={colorOption.nombre}
                        className="color-option"
                        style={{ backgroundColor: colorOption.nombre }}
                        onClick={() => handleColorChange(colorOption.nombre)}
                      >
                        <img src={colorOption.imagen} alt={colorOption.nombre} />
                        {colorOption.nombre === color ? "✓" : ""}
                      </button>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="personalizar-acciones">
            <button className="guardar-btn">Guardar diseño</button>
            <button className="previsualizar-btn">Previsualizar diseño</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AplicaPersonaliza3GaleriaPersonalizable;
