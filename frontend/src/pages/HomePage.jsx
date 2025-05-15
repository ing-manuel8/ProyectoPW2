import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { 
	FaUsers, 
	FaCog, 
	FaChartBar, 
	FaUserCircle,
	FaCalendarAlt,
	FaHospital,
	FaNotesMedical,
	FaAmbulance
} from 'react-icons/fa';
import Chatbot from '../components/Chatbot';
import '../styles/HomePage.css';

function HomePage() {
	const { user, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	const dashboardItems = [
		{
			title: 'Citas Médicas',
			description: 'Gestionar citas y consultas',
			icon: <FaCalendarAlt size={24} />,
			path: '/citas',
			color: '#4CAF50'
		},
		{
			title: 'Usuarios',
			description: 'Gestión de usuarios del sistema',
			icon: <FaUsers size={24} />,
			path: '/users',
			color: '#2196F3'
		},
		{
			title: 'Departamentos',
			description: 'Administrar áreas médicas',
			icon: <FaHospital size={24} />,
			path: '/departments',
			color: '#9C27B0'
		},
		{
			title: 'Historiales',
			description: 'Expedientes médicos',
			icon: <FaNotesMedical size={24} />,
			path: '/records',
			color: '#FF9800'
		},
		{
			title: 'Emergencias',
			description: 'Gestión de urgencias',
			icon: <FaAmbulance size={24} />,
			path: '/emergencies',
			color: '#F44336'
		},
		{
			title: 'Configuración',
			description: 'Ajustes del sistema',
			icon: <FaCog size={24} />,
			path: '/settings',
			color: '#607D8B'
		}
	];

	return (
		<div className="home-page">
			

			<div className="welcome-banner">
				<h1>Bienvenido, {user.username}!</h1>
				<p>Panel de Control del Hospital</p>
			</div>

			<div className="dashboard-grid">
				{dashboardItems.map((item, index) => (
					<div
						key={index}
						className="dashboard-card"
						onClick={() => navigate(item.path)}
						style={{ '--card-color': item.color }}
					>
						<div className="card-icon" style={{ backgroundColor: item.color }}>
							{item.icon}
						</div>
						<div className="card-content">
							<h3>{item.title}</h3>
							<p>{item.description}</p>
						</div>
						<div className="card-arrow">
							→
						</div>
					</div>
				))}
			</div>
			<Chatbot />
		</div>
	);
}

export default HomePage;
