import React from 'react'
import './Login.css'

function Login() {
  return (
    <div className='container-login'>
        <form className='form-login' action="#">
        <h1>Login</h1>
            <input type="text" placeholder='Usuario' />
            <input type="password" placeholder='Contraseña' />
            <button type='submit'>Iniciar Sesión</button>
        </form>
    </div>
  )
}

export default Login