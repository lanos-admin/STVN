import React from "react";
import "./HeadNewsCard.css";

const HeadNewsCard = () => {
  return (
    <div className="head-news-card">
      <div className="head-news-card-overlay"></div>
      <div className="head-news-content">
        <div className="head-news-content-wrapper">

          <h2>नीलामी में किया हाथ साफ, पूरे बिक गए खिलाड़ी</h2>
          <ul className="head-newsCard-list">
            <li>ऋषभ पंत 27 करोड़ में बिके</li>
            <li>पृथ्वी शॉ को किसी ने नहीं चुना</li>
          </ul>
        </div>
        <div className="head-read-more-section">
        <a href="#" className="Head-read-more">
          आगे पढ़े
          <div className="read-more-arrow"></div>
        </a>
        </div>
      </div>
    </div>
  );
};

export default HeadNewsCard;
