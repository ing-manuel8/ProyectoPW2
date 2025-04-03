import { useState} from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-itsa.png'
import './Navbar.css'

function Navbar() {
  const [showSubmenu, setShowSubmenu] = useState(false);

  const handleShowSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  }

  return (
    <div className='container-nav'>

      <div className='nav-left'>

        <div className='nav-left-logo' onClick={() => window.location.href='/'}> {/* Changed navigate to window.location.href */}
          <img src={logo} alt="logo" />
        </div>

        <ul className='nav-left-menu'>
          <li className='nav-left-menu-config' onClick={handleShowSubmenu} onMouseEnter={handleShowSubmenu} onMouseLeave={handleShowSubmenu}>
            <span>Configuracion</span>
            <ul className={`nav-left-submenus ${showSubmenu ? 'show' : ''}`}>
              <li>Parametros</li> 
              <li>Usuarios</li>
              <li>Roles</li>
            </ul>
          </li> 
        </ul>

      </div>

      <div className='nav-sesion-info'>
        <Link className='btn-sesion-info' to='/login'>Login</Link>
        <Link className='btn-sesion-info' to='/register'>Register</Link>
      </div>
        
    </div>
  )
}

export default Navbar