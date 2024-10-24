import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import "../assets/scss/_03-Componentes/_AplicaPersonaliza2.scss";

const AplicaPersonaliza2 = () => {
  const [imagenes, setImagenes] = useState([]);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  useEffect(() => {
    // Cargar las imágenes del JSON
    const fetchImagenes = async () => {
      try {
        const response = await fetch('/aplicaPersonaliza2.json'); // Asegúrate de que este archivo está en public
        const data = await response.json();
        setImagenes(data.imagenes);

        // Verifica si hay imágenes en el JSON y selecciona la primera
        if (data.imagenes && data.imagenes.length > 0) {
          setImagenSeleccionada(data.imagenes[0].url);
        }
      } catch (error) {
        console.error('Error al cargar las imágenes:', error);
      }
    };
    fetchImagenes();
  }, []);

  return (
    <div className="aplica-personaliza2-container">
      <h1 className="aplica-personaliza2-title">Visualización 3D de la Cartera</h1>

      {imagenSeleccionada && (
        <div className="canvas-container">
          <Canvas>
            {/* Luz en la escena */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 0, 5]} />

            {/* Malla y textura de la imagen seleccionada */}
            {imagenSeleccionada && (
              <mesh rotation={[0, 0.5, 0]}>
                <boxGeometry args={[3, 3, 3]} />
                <meshStandardMaterial map={new THREE.TextureLoader().load(imagenSeleccionada)} />
              </mesh>
            )}

            {/* Controles de rotación */}
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      )}

      <div className="image-selector">
        <h3>Selecciona otra imagen:</h3>
        {imagenes.map((imagen) => (
          <button
            key={imagen.id}
            onClick={() => setImagenSeleccionada(imagen.url)}
            className={`image-button ${imagenSeleccionada === imagen.url ? 'selected' : ''}`}
          >
            {imagen.nombre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AplicaPersonaliza2;
