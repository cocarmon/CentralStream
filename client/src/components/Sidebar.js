import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import api from './api';

export const Navbar = () => {
  const location = useLocation();
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getUsername();
  }, []);
  const getUsername = async () => {
    const jwt = localStorage.getItem('token');
    const response = await api.get('/streams/username', {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    let responseOK = response && response.status === 200;
    if (!responseOK) {
      navigate('/');
    }
    setUsername(response.data.username);
    console.log(username);
  };

  if (location.pathname === '/login') {
    return null;
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };
  return (
    <div className="col-2 col-sm-2 d-flex min-vh-100 flex-column text-start sidebar-background">
      <div className="ms-4">
        <h2 className=" mt-3 text-white">
          Central <i className="bi bi-bounding-box"></i>
        </h2>
      </div>
      <div className="ms-4 mt-2 mb-4">
        <h4 className="text-white ">
          <span className="contrast-text-blue">Hello</span> {username},
        </h4>
      </div>

      <ul className="nav nav-pills flex-column ms-4 ">
        <li className="nav-item sidebar-active ">
          <a
            className="nav-link text-white"
            data-bs-toggle="collapse"
            href="#userMenu"
          >
            <i className="bi bi-dpad-fill"></i> Account
          </a>
          <ul className="nav flex-column collapse show" id="userMenu">
            <li>
              <ul
                className="collapse nav flex-column ms-1"
                id="submenu1"
                data-bs-parent="#userMenu"
              >
                <li>
                  <Link to="/profile" className="nav-link text-white">
                    <i className="bi bi-person-circle"></i> Profile
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="nav-link text-white">
                    <i className="bi bi-gear-fill me-2"></i> Settings
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <Link
            to="/dashboard"
            className="nav-link text-white custom-sidebar-hover rounded-0"
          >
            <i className="bi bi-bar-chart-fill"></i> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/stream"
            className="nav-link text-white custom-sidebar-hover rounded-0"
          >
            <i className="bi bi-cast"></i> Live Stream
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/library"
            href="#"
            className="nav-link text-white custom-sidebar-hover rounded-0"
          >
            <i className="bi bi-collection-fill"></i> Library
          </Link>
        </li>
      </ul>

      <div className="mt-auto text-center">
        <button
          type="submit"
          className="btn bold text-white contrast-background-blue mb-4"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
