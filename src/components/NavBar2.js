import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaEllipsisV } from 'react-icons/fa';

const NavBar2 = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="nav-bar-2">
      <div className="nav-bar-2-content">
        <Link to="/" className="nav-bar-2-home">
          <FaHome className="nav-bar-2-home-icon" />
        </Link>
        <nav className="nav-bar-2-nav">
          <ul>
            <li><Link to="/राजनीति" className="nav-bar-2-link">राजनीति</Link></li>
            <li><Link to="/अपराध" className="nav-bar-2-link">अपराध</Link></li>
            <li><Link to="/खेल" className="nav-bar-2-link">खेल</Link></li>
            <li><Link to="/मनोरंजन" className="nav-bar-2-link">मनोरंजन</Link></li>
            <li><Link to="/व्यापार" className="nav-bar-2-link">व्यापार</Link></li>
            <li><Link to="/मौसम" className="nav-bar-2-link">मौसम</Link></li>
          </ul>
        </nav>
        <div className="nav-bar-2-menu">
          <button className="nav-bar-2-menu-button" onClick={toggleDropdown}>
            <FaEllipsisV className="nav-bar-2-menu-icon" />
          </button>
          {showDropdown && (
            <div className="nav-bar-2-dropdown">
              <Link to="/settings" className="nav-bar-2-dropdown-item">Settings</Link>
              <Link to="/help" className="nav-bar-2-dropdown-item">Help</Link>
              <Link to="/about" className="nav-bar-2-dropdown-item">About</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar2;