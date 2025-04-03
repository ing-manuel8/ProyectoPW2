import React from 'react';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

function HomePage() {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <div className="home-content">
        <div className="welcome-banner">
          <h1>Bienvenido al Sistema, {user?.username}!</h1>
          <p>Panel de Control</p>
        </div>
        
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Usuarios</h3>
            <p>Gestión de usuarios del sistema</p>
          </div>
          <div className="dashboard-card">
            <h3>Configuración</h3>
            <p>Ajustes del sistema</p>
          </div>
          <div className="dashboard-card">
            <h3>Reportes</h3>
            <p>Informes y estadísticas</p>
          </div>
          <div className="dashboard-card">
            <h3>Perfil</h3>
            <p>Gestionar tu perfil</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage; 