import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useNews } from '../../../context/NewsContext';
import { IoShareSocialOutline } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import CardImg from "../../../assets/News1 6.png";
import NavBar1 from '../landingPage/NavBar1';
import NavBar2 from '../landingPage/NavBar2';
import Footer from '../landingPage/footer';
import GoogleAd1 from '../landingPage/GoogleAd1';
import SponsoredBanner1 from '../landingPage/SponsoredBanner1';
import './CategoryNews.css';

const ITEMS_PER_PAGE = 6;

const CategoryNews = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const { categoryNews, loading, error } = useNews();
  const [currentPage, setCurrentPage] = useState(1);

  const newsForCategory = categoryNews?.[category] || [];
  
  // Calculate total pages
  const totalPages = Math.ceil(newsForCategory.length / ITEMS_PER_PAGE);
  
  // Get current news items
  const currentNews = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return newsForCategory.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [newsForCategory, currentPage]);

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers array
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  if (loading) return <div className="category-loading">Loading news...</div>;
  if (error) return <div className="category-error">Error: {error}</div>;

  return (
    <div className="app">
      <NavBar1 />
      <NavBar2 />
      <GoogleAd1
        client="ca-pub-xxxxxxxxxxxxxxx"
        slot="1234567890"
      />
      <SponsoredBanner1 
        imageSrc="https://example.com/sponsor-banner.jpg"
        altText="Sponsored Ad"
        link="https://example.com"
      />
      
      <div className="category-news-container">
        {/* Breadcrumbs */}
        <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <MdKeyboardArrowRight className="breadcrumb-separator" />
          <span className="current">{category}</span>
        </div>

        <h1 className="category-title">{category}</h1>
        <div className="gradient-underline"></div>
        
        <div className="category-news-layout">
          <div className="category-news-main">
            <div className="category-news-grid">
              {currentNews.map((article, index) => (
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="pagination-button"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
                <div className="pagination-numbers">
                  {getPageNumbers().map(number => (
                    <button
                      key={number}
                      className={`pagination-number ${currentPage === number ? 'active' : ''}`}
                      onClick={() => handlePageChange(number)}
                    >
                      {number}
                    </button>
                  ))}
                </div>
                <button 
                  className="pagination-button"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar with Ads */}
          <div className="category-news-sidebar">
            <div className="advertisement-section">
              <h2>Advertisements</h2>
              <div className="ad-space">
                <GoogleAd1
                  client="ca-pub-xxxxxxxxxxxxxxx"
                  slot="1234567890"
                />
              </div>
            </div>
            <div className="advertisement-section">
              <div className="ad-space">
                <GoogleAd1
                  client="ca-pub-xxxxxxxxxxxxxxx"
                  slot="1234567890"
                />
              </div>
            </div>
          </div>
        </div>
        
        {newsForCategory.length === 0 && (
          <div className="no-news-message">
            No news available for this category at the moment.
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CategoryNews;
