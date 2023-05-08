import { LiveTvIcon, VideoCamerIcon, HomeIcon } from '../assets/icons/icon';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

import './Navbar.css';
export const Navbar = () => {
  return (
    <div className="navBar">
      <div className="iconContainer">
        <Link to="/dashboard">
          <img src={HomeIcon} alt="House" />
        </Link>
      </div>
      <div className="iconContainer">
        <Link to="/stream">
          <img src={VideoCamerIcon} alt="House" />
        </Link>
      </div>
      <div className="iconContainer">
        <Link to="/streamLibrary">
          <img src={LiveTvIcon} alt="House" />
        </Link>
      </div>
      <div>
        <DarkModeToggle />
      </div>
    </div>
  );
};
