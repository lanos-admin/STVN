import React, { useState, useEffect } from "react";
import "./LocationBasedSection.css";
import CardImg from "../assets/News1 6.png";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsCalendar3 } from "react-icons/bs";

// Sample location data - replace with your actual data
const locationsData = {
  सागर: [
    { 
      title: "सागर समाचार 1", 
      description: "विवरण 1", 
      location: "सागर", 
      urlToImage: CardImg, 
      author: "Author 1", 
      date: new Date('2024-01-01T10:00:00.000Z') 
    },
    { 
      title: "सागर समाचार 2", 
      description: "विवरण 2", 
      location: "सागर", 
      urlToImage: CardImg, 
      author: "Author 2", 
      date: new Date('2024-01-02T11:00:00.000Z') 
    },
    {
      title: "सागर में नई शिक्षा नीति का सफल कार्यान्वयन",
      description: "सागर जिले के सभी विद्यालयों में नई शिक्षा नीति को सफलतापूर्वक लागू किया गया है।",
      location: "सागर",
      urlToImage: CardImg,
      author: "राजेश शर्मा",
      date: new Date('2024-01-03T09:30:00.000Z')
    },
    {
      title: "सागर में स्मार्ट सिटी प्रोजेक्ट की प्रगति",
      description: "स्मार्ट सिटी प्रोजेक्ट के तहत सागर में कई नई सुविधाएं विकसित की जा रही हैं।",
      location: "सागर",
      urlToImage: CardImg,
      author: "अमित पटेल",
      date: new Date('2024-01-04T14:15:00.000Z')
    },
    {
      title: "सागर में कृषि मेला का आयोजन",
      description: "किसानों के लिए विशेष कृषि मेले का आयोजन किया गया, जिसमें नई तकनीकों का प्रदर्शन किया गया।",
      location: "सागर",
      urlToImage: CardImg,
      author: "सुनील यादव",
      date: new Date('2024-01-05T11:45:00.000Z')
    },
    {
      title: "सागर में नया मेडिकल कॉलेज",
      description: "सागर में नए मेडिकल कॉलेज की स्थापना की घोषणा की गई है।",
      location: "सागर",
      urlToImage: CardImg,
      author: "प्रीति शर्मा",
      date: new Date('2024-01-06T16:20:00.000Z')
    },
    {
      title: "सागर में खेल प्रतियोगिता",
      description: "राज्य स्तरीय खेल प्रतियोगिता का आयोजन सागर में किया जाएगा।",
      location: "सागर",
      urlToImage: CardImg,
      author: "विकास गुप्ता",
      date: new Date('2024-01-07T13:00:00.000Z')
    }
  ],
  इंदौर: [
    { 
      title: "इंदौर समाचार 1", 
      description: "विवरण 1", 
      location: "इंदौर", 
      urlToImage: CardImg, 
      author: "Author 3", 
      date: new Date('2024-01-03T12:00:00.000Z') 
    },
    { 
      title: "इंदौर समाचार 2", 
      description: "विवरण 2", 
      location: "इंदौर", 
      urlToImage: CardImg, 
      author: "Author 4", 
      date: new Date('2024-01-04T13:00:00.000Z') 
    },
    {
      title: "इंदौर में स्वच्छता अभियान",
      description: "इंदौर ने लगातार छठी बार स्वच्छ शहर का खिताब जीता।",
      location: "इंदौर",
      urlToImage: CardImg,
      author: "रोहित शर्मा",
      date: new Date('2024-01-05T10:30:00.000Z')
    },
    {
      title: "इंदौर में नया आईटी पार्क",
      description: "शहर में नए आईटी पार्क की स्थापना से रोजगार के अवसर बढ़ेंगे।",
      location: "इंदौर",
      urlToImage: CardImg,
      author: "नेहा पाटिल",
      date: new Date('2024-01-06T15:45:00.000Z')
    },
    {
      title: "इंदौर में अंतर्राष्ट्रीय व्यापार मेला",
      description: "शहर में पहली बार अंतर्राष्ट्रीय व्यापार मेले का आयोजन।",
      location: "इंदौर",
      urlToImage: CardImg,
      author: "आशीष जैन",
      date: new Date('2024-01-07T11:20:00.000Z')
    },
    {
      title: "इंदौर में नया मेट्रो प्रोजेक्ट",
      description: "शहर में मेट्रो रेल परियोजना का शुभारंभ किया गया।",
      location: "इंदौर",
      urlToImage: CardImg,
      author: "दीपक वर्मा",
      date: new Date('2024-01-08T14:30:00.000Z')
    },
    {
      title: "इंदौर क्रिकेट स्टेडियम का विस्तार",
      description: "होल्कर स्टेडियम का आधुनिकीकरण और विस्तार किया जाएगा।",
      location: "इंदौर",
      urlToImage: CardImg,
      author: "संजय मिश्रा",
      date: new Date('2024-01-09T12:15:00.000Z')
    }
  ],
  उज्जैन: [
    { 
      title: "उज्जैन समाचार 1", 
      description: "विवरण 1", 
      location: "उज्जैन", 
      urlToImage: CardImg, 
      author: "Author 5", 
      date: new Date('2024-01-05T14:00:00.000Z') 
    },
    { 
      title: "उज्जैन समाचार 2", 
      description: "विवरण 2", 
      location: "उज्जैन", 
      urlToImage: CardImg, 
      author: "Author 6", 
      date: new Date('2024-01-06T15:00:00.000Z') 
    },
    {
      title: "महाकाल मंदिर में नई व्यवस्था",
      description: "श्री महाकालेश्वर मंदिर में भक्तों के लिए नई दर्शन व्यवस्था लागू।",
      location: "उज्जैन",
      urlToImage: CardImg,
      author: "राकेश त्रिवेदी",
      date: new Date('2024-01-07T09:00:00.000Z')
    },
    {
      title: "उज्जैन में धार्मिक समारोह",
      description: "शहर में वार्षिक धार्मिक समारोह का आयोजन किया जाएगा।",
      location: "उज्जैन",
      urlToImage: CardImg,
      author: "मोहन शर्मा",
      date: new Date('2024-01-08T16:30:00.000Z')
    },
    {
      title: "उज्जैन में नया संग्रहालय",
      description: "प्राचीन कलाकृतियों के संरक्षण के लिए नए संग्रहालय का निर्माण।",
      location: "उज्जैन",
      urlToImage: CardImg,
      author: "अनिता राय",
      date: new Date('2024-01-09T13:45:00.000Z')
    },
    {
      title: "उज्जैन में योग शिविर",
      description: "अंतर्राष्ट्रीय योग शिविर का आयोजन उज्जैन में किया जाएगा।",
      location: "उज्जैन",
      urlToImage: CardImg,
      author: "योगेश पांडे",
      date: new Date('2024-01-10T11:00:00.000Z')
    },
    {
      title: "उज्जैन में कला महोत्सव",
      description: "शहर में तीन दिवसीय कला और संस्कृति महोत्सव का आयोजन।",
      location: "उज्जैन",
      urlToImage: CardImg,
      author: "श्वेता सिंह",
      date: new Date('2024-01-11T15:20:00.000Z')
    }
  ],
  ग्वालियर: [
    { 
      title: "ग्वालियर समाचार 1", 
      description: "विवरण 1", 
      location: "ग्वालियर", 
      urlToImage: CardImg, 
      author: "Author 7", 
      date: new Date('2024-01-07T16:00:00.000Z') 
    },
    { 
      title: "ग्वालियर समाचार 2", 
      description: "विवरण 2", 
      location: "ग्वालियर", 
      urlToImage: CardImg, 
      author: "Author 8", 
      date: new Date('2024-01-08T17:00:00.000Z') 
    },
    {
      title: "ग्वालियर किले का जीर्णोद्धार",
      description: "ऐतिहासिक ग्वालियर किले के जीर्णोद्धार का कार्य शुरू।",
      location: "ग्वालियर",
      urlToImage: CardImg,
      author: "राजेंद्र सिंह",
      date: new Date('2024-01-09T10:15:00.000Z')
    },
    {
      title: "ग्वालियर में संगीत समारोह",
      description: "तानसेन संगीत समारोह का भव्य आयोजन किया जाएगा।",
      location: "ग्वालियर",
      urlToImage: CardImg,
      author: "शिवानी शर्मा",
      date: new Date('2024-01-10T14:45:00.000Z')
    },
    {
      title: "ग्वालियर में नया एयरपोर्ट टर्मिनल",
      description: "अंतर्राष्ट्रीय हवाई अड्डे के नए टर्मिनल का उद्घाटन।",
      location: "ग्वालियर",
      urlToImage: CardImg,
      author: "विवेक सक्सेना",
      date: new Date('2024-01-11T12:30:00.000Z')
    },
    {
      title: "ग्वालियर में डिजिटल म्यूजियम",
      description: "शहर के इतिहास को दर्शाने वाले डिजिटल म्यूजियम का निर्माण।",
      location: "ग्वालियर",
      urlToImage: CardImg,
      author: "अंकित गुप्ता",
      date: new Date('2024-01-12T16:00:00.000Z')
    },
    {
      title: "ग्वालियर में स्पोर्ट्स अकादमी",
      description: "नई खेल अकादमी की स्थापना से युवा खिलाड़ियों को मिलेगा प्रोत्साहन।",
      location: "ग्वालियर",
      urlToImage: CardImg,
      author: "मनीष यादव",
      date: new Date('2024-01-13T11:45:00.000Z')
    }
  ],
  चंबल: [
    { 
      title: "चंबल समाचार 1", 
      description: "विवरण 1", 
      location: "चंबल", 
      urlToImage: CardImg, 
      author: "Author 9", 
      date: new Date('2024-01-09T18:00:00.000Z') 
    },
    { 
      title: "चंबल समाचार 2", 
      description: "विवरण 2", 
      location: "चंबल", 
      urlToImage: CardImg, 
      author: "Author 10", 
      date: new Date('2024-01-10T19:00:00.000Z') 
    },
    {
      title: "चंबल नदी संरक्षण योजना",
      description: "चंबल नदी के संरक्षण के लिए नई परियोजना की शुरुआत।",
      location: "चंबल",
      urlToImage: CardImg,
      author: "प्रकाश सिंह",
      date: new Date('2024-01-11T09:45:00.000Z')
    },
    {
      title: "चंबल में वन्यजीव अभयारण्य",
      description: "घड़ियाल संरक्षण के लिए नए कदम उठाए गए।",
      location: "चंबल",
      urlToImage: CardImg,
      author: "मीना कुमारी",
      date: new Date('2024-01-12T15:30:00.000Z')
    },
    {
      title: "चंबल क्षेत्र में सौर ऊर्जा प्लांट",
      description: "नवीकरणीय ऊर्जा को बढ़ावा देने के लिए नया सौर ऊर्जा प्लांट।",
      location: "चंबल",
      urlToImage: CardImg,
      author: "राहुल वर्मा",
      date: new Date('2024-01-13T11:15:00.000Z')
    },
    {
      title: "चंबल में कृषि विकास योजना",
      description: "किसानों के लिए नई कृषि विकास योजना का शुभारंभ।",
      location: "चंबल",
      urlToImage: CardImg,
      author: "संजय कुमार",
      date: new Date('2024-01-14T14:20:00.000Z')
    },
    {
      title: "चंबल में पर्यटन विकास",
      description: "क्षेत्र में पर्यटन को बढ़ावा देने के लिए नई पहल।",
      location: "चंबल",
      urlToImage: CardImg,
      author: "रेखा शर्मा",
      date: new Date('2024-01-15T10:30:00.000Z')
    }
  ],
  जबलपुर: [
    { 
      title: "जबलपुर समाचार 1", 
      description: "विवरण 1", 
      location: "जबलपुर", 
      urlToImage: CardImg, 
      author: "Author 11", 
      date: new Date('2024-01-11T20:00:00.000Z') 
    },
    { 
      title: "जबलपुर समाचार 2", 
      description: "विवरण 2", 
      location: "जबलपुर", 
      urlToImage: CardImg, 
      author: "Author 12", 
      date: new Date('2024-01-12T21:00:00.000Z') 
    },
    {
      title: "जबलपुर में नई मेडिकल यूनिवर्सिटी",
      description: "राज्य की पहली मेडिकल यूनिवर्सिटी की स्थापना जबलपुर में होगी।",
      location: "जबलपुर",
      urlToImage: CardImg,
      author: "डॉ. अनिल शर्मा",
      date: new Date('2024-01-13T10:00:00.000Z')
    },
    {
      title: "जबलपुर में स्मार्ट ट्रैफिक सिस्टम",
      description: "शहर में स्मार्ट ट्रैफिक मैनेजमेंट सिस्टम की शुरुआत।",
      location: "जबलपुर",
      urlToImage: CardImg,
      author: "विशाल पटेल",
      date: new Date('2024-01-14T16:45:00.000Z')
    },
    {
      title: "जबलपुर में नया शॉपिंग मॉल",
      description: "शहर के मध्य में नए मल्टीप्लेक्स और शॉपिंग मॉल का निर्माण।",
      location: "जबलपुर",
      urlToImage: CardImg,
      author: "रिया सिंह",
      date: new Date('2024-01-15T13:30:00.000Z')
    },
    {
      title: "जबलपुर में साइबर सुरक्षा केंद्र",
      description: "डिजिटल अपराधों से निपटने के लिए नया साइबर सुरक्षा केंद्र।",
      location: "जबलपुर",
      urlToImage: CardImg,
      author: "अमित राज",
      date: new Date('2024-01-16T11:20:00.000Z')
    },
    {
      title: "जबलपुर में पर्यावरण संरक्षण अभियान",
      description: "शहर में हरित क्षेत्र बढ़ाने के लिए विशेष अभियान की शुरुआत।",
      location: "जबलपुर",
      urlToImage: CardImg,
      author: "पूजा शर्मा",
      date: new Date('2024-01-17T15:00:00.000Z')
    }
  ]
};

const LocationBasedSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeLocation, setActiveLocation] = useState('सागर');
  const [searchQuery, setSearchQuery] = useState('');
  
  const locations = Object.keys(locationsData);

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

  const handleLocationChange = (location) => {
    setActiveLocation(location);
  };

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="locationbasedsection-container">
      <div className="locationbasedsection-NavBar">
        <div className="location-links">
          {locations.map((location) => (
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
          {locationsData[activeLocation].slice(0, 6).map((article, index) => (
            <Card key={index} article={article} index={index} />
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
        <IoShareSocialOutline className="share-icon" />
        <a href="#" className="read-more">
          और भी →
        </a>
      </div>
    </div>
  </div>
);

export default LocationBasedSection;
