import React, { useState, useEffect } from "react";
import "./ElectionCard.css";
import CardImg from "../../../assets/News1 6.png";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const NewsCard = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://news-backend-production-ae21.up.railway.app/api/news",
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch news.");
        }
        const data = await response.json();
        console.log('Fetched news data:', data); // Added logging
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
          <h2 className="card-title">{article.title}</h2>
          <p className="card-description">{article.content}</p>
          <div className="card-footer">
            <div className="author-info">
              <span className="author">By {article.author || "Unknown"}</span>
              <span className="date">
                <BsCalendar3 className="calendar-icon" />
                {new Date(article.publishedDate).toLocaleString('en-IN', {
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
            <IoShareSocialOutline 
              className="share-icon" 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: article.title,
                    text: article.content,
                    url: window.location.href,
                  })
                  .catch((error) => console.log('Error sharing:', error));
                } else {
                  // Fallback for browsers that don't support Web Share API
                  const shareUrl = `${window.location.href}?article=${encodeURIComponent(article.title)}`;
                  navigator.clipboard.writeText(shareUrl)
                    .then(() => alert('Link copied to clipboard!'))
                    .catch((error) => console.log('Error copying to clipboard:', error));
                }
              }}
            />
            <a 
              href="#" 
              className="read-more"
              onClick={(e) => {
                e.preventDefault();
                console.log('Article data:', article); // Added logging
                navigate(`/${article.id}`, { 
                  state: { 
                    article: article,
                    category: 'election'
                  }
                });
              }}
            >
              और भी →
            </a>
          </div>
        </div>
      </div>
    ))
  );
};

export default NewsCard;
