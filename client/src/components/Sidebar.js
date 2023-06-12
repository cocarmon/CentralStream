import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import api from './api';

export const Navbar = () => {
  const location = useLocation();
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/dashboard' || location.pathname === '/stream')
      getUsername();
  }, []);

  const getUsername = async () => {
    try {
      const jwt = localStorage.getItem('token');
      const response = await api.get('/users/username', {
        headers: {
          authorization: `Bearer ${jwt}`,
        },
      });

      setUsername(response.data.username);
    } catch (err) {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername('');
    navigate('/login');
  };

  if (location.pathname === '/login' || location.pathname === '/404') {
    return null;
  }

  return (
    <div
      className="col-2 col-sm-2 d-flex min-vh-100 flex-column text-start sidebar-background"
      id="sidebarElements"
    >
      <div className="ms-4">
        <h2 className=" mt-3 text-white">
          Central <i className="bi bi-bounding-box"></i>
        </h2>
      </div>
      <div className="ms-4 mt-2 mb-4">
        <h4 className="text-white ">
          {username ? (
            <span className="contrast-text-blue">Hello {username}</span>
          ) : (
            ''
          )}
        </h4>
      </div>

      <ul className="nav nav-pills flex-column ms-4 ">
        <li className="nav-item ">
          <a
            className="nav-link text-white"
            data-bs-toggle="collapse"
            href="#userMenu"
          >
            <i className="bi bi-dpad-fill"></i> Account
          </a>
          <div className="collapse" id="userMenu">
            <ul className="nav flex-column ms-3">
              <li>
                <NavLink
                  activeClassName="sidebar-active"
                  to="/profile"
                  className="nav-link text-white custom-sidebar-hover"
                >
                  <i className="bi bi-person-circle"></i> Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName="sidebar-active"
                  to="/settings"
                  className="nav-link text-white custom-sidebar-hover"
                >
                  <i className="bi bi-gear-fill me-2"></i> Settings
                </NavLink>
              </li>
            </ul>
          </div>
        </li>

        <li className="nav-item">
          <NavLink
            activeClassName="sidebar-active"
            to="/dashboard"
            className="nav-link text-white custom-sidebar-hover"
          >
            <i className="bi bi-bar-chart-fill"></i> Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            activeClassName="active"
            to="/stream"
            className="nav-link text-white custom-sidebar-hover "
          >
            <i className="bi bi-cast"></i> Live Stream
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            activeClassName="sidebar-active"
            to="/library"
            href="#"
            className="nav-link text-white custom-sidebar-hover "
          >
            <i className="bi bi-collection-fill"></i> Library
          </NavLink>
        </li>
      </ul>

      <div className="mt-auto text-center">
        {username ? (
          <button
            type="submit"
            className="btn bold text-white contrast-background-blue mb-4"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
