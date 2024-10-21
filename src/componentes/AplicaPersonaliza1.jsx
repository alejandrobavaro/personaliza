import React, { useEffect, useState } from 'react';
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
  const [material, setMaterial] = useState('cuero');
  const [productosData, setProductosData] = useState([]);

  useEffect(() => {
    // Cargar los datos del JSON
    const fetchData = async () => {
      try {
        const response = await fetch('/aplicapersonaliza1.json'); // Ruta desde la carpeta public
        const data = await response.json();
        setProductosData(data.productos);
      } catch (error) {
        console.error('Error al cargar los datos del JSON:', error);
      }
    };
    fetchData();
  }, []);

  // Encontrar el producto en base a las selecciones
  const productoSeleccionado = productosData.find(producto =>
    producto.base === base && producto.color === color && producto.textura === textura
  );

  // Encontrar la imagen correspondiente al material seleccionado
  const imagenSeleccionada = productoSeleccionado?.materiales.find(m => m.material === material)?.imagen;

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
      <h1 className="aplica-personaliza1-title">Aplica - Personaliza</h1>

      <div className="content-container">
        <div className="left-section">
          <div className="visualizacion">
            <h2>Vista Previa de la Cartera</h2>
            <hr />

            <div className={`cartera ${base} ${color} ${textura} ${accesorios} ${tamaño} ${diseño} ${cierre} ${forro} ${material}`}>
              {imagenSeleccionada ? (
                <img
                  src={imagenSeleccionada}
                  alt="Cartera Personalizada"
                  className="cartera-img"
                />
              ) : (
                <p>No se encontró imagen para la selección actual</p>
              )}
            </div>
          </div>
        </div>

        <div className="right-section">
          <h2>Personalicemos tu Producto</h2>
          <hr />
          <table className="options-table">
            <tbody>
              <tr>
                <td><h5>Base</h5></td>
                <td>{renderOption(['base1', 'base2', 'base3', 'base4', 'base5'], base, setBase)}</td>
              </tr>
              <tr>
                <td><h5>Color</h5></td>
                <td>{renderOption(['color1', 'color2', 'color3', 'color4'], color, setColor)}</td>
              </tr>
              <tr>
                <td><h5>Textura</h5></td>
                <td>{renderOption(['textura1', 'textura2', 'textura3'], textura, setTextura)}</td>
              </tr>
              <tr>
                <td><h5>Material</h5></td>
                <td>{renderOption(['cuero', 'sintético', 'tela', 'nylon'], material, setMaterial)}</td>
              </tr>
              <tr>
                <td><h5>Accesorios</h5></td>
                <td>{renderOption(['accesorio1', 'accesorio2', 'accesorio3'], accesorios, setAccesorios)}</td>
              </tr>
              <tr>
                <td><h5>Tamaño</h5></td>
                <td>{renderOption(['pequeña', 'mediana', 'grande'], tamaño, setTamaño)}</td>
              </tr>
              <tr>
                <td><h5>Diseño</h5></td>
                <td>{renderOption(['elegante', 'sport', 'multiuso'], diseño, setDiseño)}</td>
              </tr>
              <tr>
                <td><h5>Cierre</h5></td>
                <td>{renderOption(['cremallera', 'botón', 'magnético'], cierre, setCierre)}</td>
              </tr>
              <tr>
                <td><h5>Forro Interior</h5></td>
                <td>{renderOption(['forro1', 'forro2', 'forro3', 'forro4'], forro, setForro)}</td>
              </tr>
            </tbody>
          </table>

          <div className="save-share-buttons">
            <button className="save-button">Guardar Diseño</button>
            <button className="share-button">Compartir en Redes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AplicaPersonaliza1;



// import React, { useState } from 'react';
// import "../assets/scss/_03-Componentes/_AplicaPersonaliza1.scss";

// const AplicaPersonaliza1 = () => {
//   const [base, setBase] = useState('base1');
//   const [color, setColor] = useState('color1');
//   const [textura, setTextura] = useState('textura1');
//   const [accesorios, setAccesorios] = useState('accesorio1');
//   const [tamaño, setTamaño] = useState('pequeña');
//   const [diseño, setDiseño] = useState('rayas');
//   const [cierre, setCierre] = useState('cremallera');
//   const [forro, setForro] = useState('forro1');
//   const [material, setMaterial] = useState('cuero');

//   const bases = ['base1', 'base2', 'base3', 'base4', 'base5'];
//   const texturas = ['textura1', 'textura2', 'textura3'];
//   const colores = ['color1', 'color2', 'color3', 'color4'];
//   const accesoriosOptions = ['accesorio1', 'accesorio2', 'accesorio3'];
//   const tamaños = ['pequeña', 'mediana', 'grande'];
//   const diseños = ['elegante', 'sport', 'multiuso'];
//   const cierres = ['cremallera', 'botón', 'magnético'];
//   const forros = ['forro1', 'forro2', 'forro3', 'forro4'];
//   const materiales = ['cuero', 'sintético', 'tela', 'nylon'];

//   const renderOption = (options, selected, setSelected) => {
//     return options.map(option => (
//       <button
//         key={option}
//         className={`option-button ${selected === option ? 'selected' : ''}`}
//         onClick={() => setSelected(option)}
//       >
//         {option}
//       </button>
//     ));
//   };

//   return (
//     <div className="aplica-personaliza1-container">
//       <h1 className="aplica-personaliza1-title">Aplica - Personaliza</h1>


//       <div className="content-container">
//         <div className="left-section">
//           <div className="visualizacion">
//             <h2>Vista Previa de la Cartera</h2>
//             <hr />

//             <div className={`cartera ${base} ${color} ${textura} ${accesorios} ${tamaño} ${diseño} ${cierre} ${forro} ${material}`}>
              
//               <img
//                 src={`/img/11-imagenes-personaliza1/${base}-${color}-${textura}.jpeg`}

//                 // src={`/img/11-imagenes-personaliza1/${base}-${color}-${textura}-${material}.jpeg`}

//                 alt="Cartera"
//                 className="cartera-img"
//               />
//             </div>
//           </div>
//         </div>

    

//         <div className="right-section">
         
//           <h2>Personalicemos tu Producto</h2>
//           <hr />
//           <table className="options-table">
//             <tbody>
//               <tr>
//                 <td><h5>Base</h5></td>
//                 <td>{renderOption(bases, base, setBase)}</td>
//               </tr>
//               <tr>
//                 <td><h5>Color</h5></td>
//                 <td>{renderOption(colores, color, setColor)}</td>
//               </tr>
//               <tr>
//                 <td><h5>Textura</h5></td>
//                 <td>{renderOption(texturas, textura, setTextura)}</td>
//               </tr>
//               <tr>
//                 <td><h5>Material</h5></td>
//                 <td>{renderOption(materiales, material, setMaterial)}</td>
//               </tr>
//               <tr>
//                 <td><h5>Accesorios</h5></td>
//                 <td>{renderOption(accesoriosOptions, accesorios, setAccesorios)}</td>
//               </tr>
//               <tr>
//                 <td><h5>Tamaño</h5></td>
//                 <td>{renderOption(tamaños, tamaño, setTamaño)}</td>
//               </tr>
//               <tr>
//                 <td><h5>Diseño</h5></td>
//                 <td>{renderOption(diseños, diseño, setDiseño)}</td>
//               </tr>
//               <tr>
//                 <td><h5>Cierre</h5></td>
//                 <td>{renderOption(cierres, cierre, setCierre)}</td>
//               </tr>
//               <tr>
//                 <td><h5>Forro Interior</h5></td>
//                 <td>{renderOption(forros, forro, setForro)}</td>
//               </tr>
//             </tbody>
//           </table>

//           <div className="save-share-buttons">
//             <button className="save-button">Guardar Diseño</button>
//             <button className="share-button">Compartir en Redes</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AplicaPersonaliza1;
