import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

// Components
import NavBar1 from './components/NavBar1';
import NavBar2 from './components/NavBar2';
import "./components/NavBar1.css";
import "./components/NavBar2.css";
import "./components/SponsoredBanner1.css";
import "./App.css";
import FeaturedContent from './components/FeaturedContent';
import NewsArticles from './components/NewsArticles';
import Videos from './components/Videos';
import Footer from './components/Footer';
import GoogleAd1 from './components/GoogleAd1';
import SponsoredBanner1 from './components/SponsoredBanner1';
import NewsCard from "./components/NewsCard";
import UserPoints from "./components/UserPoints";
import CardGrid from "./components/CardGrid";
import ElectionCard from './components/ElectionCard';
import ElectionCard2 from './components/ElectionCard2';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
import VisualShortsSection from './components/VisualShortsSection';
import  VideoSection  from './components/VideoSection';

const App = () => {
  return (
    <Router>
      <div className="app">
        <NavBar1 />
        <NavBar2 />
        <GoogleAd1
          client="ca-pub-xxxxxxxxxxxxxxx"
          slot="1234567890"/>
        <SponsoredBanner1 
          imageSrc="https://example.com/sponsor-banner.jpg"
          altText="Sponsored Ad"
          link="https://example.com"/>
        <main>
        <div className="banner-userpts">
          <div className="left-panel">
            <NewsCard />
          </div>
          <div className="right-panel">
            <UserPoints />
          </div>
        </div>
        <div className="election-cards-container" style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>

        </div>
          <FeaturedContent />
          <NewsArticles />
          <Videos />
          <Section1/>
          <Section2/>
          <VisualShortsSection />
          <VideoSection/>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
