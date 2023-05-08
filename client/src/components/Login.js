import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const signIn = (event) => {
    event.preventDefault();
    api
      .post('/auth/signin', { username, password })
      .then((res) => {
        if (res.status === 200) {
          const token = res.data.accessToken;
          localStorage.setItem('token', token);
          navigate('/stream');
        }
      })
      .catch((err) => {
        setErrorMessage('Incorrect Username or Password');
      });
  };
  return (
    <div className="form-container">
      <div className="errorContainer">
        {errorMessage && (
          <div className="redBackground">
            <p className="error"> {errorMessage} </p>
          </div>
        )}
      </div>

      <h1>LOGIN</h1>
      <form className="login-form" onSubmit={signIn}>
        <input
          type="text"
          id="username"
          onChange={(event) => setUsername(event.target.value)}
          required
          placeholder="Username"
        />
        <input
          type="password"
          id="password"
          onChange={(event) => setPassword(event.target.value)}
          required
          placeholder="Password"
        />
        <div className="login-form__extras">
          <label>
            <input type="checkbox" name="remember-me" />
            Remember me
          </label>
          <a href="/">Forgot?</a>
        </div>
        <button type="submit" id="login-form__submit">
          Sign In
        </button>
      </form>
      <a id="login-form__signUp" href="/signup">
        Sign Up
      </a>
    </div>
  );
};

export default Login;
