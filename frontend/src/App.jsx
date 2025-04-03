import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/*" element={
          <>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/" element={<Navigate to="/home" replace />} />
            </Routes>
            <Outlet />
          </>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;
