// Home.js
import React, { useState, useEffect } from 'react';
import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";

import { useNavigate } from 'react-router-dom';

const Auth = ({ isAuthenticated, handleAuth}) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useNavigate();

  const handleToggleRegister = () => {
    setIsRegistering(!isRegistering);
  };


const handleRegister = async () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      console.log('Usuario registrado con éxito');
      handleAuth();
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error('Error al registrar usuario', error.message);
      // ..
    });

  };
  
const handleLogin = async () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid; // Obtener el UID del usuario
        handleAuth(uid);
        console.log("login exitoso")
        history("ecmanager");
    })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('Error al encontrar el usuario' + error);
  });

  };

  return (
    <div>
      <h1>ECManager</h1>
      <h2>{isRegistering ? 'Registrarse' : 'Login'}</h2>
      {isRegistering && (
        <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
      )}
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={isRegistering ? handleRegister : handleLogin}>
        {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
      </button>
      <p onClick={handleToggleRegister}>
        {isRegistering ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
      </p>
    </div>
  );
};

export default Auth;
