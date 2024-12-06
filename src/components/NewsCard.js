import React from "react";
import "./NewsCard.css";

const NewsCard = () => {
  return (
    <div className="news-card">
      <div className="news-card-overlay"></div>
      <div className="news-content">
        <div className="news-content-wrapper">

          <h2>नीलामी में किया हाथ साफ, पूरे बिक गए खिलाड़ी</h2>
          <ul className="NewsCard-list">
            <li>ऋषभ पंत 27 करोड़ में बिके</li>
            <li>पृथ्वी शॉ को किसी ने नहीं चुना</li>
          </ul>
        </div>
        <a href="#" className="read-more">
          आगे पढ़े
          <div className="read-more-arrow"></div>
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
