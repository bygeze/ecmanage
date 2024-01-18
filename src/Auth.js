// Home.js
import React, { useState } from 'react';
import { auth } from './services/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import './Auth.css'

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
      //var user = userCredential.user;
      console.log('Usuario registrado con éxito');
      handleAuth();
      // ...
    })
    .catch((error) => {
      //var errorCode = error.code;
      //var errorMessage = error.message;
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
        //const errorCode = error.code;
        //const errorMessage = error.message;
        console.log('Error al encontrar el usuario' + error);
    });
  };

  return (
    <div className='row'>
        <div className="col-12 text-center mt-4">
            <h1 className='mb-4 display-4 app-title'>ECManager</h1>
        </div>
        <div className=" col-12">
            <div className="Auth p-4">
                <div className="text-center g-0 pb-2">
                    <h4>{isRegistering ? 'Crear cuenta' : 'Login'}</h4>
                </div>

                {isRegistering && (
                    <input className="form-control mb-2" type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                )}
                <input className="form-control mb-2"  type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="form-control mb-2"  type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                
                <button className="btn btn-success form-control" onClick={isRegistering ? handleRegister : handleLogin}>
                    {isRegistering ? 'Registrarme' : 'Iniciar sesión'}
                </button>
                <p className="mt-3">
                    {isRegistering ? '¿Ya tienes una cuenta? ' : '¿No tienes cuenta? '}
                    <span className="toggle-register-btn" style={{color: "blue"}} onClick={handleToggleRegister}>
                    {isRegistering ? ' Inicia sesión!' : ' Regístrate!'}
                    </span>
                </p>
            </div>

      </div>
    </div>
  );
};

export default Auth;
