import { LiveTvIcon, VideoCamerIcon, HomeIcon } from '../assets/icons/icon';
import { Link } from 'react-router-dom';
import api from './api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DarkModeToggle from './DarkModeToggle';

import './Navbar.css';
export const Navbar = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    getUsername();
  }, []);
  const getUsername = async () => {
    const jwt = localStorage.getItem('token');
    const response = await api.get('/streams/username/', {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    let responseOK = response && response.status === 200;
    if (!responseOK) {
      navigate('/');
    }
    setUsername(response.data);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };
  return (
    <div className="navBar">
      <h1>Central</h1>
      <h4>
        <span className="highlights">Hello</span> {username}
      </h4>
      <div className="navContainer">
        <p>Navigation</p>
        <ul>
          <Link to="/dashboard" className="navbar-links">
            <li>
              <img src={HomeIcon} alt="House" />
              <span className="seperation">Dashboard</span>
            </li>
          </Link>

          <Link to="/stream" className="navbar-links">
            <li>
              <img src={VideoCamerIcon} alt="House" />
              <span className="seperation">Live Stream</span>
            </li>
          </Link>

          <Link to="/streamLibrary" className="navbar-links">
            <li>
              <img src={LiveTvIcon} alt="House" />
              <span className="seperation">Stream Library</span>
            </li>
          </Link>
        </ul>
      </div>

      <div className="bottomNavBar">
        <DarkModeToggle />
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};
