import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo-itsa.png';
import '../styles/Navbar.css';

function Navbar() {
	const [showSubmenu, setShowSubmenu] = useState(false);
	const { user, isAuthenticated, logout } = useAuth();
	const navigate = useNavigate();

	const handleShowSubmenu = () => {
		setShowSubmenu(!showSubmenu);
	};

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<div className="container-nav">
			<div className="nav-left">
				<div className="nav-left-logo" onClick={() => navigate('/')}>
					{' '}
					{/* Changed navigate to window.location.href */}
					<img src={logo} alt="logo" />
				</div>

				{isAuthenticated && (
					<ul className="nav-left-menu">
						<li
							className="nav-left-menu-config"
							onClick={handleShowSubmenu}
							onMouseEnter={handleShowSubmenu}
							onMouseLeave={handleShowSubmenu}
						>
							<span>Configuracion</span>
							<ul
								className={`nav-left-submenus ${showSubmenu ? 'show' : ''}`}
							>
								<li>Parametros</li>
								<li>
									<Link
										to="/users"
										style={{
											textDecoration: 'none',
											color: 'inherit',
										}}
									>
										Usuarios
									</Link>
								</li>
								<li>Roles</li>
							</ul>
						</li>
					</ul>
				)}
			</div>

			<div className="nav-sesion-info">
				{isAuthenticated ? (
					<>
						<span className="user-name">
							Bienvenido, {user.username}
						</span>
						<button
							className="btn-sesion-info logout"
							onClick={handleLogout}
						>
							Cerrar Sesión
						</button>
					</>
				) : (
					<>
						<Link className="btn-sesion-info" to="/login">
							Login
						</Link>
						<Link className="btn-sesion-info" to="/register">
							Register
						</Link>
					</>
				)}
			</div>
		</div>
	);
}

export default Navbar;
