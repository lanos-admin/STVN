import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNews } from '../../../context/NewsContext';
import { IoShareSocialOutline } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";
import CardImg from "../../../assets/News1 6.png";
import './CategoryNews.css';

const CategoryNews = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const { categoryNews, loading, error } = useNews();

  if (loading) return <div className="category-loading">Loading news...</div>;
  if (error) return <div className="category-error">Error: {error}</div>;

  const newsForCategory = categoryNews?.[category] || [];

  return (
    <div className="category-news-container">
      <h1 className="category-title">{category}</h1>
      <div className="gradient-underline"></div>
      
      <div className="category-news-grid">
        {newsForCategory.map((article, index) => (
          <div className="category-news-card" key={index}>
            <div className="category-news-badge">{article.district?.name || "सागर"}</div>
            <div className="category-news-image-container">
              <img
                src={article.imageUrl || CardImg}
                alt={article.title}
                className="category-news-image"
                onError={(e) => {e.target.src = CardImg}}
              />
            </div>
            <div className="category-news-content">
              <h2 className="category-news-title">{article.title}</h2>
              <p className="category-news-excerpt">{article.content}</p>
              <div className="category-news-metadata">
                <div className="category-news-author-info">
                  <span className="category-news-author">By {article.author || "Unknown"}</span>
                  <span className="category-news-date">
                    <BsCalendar3 className="category-news-calendar-icon" />
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
              <div className="category-news-actions">
                <IoShareSocialOutline 
                  className="category-news-share-icon" 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: article.title,
                        text: article.content,
                        url: window.location.href,
                      })
                      .catch((error) => console.log('Error sharing:', error));
                    } else {
                      const shareUrl = `${window.location.href}?article=${encodeURIComponent(article.title)}`;
                      navigator.clipboard.writeText(shareUrl)
                        .then(() => alert('Link copied to clipboard!'))
                        .catch((error) => console.log('Error copying to clipboard:', error));
                    }
                  }}
                />
                <a 
                  href="#" 
                  className="category-news-read-more"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/news/${article.id}`, { 
                      state: { 
                        article: article,
                        category: category
                      }
                    });
                  }}
                >
                  और भी →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {newsForCategory.length === 0 && (
        <div className="no-news-message">
          No news available for this category at the moment.
        </div>
      )}
    </div>
  );
};

export default CategoryNews;
