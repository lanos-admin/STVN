import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Logo Section */}
      <div className="footer-logo">
        <h2>STVN INDIA</h2>
      </div>

      {/* Columns Section */}
      <div className="footer-columns">
        {/* Column 1: Districts */}
        <div className="footer-column">
          <h4>जिले</h4>
          <ul>
            <li>सागर</li>
            <li>इंदौर</li>
            <li>भोपाल</li>
            <li>सीहोर</li>
            <li>भिंड</li>
            <li>मुरैना</li>
          </ul>
        </div>

        {/* Column 2: Topics */}
        <div className="footer-column">
          <h4>विषय</h4>
          <ul>
            <li>राजनीति</li>
            <li>अपराध</li>
            <li>मनोरंजन</li>
            <li>खेल</li>
            <li>व्यापार</li>
            <li>बाज़ार</li>
          </ul>
        </div>

        {/* Column 3: Education */}
        <div className="footer-column">
          <h4>शिक्षा</h4>
          <ul>
            <li>विद्यालय</li>
            <li>महाविद्यालय</li>
            <li>विश्वविद्यालय</li>
          </ul>
        </div>
      </div>

      {/* Search and Social Media Section */}
      <div className="footer-right">
        {/* Search */}
        <div className="footer-search">
          <input
            type="text"
            className="footer-search-input"
            placeholder="Search"
          />
          <button className="footer-search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* Social Media Icons */}
        <div className="footer-social">
          <p>follow us</p>
          <i className="fab fa-youtube"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-facebook"></i>
          <i className="fab fa-twitter"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
