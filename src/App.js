import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/pages/landingPage/LandingPage';
import NewsDetail from './components/pages/newsDetail/NewsDetail';
import CategoryNews from './components/pages/categoryNews/CategoryNews';
import { NewsProvider } from './context/NewsContext';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './components/pages/admin/AdminLayout';
import NewsList from './components/pages/admin/NewsList';
import NewsForm from './components/pages/admin/NewsForm';
import CategoryList from './components/pages/admin/CategoryList';
import DistrictList from './components/pages/admin/DistrictList';
import HeaderNewsDetail from './components/pages/newsDetail/HeaderNewsDetail';
import Login from './components/pages/auth/Login';
import Signup from './components/pages/auth/Signup';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <NewsProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/:category" element={<CategoryNews />} />
          <Route path="/location/:district" element={<CategoryNews />} />
          <Route path="/header-news/:id" element={<HeaderNewsDetail />} />
          
          {/* Auth Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/signup" element={<Signup />} />
          
          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }>
            <Route index element={<NewsList />} />
            <Route path="news" element={<NewsList />} />
            <Route path="news/create" element={<NewsForm />} />
            <Route path="news/edit/:id" element={<NewsForm />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="districts" element={<DistrictList />} />
          </Route>
        </Routes>
      </NewsProvider>
    </AuthProvider>
  );
}

export default App;
