import React, { useState } from 'react';
import './VisualShortsSection.css';
import { BsPlayCircle } from 'react-icons/bs';
import CardImg from "../assets/News1 6.png";

const visualShortsData = [
  {
    id: 1,
    title: "सागर में विकास कार्यों की समीक्षा बैठक",
    duration: "2:30",
    views: "1.2K",
    thumbnail: CardImg,
    date: "2 घंटे पहले"
  },
  {
    id: 2,
    title: "मध्य प्रदेश में नई शिक्षा नीति का क्रियान्वयन",
    duration: "1:45",
    views: "890",
    thumbnail: CardImg,
    date: "3 घंटे पहले"
  },
  {
    id: 3,
    title: "सागर में स्वच्छता अभियान की शुरुआत",
    duration: "3:15",
    views: "2.1K",
    thumbnail: CardImg,
    date: "5 घंटे पहले"
  },
  {
    id: 4,
    title: "किसानों के लिए नई योजना का शुभारंभ",
    duration: "2:00",
    views: "1.5K",
    thumbnail: CardImg,
    date: "6 घंटे पहले"
  },
  {
    id: 5,
    title: "सागर में नए मेडिकल कॉलेज का निर्माण",
    duration: "4:20",
    views: "3.2K",
    thumbnail: CardImg,
    date: "8 घंटे पहले"
  },
  {
    id: 6,
    title: "युवाओं के लिए रोजगार मेला आयोजित",
    duration: "2:45",
    views: "950",
    thumbnail: CardImg,
    date: "10 घंटे पहले"
  }
];

const VisualShortsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="visual-shorts-section">
      <div className="section-header">
        <h2>विजुअल शॉर्ट्स</h2>
        <span className="view-all">सभी देखें →</span>
      </div>
      <div className="shorts-container">
        {visualShortsData.map((short, index) => (
          <div 
            key={short.id} 
            className="short-card"
            onMouseEnter={() => setActiveIndex(index)}
          >
            <div className="thumbnail-container">
              <img src={short.thumbnail} alt={short.title} />
              <div className="overlay">
                <BsPlayCircle className="play-icon" />
                <span className="duration">{short.duration}</span>
              </div>
            </div>
            <div className="short-info">
              <h3>{short.title}</h3>
              <div className="meta-info">
                <span className="views">{short.views} views</span>
                <span className="date">{short.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisualShortsSection;
