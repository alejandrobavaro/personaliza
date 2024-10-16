import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "../assets/scss/_03-Componentes/_Servicio.scss";

const Servicio = () => {
  const [servicios, setServicios] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/servicio.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la red");
        }
        return response.json();
      })
      .then((data) => setServicios(data))
      .catch((error) => {
        console.error("Error loading servicios:", error);
        setError("No se pudieron cargar los servicios.");
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="servicio-grid-container">
      <h2 className="servicio-title">Servicio</h2>
      {error && <p className="error-message">{error}</p>} {/* Muestra mensaje de error */}
      <div className="servicio-grid">
        {servicios.map((servicio) => (
          <div key={servicio.id} className="servicio-card">
            <h3 className="servicio-servicio-title">{servicio.nombre}</h3>
            <img src={servicio["imagen portada"]} alt={servicio.nombre} className="servicio-servicio-img" />
            <div className="servicio-info">
              <p>{servicio.tipo} | {servicio.categoria}</p>
            </div>
            <Slider {...settings}>
              {Array.isArray(servicio["imagenes del servicio"]) && servicio["imagenes del servicio"].map((img, index) => (
                <div key={`${servicio.id}-img-${index}`}>
                  <img src={img} alt={`${servicio.nombre} - ${index + 1}`} className="carousel-image" />
                </div>
              ))}
            </Slider>
            <div className="comments-section">
              <ul>
                {servicio.comentarios.slice(0, 2).map((comment, index) => (
                  <li key={`${servicio.id}-comment-${index}`}>{comment}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Servicio;
