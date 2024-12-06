import React, { useState, useEffect } from "react";
import "./ElectionCard.css";
import CardImg from "../assets/News1 6.png";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";

const ElectionCard = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://news-backend-production-ae21.up.railway.app/api/news"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch news.");
        }
        const data = await response.json();
        setNews(data || []); // Set the entire data array or empty array if null
      } catch (err) {
        setError(err.message);
        setNews([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!news || news.length === 0) return <p>No news articles available.</p>;

  return (
    news.slice(0, 2).map((article, index) => (
      <div className="card" key={index}>
        <div className="badge">{article.location || "सागर"}</div>
        <img
          src={article.urlToImage || CardImg}
          alt={article.title}
          className="card-image"
        />
        <div className="card-content">
          <h2 className="card-title">{article.heading}</h2>
          <p className="card-description">{article.mainNews}</p>
          <div className="card-footer">
            <div className="author-info">
              <span className="author">By {article.author || "Unknown"}</span>
              <span className="date">
                <BsCalendar3 className="calendar-icon" />
                {new Date(article.date).toLocaleString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'Asia/Kolkata',
                  hour12: false
                })} IST
              </span>
            </div>
          </div>
          <div className="card-actions">
            <IoShareSocialOutline className="share-icon" />
            <a href="#" className="read-more">
              और भी →
            </a>
          </div>
        </div>
      </div>
    ))

    
  );
};

export default ElectionCard;
