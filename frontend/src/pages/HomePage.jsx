import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { FaUsers, FaCog, FaChartBar, FaUserCircle } from 'react-icons/fa';
import './HomePage.css';

function HomePage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const dashboardItems = [
    {
      title: 'Usuarios',
      description: 'Gestión de usuarios del sistema',
      icon: <FaUsers size={24} />,
      path: '/users'
    },
    {
      title: 'Configuración',
      description: 'Ajustes del sistema',
      icon: <FaCog size={24} />,
      path: '/settings'
    },
    {
      title: 'Reportes',
      description: 'Informes y estadísticas',
      icon: <FaChartBar size={24} />,
      path: '/reports'
    },
    {
      title: 'Perfil',
      description: 'Gestionar tu perfil',
      icon: <FaUserCircle size={24} />,
      path: '/profile'
    }
  ];

  return (
    <div className="home-page">
      <div className="home-content">
        <div className="welcome-banner">
          <h1>Bienvenido al Sistema, {user.username}!</h1>
          <p>Panel de Control</p>
        </div>
        
        <div className="dashboard-grid">
          {dashboardItems.map((item, index) => (
            <div 
              key={index} 
              className="dashboard-card"
              onClick={() => navigate(item.path)}
            >
              <div className="card-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
