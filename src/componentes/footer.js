import React from 'react';

const Footer = () => {
    return (
        <footer style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '1rem', 
        textAlign: 'center', 
        fontSize: '0.9rem', 
        borderTop: '1px solid #e7e7e7' 
        }}>
        <p>© 2025 Ediberto Coronel. Todos los derechos reservados.</p>
        <p>
            Información tomada de{' '}
            <a 
            href="https://servicios.infoleg.gob.ar/infolegInternet/anexos/30000-34999/32030/texact.htm" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ fontWeight: 'bold' }}
            >
            Infoleg.gob.ar
            </a>
        </p>
        <p>
            Los contenidos de infoleg.gob.ar están licenciados bajo{' '}
            <a 
            href="https://creativecommons.org/licenses/by/2.5/ar/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ fontWeight: 'bold' }}
            >
            Creative Commons Atribución 2.5 Argentina
            </a>
        </p>
        </footer>
    );
};

export default Footer;