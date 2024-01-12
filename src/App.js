// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './Auth';
import PrivateRoute from './PrivateRoute';
import HourManager from './HourManager';
import './App.css';

const App = () => {
  const lsAppKey = "lsecmv1hx36z"
  const [isAuthenticated, setIsAuthenticated] = useState(JSON.parse(localStorage.getItem(lsAppKey + '-isAuthenticated') || false));

  useEffect(() => {
    // Verificar el estado de autenticación al cargar la aplicación
    const storedAuthStatus = JSON.parse(localStorage.getItem(lsAppKey + '-isAuthenticated'));
    if (storedAuthStatus) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuth = (uid) => {
    localStorage.setItem(lsAppKey + '-isAuthenticated', true);
    localStorage.setItem(lsAppKey + '-uid', uid); // Guardar el UID en localStorage
    setIsAuthenticated(true);
  }

  const handleLogout = () => {
    // Limpiar el estado de autenticación y localStorage al cerrar sesión
    setIsAuthenticated(false);
    localStorage.removeItem(lsAppKey + '-isAuthenticated');
    localStorage.removeItem(lsAppKey + '-uid'); // Limpiar el UID del localStorage

    console.log("logout");
  };

  return (
    <div className="App container">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Auth isAuthenticated={isAuthenticated} handleAuth={handleAuth} />}
          />
          <Route
            path="/ecmanager"
            element={<PrivateRoute element={<HourManager handleLogout={handleLogout} lsAppKey={lsAppKey} />} isAuthenticated={isAuthenticated}  />}
          />
          {/* Agregar más rutas privadas según sea necesario */}
        </Routes>
      </Router>
    </div>

  );
};

export default App;
