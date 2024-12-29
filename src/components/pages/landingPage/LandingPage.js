import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

// Components
import NavBar1 from './NavBar1';
import NavBar2 from './NavBar2';
import "./NavBar1.css";
import "./NavBar2.css";
import "./SponsoredBanner1.css";
import FeaturedContent from './FeaturedContent';
import NewsArticles from './NewsArticles';
import Videos from './Videos';
import Footer from './footer';
import GoogleAd1 from './GoogleAd1';
import SponsoredBanner1 from './SponsoredBanner1';
import HeadNewsCard from "./HeadNewsCard";
import UserPoints from "./UserPoints";
import CardGrid from "./CardGrid";
import ElectionCard from './ElectionCard';
import ElectionCard2 from './ElectionCard2';
import Section1 from './Section1';
import Section2 from './Section2';
import VideoSection from './VideoSection';
import Politics from './Politics';
import Crime from './Crime';
import Sports from './Sports';
import Entertainment from './Entertainment';
import National from './National';
import International from './International';
import WhatsAppButton from './whatsapp';

const LandingPage = () => {
  return (
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
            <HeadNewsCard />
          </div>
          {/* <div className="right-panel">
            <UserPoints />
          </div> */}
        </div>
        <div className="election-cards-container" style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>

        </div>
          <FeaturedContent />
          <NewsArticles />
          <Videos />
          <Section1/>
          <VideoSection/>
          <Politics/>
          <Crime/>  
          <Sports/>
          <SponsoredBanner1 
          imageSrc="https://example.com/sponsor-banner.jpg"
          altText="Sponsored Ad"
          link="https://example.com"/>
          <Entertainment/>
          <National/>
          <SponsoredBanner1 
          imageSrc="https://example.com/sponsor-banner.jpg"
          altText="Sponsored Ad"
          link="https://example.com"/>
          <International/>
          <WhatsAppButton/>
        </main>
        <Footer />
      </div>
  );
};

export default LandingPage;
