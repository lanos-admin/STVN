import React, {useState, useEffect} from "react";
import CardImg2 from "../../../assets/News1 17.png";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";
import "./Sports.css";
import { useNavigate } from "react-router-dom";

const Sports = () => {
    const navigate = useNavigate();
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
    <div className="Sports">
<div className="Sports-title-section">
              <h2 className="SportsSection-title">Sports</h2>
              <div className="gradient-underline"></div>
              
    <div className="SportsContainer">
      {news.slice(0,4).map((article, index) => (
        <div className="SportsCard" key={index}>
          <div className="SportsBadge">{article.location || "सागर"}</div>
          <img
            src={CardImg2} 
            alt="Shivraj"
            className="SportsCardImage"
          />
          <div className="SportsCardContent">
            <h2 className="SportsCardTitle">{article.heading}</h2>
            <p className="SportsCardDescription">
             {article.mainNews}
            </p>
            <div className="SportsCardFooter">
              <div className="SportsAuthorInfo">
                <span className="SportsAuthor">By Abhishek Sharma</span>
                <span className="SportsDate">
                  <BsCalendar3 className="SportsCalendarIcon" />
                  Nov 25, 2024 21:27 IST
                </span>
              </div>
            </div>
            <div className="SportsCardActions">
              <IoShareSocialOutline 
                className="SportsShareIcon" 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: article.heading,
                      text: article.mainNews,
                      url: window.location.href,
                    })
                    .catch((error) => console.log('Error sharing:', error));
                  } else {
                    const shareUrl = `${window.location.href}?article=${encodeURIComponent(article.heading)}&category=sports`;
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
                  navigate(`/news-detail/${article._id}`, { 
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
