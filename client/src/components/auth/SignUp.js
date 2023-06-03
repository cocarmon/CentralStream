import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Login.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signUp = async () => {
    api.post('/auth/signup', { username, email, password }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        const token = res.data.accessToken;
        localStorage.setItem('token', token);
        navigate('/stream');
      } else {
        console.log(res.data.message);
      }
    });
  };
  return (
    <div className="form-container">
      <h1>Sign Up</h1>
      <form className="login-form" action="/stream" onSubmit={signUp}>
        <input
          type="text"
          id="username"
          required
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="email"
          id="email"
          required
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          id="password"
          required
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />

        <button tyep="submit" id="login-form__submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
