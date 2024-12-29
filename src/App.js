import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/pages/landingPage/LandingPage';
import AdminPanel from '../src/components/pages/adminPanel/AdminPanel';
import NewsDetail from './components/pages/newsDetail/NewsDetail';



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/:id" element={<NewsDetail />} />
    </Routes>
  );
};

export default App;
