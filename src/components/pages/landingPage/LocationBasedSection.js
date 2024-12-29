import React, { useState, useEffect } from "react";
import "./LocationBasedSection.css";
import CardImg from "../../../assets/News1 6.png";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";

const LocationBasedSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeLocation, setActiveLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationsData, setLocationsData] = useState({});

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/news/by-districts"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch news.");
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

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/news/by-districts');
        const data = await response.json();
        setLocationsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchNews();
    fetchData();
  }, []);

  const handleLocationChange = (location) => {
    setActiveLocation(location);
  };

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="locationbasedsection-container">
      <h2 className="locationbasedsection-title">District Wise News</h2>
      <div className="gradient-underline"></div>
      <div className="locationbasedsection-NavBar">
        <div className="location-links">
          {Object.keys(locationsData).map((location) => (
            <button
              key={location}
              className={`locationbasedsection-NavBar-link ${activeLocation === location ? 'active' : ''}`}
              onClick={() => handleLocationChange(location)}
            >
              {location}
            </button>
          ))}
        </div>
        <input 
          type="text" 
          placeholder="Search" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="locationbasedsection-news-container">
        <div className="cards-container">
          {Object.entries(locationsData).map(([location, articles]) => (
            location === activeLocation && (
              articles.slice(0, 6).map((article, index) => (
                <Card key={index} article={article} index={index} />
              ))
            )
          ))}
        </div>
      </div>
    </div>
  );
};

const Card = ({ article, index }) => (
  <div className="card" key={index}>
    <div className="badge">{article.location || "सागर"}</div>
    <img
      src={article.urlToImage || CardImg}
      alt={article.title}
      className="card-image"
    />
    <div className="card-content">
      <h2 className="card-title">{article.title}</h2>
      <p className="card-description">{article.description}</p>
      <div className="card-footer">
        <div className="author-info">
          <span className="author">By {article.author || "Unknown"}</span>
          <span className="date">
            <BsCalendar3 className="calendar-icon" />
            {new Date(article.date || new Date()).toLocaleString('en-IN', {
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
                text: article.description,
                url: window.location.href,
              })
              .catch((error) => console.log('Error sharing:', error));
            } else {
              // Fallback for browsers that don't support Web Share API
              const shareUrl = `${window.location.href}?article=${encodeURIComponent(article.title)}&location=${encodeURIComponent(article.location)}`;
              navigator.clipboard.writeText(shareUrl)
                .then(() => alert('Link copied to clipboard!'))
                .catch((error) => console.log('Error copying to clipboard:', error));
            }
          }}
        />
        <a href="#" className="read-more">
          और भी →
        </a>
      </div>
    </div>
  </div>
);

export default LocationBasedSection;
