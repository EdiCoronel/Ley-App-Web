import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [lawData, setLawData] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAnnexI, setShowAnnexI] = useState(false); // Estado para controlar el despliegue de ANEXO I
  const [expandedChapters, setExpandedChapters] = useState({}); // Estado para capítulos desplegados

  // Cargar los datos de la ley desde el backend
  useEffect(() => {
    fetch('http://localhost:5000/api/ley')
      .then((response) => response.json())
      .then((data) => setLawData(data))
      .catch((error) => console.error('Error al cargar los datos:', error));
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

  if (!lawData) return <p>Cargando datos...</p>;

  return (
    <div className="container">
      {/* Descripción principal */}
      <h1>{lawData.descripcion}</h1>

      {/* Sección de Anexos */}
      <div className="anexos">
        <h2 class="decreto">Decreto Reglamentario 351/79</h2>
        <p class="decreto">
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
            ANEXO I : Reglamentación de la Ley Nº 19.587, aprobada por Decreto Nº 351/79
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
                              <li key={`anexo-art-${i}`}>
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
          <li>ANEXO II: Carga Térmica - Complementa: Capítulo 8 del Título IV</li>
          <li>ANEXO III: Contaminación Ambiental - Complementa: Capítulo 9 del Título IV</li>
          <li>ANEXO IV: Iluminación y Color - Complementa: Capítulo 12 del Título IV</li>
          <li>ANEXO V: Ruidos y Vibraciones - Complementa: Capítulo 13 del Título IV</li>
          <li>ANEXO VI: Instalaciones Eléctricas - Complementa: Capítulo 14 del Título V</li>
          <li>ANEXO VII: Protección contra Incendios - Complementa: Capítulo 18 del Título V</li>
          <li>ANEXO VIII - Complementa: Capítulo 22 del Título VIII (Derogado)</li>
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
    </div>
  );
}

export default App;