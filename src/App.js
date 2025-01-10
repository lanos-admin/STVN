import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/pages/landingPage/LandingPage';
import NewsDetail from './components/pages/newsDetail/NewsDetail';
import CategoryNews from './components/pages/categoryNews/CategoryNews';
import { NewsProvider } from './context/NewsContext';
import AdminLayout from './components/pages/admin/AdminLayout';
import NewsList from './components/pages/admin/NewsList';
import NewsForm from './components/pages/admin/NewsForm';
import CategoryList from './components/pages/admin/CategoryList';
import DistrictList from './components/pages/admin/DistrictList';

function App() {
  return (
    <NewsProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/:category" element={<CategoryNews />} />
        <Route path="/location/:district" element={<CategoryNews />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<NewsList />} />
          <Route path="news" element={<NewsList />} />
          <Route path="news/create" element={<NewsForm />} />
          <Route path="news/edit/:id" element={<NewsForm />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="districts" element={<DistrictList />} />
        </Route>
      </Routes>
    </NewsProvider>
  );
}

export default App;
