import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

function Login() {
  const [formData, setState] = useState({
    username: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica de login
  }

  const handleChange = (e) => {
    setState({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <h1>Iniciar Sesión</h1>
        <form className='auth-form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor="username">Usuario</label>
            <input 
              type="text" 
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type='submit' className='auth-button'>Iniciar Sesión</button>
        </form>
        <p className='auth-link'>
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  )
}

export default Login