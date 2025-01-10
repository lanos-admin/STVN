import React, {useState, useEffect} from "react";
import CardImg2 from "../../../assets/News1 17.png";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";
import "./Sports.css";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../../config/config";

const Sports = () => {
    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchNews = async () => {
        try {
          const response = await fetch(endpoints.news.byCategory(1));
          if (!response.ok) {
            throw new Error("Failed to fetch Sports news.");
          }
          const data = await response.json();
          setNews(data || []); 
        } catch (err) {
          setError(err.message);
          setNews([]);
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
    <div className="Sports">
<div className="Sports-title-section">
              <h2 className="SportsSection-title">Sports</h2>
              <div className="gradient-underline"></div>
              
    <div className="SportsContainer">
      {news.slice(0,4).map((article, index) => (
        <div className="SportsCard" key={article.id}>
          <div className="SportsBadge">{article.district?.name || "सागर"}</div>
          <img
            src={article.imageUrl || CardImg2} 
            alt={article.title}
            className="SportsCardImage"
            onError={(e) => {e.target.src = CardImg2}}
          />
          <div className="SportsCardContent">
            <h2 className="SportsCardTitle">{article.title}</h2>
            <p className="SportsCardDescription">
             {article.content}
            </p>
            <div className="SportsCardFooter">
              <div className="SportsAuthorInfo">
                <span className="SportsAuthor">By {article.author || "Unknown"}</span>
                <span className="SportsDate">
                  <BsCalendar3 className="SportsCalendarIcon" />
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
            <div className="SportsCardActions">
              <IoShareSocialOutline 
                className="SportsShareIcon" 
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
                className="SportsReadMore"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${article.id}`, { 
                    state: { 
                      article: article,
                      category: 'sports'
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
    </div>
    </div>
  );
};

export default Sports;
