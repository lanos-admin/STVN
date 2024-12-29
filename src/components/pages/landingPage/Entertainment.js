import React, {useState, useEffect} from "react";
import CardImg2 from "../../../assets/News1 17.png";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";
import "./Entertainment.css";
import { useNavigate } from "react-router-dom";

const Entertainment = () => {
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
    <div className="Entertainment">
<div className="Entertainment-title-section">
              <h2 className="EntertainmentSection-title">Entertainment</h2>
              <div className="gradient-underline"></div>
              
    <div className="EntertainmentContainer">
      {news.slice(0,4).map((article, index) => (
        <div className="EntertainmentCard" key={index}>
          <div className="EntertainmentBadge">{article.location || "सागर"}</div>
          <img
            src={CardImg2} 
            alt="Shivraj"
            className="EntertainmentCardImage"
          />
          <div className="EntertainmentCardContent">
            <h2 className="EntertainmentCardTitle">{article.heading}</h2>
            <p className="EntertainmentCardDescription">
             {article.mainNews}
            </p>
            <div className="EntertainmentCardFooter">
              <div className="EntertainmentAuthorInfo">
                <span className="EntertainmentAuthor">By Abhishek Sharma</span>
                <span className="EntertainmentDate">
                  <BsCalendar3 className="EntertainmentCalendarIcon" />
                  Nov 25, 2024 21:27 IST
                </span>
              </div>
            </div>
            <div className="EntertainmentCardActions">
              <IoShareSocialOutline 
                className="EntertainmentShareIcon" 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: article.heading,
                      text: article.mainNews,
                      url: window.location.href,
                    })
                    .catch((error) => console.log('Error sharing:', error));
                  } else {
                    const shareUrl = `${window.location.href}?article=${encodeURIComponent(article.heading)}&category=entertainment`;
                    navigator.clipboard.writeText(shareUrl)
                      .then(() => alert('Link copied to clipboard!'))
                      .catch((error) => console.log('Error copying to clipboard:', error));
                  }
                }}
              />
              <a 
                href="#" 
                className="EntertainmentReadMore"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/news-detail/${article._id}`, { 
                    state: { 
                      article: article,
                      category: 'entertainment'
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

export default Entertainment;
