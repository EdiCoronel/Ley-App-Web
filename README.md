# Proyecto de Legislación Laboral - ISPC (Web App)

Este proyecto es una evolución del sistema original de consulta de legislación laboral, adaptado a una **App Web moderna** utilizando tecnologías actuales como **React** para el frontend y un backend básico desarrollado con **Node.js** y **Express**. 

El objetivo principal es proporcionar una experiencia más interactiva, escalable y eficiente para la consulta de normativas laborales, específicamente el **Decreto Nº 351/79** y sus anexos.

---

## Objetivo
El propósito de este proyecto es:
- Implementar una **interfaz interactiva y moderna** para la consulta de normativas laborales.
- Migrar desde una estructura basada en archivos HTML, CSS y JavaScript a un sistema más robusto utilizando **React** y **Express**.
- Proporcionar una experiencia de usuario optimizada, con una navegación fluida y accesible desde múltiples dispositivos.

---

## Características
### Cambios principales con respecto a la versión anterior
- **Frontend en React**:
  - Utilización de **Componentes React** para dividir la aplicación en bloques reutilizables.
  - Navegación dinámica con **React Router**, eliminando la necesidad de recargar la página.
  - Diseño modular para facilitar el mantenimiento y futuras expansiones.
- **Backend en Node.js y Express**:
  - Implementación de un **servidor básico** que expone una API REST.
  - Proporciona los datos del decreto y anexos desde un archivo JSON estructurado.
  - Ofrece rutas específicas para consultar información de títulos, capítulos, artículos y anexos.
- **Interfaz moderna y responsiva**:
  - Uso de **CSS moderno** y librerías como **Bootstrap** o **Material-UI** para un diseño atractivo.
  - Optimización para dispositivos móviles y de escritorio.
- **Migración de datos**:
  - Los datos previamente almacenados en archivos JavaScript (como `ley.js`) fueron migrados a un archivo JSON para facilitar su manipulación y consulta desde el backend.

---

## Tecnologías utilizadas
### Frontend
- **React**: Framework para la creación de interfaces de usuario.
- **React Router**: Manejo de rutas dinámicas para una navegación fluida.
- **CSS3 / Material-UI**: Estilos visuales modernos y componentes preconstruidos.

### Backend
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para construir la API REST.
- **JSON**: Formato de datos estructurados para almacenar la información del decreto y anexos.

---

## Estructura del proyecto
### Frontend
- `src/components`: Contiene los componentes reutilizables de React.
- `src/pages`: Define las páginas principales como Inicio, Anexos, y Artículos.
- `src/App.js`: Punto de entrada principal de la aplicación React.
- `src/styles`: Archivos CSS específicos para el diseño y personalización.

### Backend
- `server.js`: Archivo principal que configura el servidor Express y las rutas.
- `data/ley.json`: Archivo JSON con la estructura completa del decreto y anexos.
- `routes/legislationRoutes.js`: Define las rutas para acceder a los datos del decreto.

---

## Cómo usar
### Requisitos previos
- Tener instalado **Node.js** y **npm**.
- Un navegador web moderno.

### Instalación
1. Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/EdiCoronel/Ley-App-Web.git
   ```
2. Instala las dependencias del servidor backend:
   ```bash
   cd Ley-App-Web/backend
   npm install
   ```
3. Instala las dependencias del frontend:
   ```bash
   cd ../frontend
   npm install
   ```

### Ejecución
1. Inicia el servidor backend:
   ```bash
   cd Ley-App-Web/backend
   npm start
   ```
2. Inicia la aplicación frontend:
   ```bash
   cd ../frontend
   npm start
   ```
3. Abre tu navegador y accede a `http://localhost:3000`.

---

## Funcionalidades destacadas
### Navegación interactiva
- Explora fácilmente la estructura del decreto por títulos, capítulos y artículos.
- Amplía o colapsa capítulos y anexos con un clic.

### Consulta de datos en tiempo real
- El backend expone una API REST que permite consultar información específica de la ley y anexos.
- La información se presenta en modales o vistas dedicadas en el frontend.

### ANEXO I
El **ANEXO I** incluye información específica sobre la **Reglamentación de la Ley Nº 19.587, aprobada por Decreto Nº 351/79**. Este anexo es completamente navegable:
- Se puede expandir y colapsar al hacer clic.
- Contiene una descripción detallada del propósito del anexo.

## Colaborador
- **Ediberto Coronel** (Desarrollador y estudiante de la Tecnicatura de Higiene y Seguridad Laboral)

---

## Licencia
Este proyecto es de uso educativo y académico. Todos los derechos reservados a los autores y fuentes citadas.

---

## Fuente original
El contenido del decreto fue tomado de la plataforma Infoleg:
[Fuente Original](https://servicios.infoleg.gob.ar/infolegInternet/anexos/30000-34999/32030/texact.htm)
