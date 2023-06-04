import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Login.css';

const Login = () => {
  const [activeButton, setActiveButton] = useState('login');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [authMessage, setAuthMessage] = useState({
    success: '',
    message: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      let endpoint = activeButton === 'login' ? '/auth/login' : '/auth/signup';
      const res = await api.post(endpoint, formData);
      console.log(res);
      if (res.status === 200) {
        const token = res.data.accessToken;
        localStorage.setItem('token', token);
        activeButton === 'signup'
          ? setActiveButton('login')
          : navigate('/stream');
      }
      setAuthMessage({ success: res.data.success, message: res.data.message });
    } catch (err) {
      // Catches api errors
      if (err.response && err.response.status === 400) {
        setAuthMessage({
          success: false,
          message: err.response.data.message,
        });
      }
      if (err.response && err.response.status === 401) {
        setAuthMessage({
          success: false,
          message: err.response.data.message,
        });
      } else {
        // Catches network errors
        setAuthMessage({
          success: false,
          messasge: err.response.data.message,
        });
      }
    }

    // Reset form data after submission
    setFormData({
      username: '',
      password: '',
    });
  };
  // Keeps track if they're on login or sign up
  const handleButtonClick = (button) => {
    setActiveButton(button);
    setAuthMessage({
      success: '',
      message: '',
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Keeps the unaffected field and updates the current field
    // [name] allows for dynamic allocation with the keys
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="container-fluid ">
      {authMessage.success === true && (
        <div className="alert alert-success position-absolute top-10 start-50 translate-middle-x mt-3">
          {authMessage.message}
        </div>
      )}
      {authMessage.success === false && (
        <div className="alert alert-danger position-absolute top-10 start-50 translate-middle-x mt-3">
          {authMessage.message}
        </div>
      )}
      <div className="row justify-content-center align-items-center min-vh-100 ">
        <div className="col-6 col-sm-5 col-md-5 col-lg-3 col-xl-2 login-card text-white">
          <nav className="nav mb-4">
            <div classname="col">
              <button
                className={`nav-link text-white btn rounded-0 ${
                  activeButton === 'login' ? 'active' : ''
                } `}
                onClick={() => handleButtonClick('login')}
              >
                Login
              </button>
            </div>
            <div className="col">
              <button
                className={`nav-link btn rounded-0 text-white ${
                  activeButton === 'signup' ? 'active' : ''
                }`}
                onClick={() => handleButtonClick('signup')}
              >
                Sign Up
              </button>
            </div>
          </nav>
          <h2 clasName="font-weight-normal">Login</h2>
          <form className="m-4" onSubmit={handleSubmit}>
            <div className="form-group text-start">
              <label for="inputUsername">Username</label>
              <input
                type="text"
                className="form-control rounded-0 custom-input border-0"
                id="inputUsername"
                name="username"
                placeholder="Enter Username"
                required
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            {activeButton === 'signup' ? (
              <div className="form-group text-start pt-3">
                <label for="inputEmail">Email</label>
                <input
                  type="email"
                  className="form-control custom-input rounded-0  border-0"
                  name="email"
                  id="inputEmail"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  required
                />{' '}
              </div>
            ) : (
              ''
            )}
            <div className="form-group text-start pt-3">
              <label for="inputPassword">Password</label>
              <input
                type="password"
                className="form-control custom-input rounded-0  border-0"
                name="password"
                id="inputPassword"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                required
              />
            </div>
            <small className="text-white ">
              <a href="#" className="text-decoration-none">
                Forgot Password?
              </a>
            </small>
            <br />
            <button
              type="submit"
              className="btn btn-light bold w-100 mt-4 mb-3"
            >
              <strong>Submit</strong>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
