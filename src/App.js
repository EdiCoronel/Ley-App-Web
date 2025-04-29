import React, { useEffect, useState } from 'react';
import './App.css';
import Footer from './componentes/footer'; // Importar el componente Footer


function App() {
  const [lawData, setLawData] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAnnexI, setShowAnnexI] = useState(false); // Estado para controlar el despliegue de ANEXO I
  const [expandedChapters, setExpandedChapters] = useState({}); // Estado para capítulos desplegados
  const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda
  const [searchResults, setSearchResults] = useState([]); // Resultados de búsqueda


  // URLs de los servidores
  const servers = [
    'https://app-web-v2.vercel.app/api/ley',
    'https://backup-server.vercel.app/api/ley' // URL del servidor de respaldo
  ];

  // Función para intentar cargar datos desde múltiples servidores
  const fetchData = async () => {
    for (let url of servers) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error en el servidor: ${url}`);
        const data = await response.json();
        setLawData(data);
        return; // Si los datos se cargan con éxito, salir del bucle
      } catch (error) {
        console.error(`Error al intentar cargar desde ${url}:`, error);
      }
    }
    console.error('Todos los servidores fallaron');
  };

  // Cargar los datos de la ley desde el backend
  useEffect(() => {
    fetchData();
  }, []);

  // Manejar la apertura del modal para mostrar contenido
  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  // Manejar el cierre del modal
  const closeModal = () => {
    setModalContent(null);
    setShowModal(false);
  };

  // Manejar el despliegue de capítulos
  const toggleChapter = (chapterId) => {
    setExpandedChapters((prevState) => ({
      ...prevState,
      [chapterId]: !prevState[chapterId],
    }));
  };

   // Función para manejar la búsqueda
  const triggerSearch = () => {
    handleSearch({ target: { value: searchQuery } });
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query && lawData) {
      const results = [];

      // Buscar coincidencias dentro de títulos, capítulos y artículos
      lawData.titulos.forEach((titulo, tituloIndex) => {
        if (titulo.nombre.toLowerCase().includes(query)) {
          results.push({
            type: 'Título',
            content: titulo.nombre,
            location: `Título ${tituloIndex + 1}`, // Mostrar el número real del título
          });
        }

        // Extraer el número real del capítulo desde el nombre
        titulo.capitulos.forEach((capitulo) => {
          const matchCapitulo = capitulo.nombre.match(/Capítulo\s+(\d+)/i);
          const numeroCapitulo = matchCapitulo ? matchCapitulo[1] : 'Sin número';
        
          if (capitulo.nombre.toLowerCase().includes(query)) {
            results.push({
              type: 'Capítulo',
              content: capitulo.nombre,
              location: `Título ${tituloIndex + 1} > Capítulo ${numeroCapitulo}`,
            });
          }
        
          capitulo.articulos?.forEach((articulo) => {
            if (
              (articulo.numero && articulo.numero.toString().includes(query)) ||
              (articulo.contenido && articulo.contenido.toLowerCase().includes(query))
            ) {
              results.push({
                type: 'Artículo',
                content: `Artículo ${articulo.numero}`,
                location: `Título ${tituloIndex + 1} > Capítulo ${numeroCapitulo} > Artículo ${articulo.numero}`,
                fullContent: articulo.contenido,
              });
            }
          });
        });
      });

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  if (!lawData) return <p>Cargando datos...</p>;

  return (
    <div className="container">
      {/* Descripción principal */}
      <h1>{lawData.descripcion}</h1>

      {/* Barra de búsqueda */}
      <div className="search-bar">
  <input
    type="text"
    placeholder="Buscar por palabra, artículo o título..."
    value={searchQuery}
    onChange={handleSearch}
    onKeyDown={(e) => e.key === 'Enter' && triggerSearch()}
  />
  <button className="search-button" onClick={triggerSearch} aria-label="Buscar">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="search-icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 4a7 7 0 015.292 11.708l4.646 4.646a1 1 0 01-1.414 1.414l-4.646-4.646A7 7 0 1111 4z"
    />
  </svg>
</button>
</div>

       {/* Mostrar resultados de búsqueda */}
      {searchResults.length > 0 ? (
        <div className="search-results">
          <h2>Resultados de Búsqueda:</h2>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index} onClick={() => result.type === 'Artículo' && openModal(result.fullContent)}>
                <strong>{result.type}:</strong> {result.content} <br />
                <em>{result.location}</em>
              </li>
            ))}
          </ul>
        </div>
      ) : searchQuery ? (
        <p>No se encontraron resultados para "{searchQuery}".</p>
      ) : null}

      {/* Sección de Anexos */}
      <div className="anexos">
        <h2 className="decreto">Decreto Reglamentario 351/79</h2>
        <p className="decreto">
          El presente Decreto Reglamentario tiene por objeto establecer las normas
          mínimas de seguridad y salud en los lugares de trabajo, a fin de prevenir
          accidentes y enfermedades laborales.
        </p>
        <ul>
          {/* ANEXO I con funcionalidad desplegable */}
          <li 
            onClick={() => setShowAnnexI(!showAnnexI)}
            className="anexo-toggle"
          >
            <strong>ANEXO I</strong>: Reglamentación de la Ley Nº 19.587, aprobada por Decreto Nº 351/79
            <span className={`arrow ${showAnnexI ? 'open' : 'closed'}`}></span>
          </li>
          {showAnnexI && (
            <div className="anexo-i-content">
              {lawData.titulos.map((titulo, index) => (
                <div key={`anexo-${index}`} className="titulo">
                  <h2>{titulo.nombre}</h2>
                  {titulo.capitulos.map((cap, idx) => (
                    <div key={`anexo-cap-${idx}`} className="capitulo">
                      <h3
                        className={`chapter-title ${cap.derogado ? 'derogado' : ''}`}
                        onClick={() => toggleChapter(`anexo-cap-${index}-${idx}`)}
                      >
                        {cap.nombre}
                        {cap.derogado && (
                        <span className="derogado-text"> (Derogado)</span>
                        )}
                        <span
                          className={`arrow ${
                            expandedChapters[`anexo-cap-${index}-${idx}`]
                              ? 'open'
                              : 'closed'
                          }`}
                        ></span>
                      </h3>
                      <ul
                        className={`chapter-content ${
                          expandedChapters[`anexo-cap-${index}-${idx}`]
                            ? 'visible'
                            : 'hidden'
                        }`}
                      >
                        {cap.articulos?.map((art, i) => {
                          // Verificar si el artículo tiene un subtítulo
                          if (typeof art === 'object' && art.subtitulo) {
                            return (
                              <li key={`anexo-art-${i}`} className="subtitulo-static">
                                <strong>{art.subtitulo}</strong>
                              </li>
                            );
                          }
                          // Verificar si el artículo tiene un número y contenido
                          else if (typeof art === 'object' && art.numero) {
                            return (
                              <li
                                key={`anexo-art-${i}`}
                                onClick={() => openModal(art.contenido)}
                              >
                                Artículo {art.numero}
                              </li>
                            );
                          }
                          // Renderizar texto plano si no es un objeto
                          else {
                            return <li key={`anexo-art-${i}`}>{art}</li>;
                          }
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {/* Otros anexos */}
          <div className="anexos-complementarios">
          Anexos Complementarios
          </div>
          <li>
            <a href="https://servicios.infoleg.gob.ar/infolegInternet/anexos/30000-34999/32030/dto351-1979-anexo2.htm" target="_blank" rel="noopener noreferrer">
              <strong>ANEXO II</strong>: Carga Térmica - Complementa: Capítulo 8 del Título IV
            </a>
          </li>
          <li>
            <a href="https://servicios.infoleg.gob.ar/infolegInternet/anexos/30000-34999/32030/dto351-1979-anexo3.htm" target="_blank" rel="noopener noreferrer">
              <strong>ANEXO III</strong>: Contaminación Ambiental - Complementa: Capítulo 9 del Título IV
            </a>
          </li>
          <li>
            <a href="https://servicios.infoleg.gob.ar/infolegInternet/anexos/30000-34999/32030/dto351-1979-anexo4.htm" target="_blank" rel="noopener noreferrer">
              <strong>ANEXO IV</strong>: Iluminación y Color - Complementa: Capítulo 12 del Título IV
            </a>
          </li>
          <li>
            <a href="https://servicios.infoleg.gob.ar/infolegInternet/anexos/30000-34999/32030/dto351-1979-anexo5.htm" target="_blank" rel="noopener noreferrer">
              <strong>ANEXO V</strong>: Ruidos y Vibraciones - Complementa: Capítulo 13 del Título IV
            </a>
          </li>
          <li>
            <a href="https://servicios.infoleg.gob.ar/infolegInternet/anexos/30000-34999/32030/dto351-1979-anexo6.htm" target="_blank" rel="noopener noreferrer">
              <strong>ANEXO VI</strong>: Instalaciones Eléctricas - Complementa: Capítulo 14 del Título V
            </a>
          </li>
          <li>
            <a href="https://servicios.infoleg.gob.ar/infolegInternet/anexos/30000-34999/32030/dto351-1979-anexo7.htm" target="_blank" rel="noopener noreferrer">
              <strong>ANEXO VII</strong>: Protección contra Incendios - Complementa: Capítulo 18 del Título V
            </a>
          </li>
          <li className="derogado-item">
            <strong>ANEXO VIII</strong> - Complementa: Capítulo 22 del Título VIII 
            <span className="derogado-text">(Derogado)</span>
          </li>
        </ul>
      </div>

      {/* Modal para mostrar contenido */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>
              &times;
            </span>
            <div dangerouslySetInnerHTML={{ __html: modalContent }} />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;