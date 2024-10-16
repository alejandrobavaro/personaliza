import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/scss/_03-Componentes/_Aplicar.scss";

const Aplicar = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("TODOS");

  useEffect(() => {
    fetch("/servicio.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log("Datos cargados:", data);
      })
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((item) => {
    const matchesCategory =
      selectedCategory === "TODOS" || item.categoria === selectedCategory;
    const matchesSearchTerm =
      searchTerm === "" ||
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearchTerm;
  });

  return (
    <div className="data">
      <div className="search-filter-container">
        <div className="filters">
          <div className="category-buttons">
            {/* <button
              className={selectedCategory === "TODOS" ? "selected" : ""}
              onClick={() => handleCategoryChange("TODOS")}
            >
              TODOS
            </button> */}
          </div>
        </div>

        <div className="search-barClientes">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {filteredData.length === 0 ? (
        <h4>No se encontraron resultados en la búsqueda. Verifique.</h4>
      ) : (
        <div className="data-container">
          {filteredData.map((item) => (
            <div key={item.id} className="data-item">
              <h3>
                <Link to={`/servicio/${item.nombre.toLowerCase()}`}>
                  {/* {item.nombre} */}
                </Link>
              </h3>
              <img
                src={item["imagen portada"]}
                className="servicio-image"
                alt={item.nombre}
              />
              <table>
                <tbody>
                  <tr>
                    <td>
                      <strong>Id:</strong>
                    </td>
                    <td>{item.id}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Categoría:</strong>
                    </td>
                    <td>{item.categoria}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Tipo:</strong>
                    </td>
                    <td>{item.tipo}</td>
                  </tr>

                  <tr>
                    <td>
                      <strong>Precio:</strong>
                    </td>
                    <td>{item.precio}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Seguidores:</strong>
                    </td>
                    <td>{item.seguidores}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Comentarios:</strong>
                    </td>
                    <td>
                      <ul>
                        {item.comentarios.map((comentario, index) => (
                          <li key={index}>{comentario}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Aplicar;
