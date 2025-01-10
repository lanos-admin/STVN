import React, {useState, useEffect} from "react";
import CardImg2 from "../../../assets/News1 17.png";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";
import "./International.css";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../../config/config";

const International = () => {
    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchNews = async () => {
        try {
          const response = await fetch(endpoints.news.byCategory(5));
          if (!response.ok) {
            throw new Error("Failed to fetch International news.");
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
    <div className="International">
      <div className="International-title-section">
        <h2 className="InternationalSection-title">International</h2>
        <div className="gradient-underline"></div>
              
        <div className="InternationalContainer">
          {news.slice(0,4).map((article, index) => (
            <div className="InternationalCard" key={index}>
              <div className="InternationalBadge">{article.district?.name || "सागर"}</div>
              <img
                src={article.imageUrl || CardImg2}
                alt={article.title}
                className="InternationalCardImage"
                onError={(e) => {e.target.src = CardImg2}}
              />
              <div className="InternationalCardContent">
                <h2 className="InternationalCardTitle">{article.title}</h2>
                <p className="InternationalCardDescription">
                  {article.content}
                </p>
                <div className="InternationalCardFooter">
                  <div className="InternationalAuthorInfo">
                    <span className="InternationalAuthor">By {article.author || "Unknown"}</span>
                    <span className="InternationalDate">
                      <BsCalendar3 className="InternationalCalendarIcon" />
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
                <div className="InternationalCardActions">
                  <IoShareSocialOutline 
                    className="InternationalShareIcon" 
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
                    className="InternationalReadMore"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/news/${article.id}`, { 
                        state: { 
                          article: article,
                          category: 'अपराध'
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

export default International;
