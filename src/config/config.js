export const API_BASE_URL = 'http://localhost:8080/api';

export const endpoints = {
    news: {
        all: `${API_BASE_URL}/news?sort=id,desc`,
        byId: (id) => `${API_BASE_URL}/news/${id}`,
        byCategory: (categoryId) => `${API_BASE_URL}/news/category/${categoryId}?sort=id,desc`,
        byDistricts: `${API_BASE_URL}/news/by-districts?sort=id,desc`,
        videos: `${API_BASE_URL}/news/video?sort=id,desc`
    }
};

export const fetchNews = async () => {
    try {
        const response = await fetch(endpoints.news.all);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return Array.isArray(data) ? data : (data.content || []);
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};

export const fetchNewsByCategory = async (categoryId) => {
    try {
        const response = await fetch(endpoints.news.byCategory(categoryId));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return Array.isArray(data) ? data : (data.content || []);
    } catch (error) {
        console.error('Error fetching news by category:', error);
        throw error;
    }
};

export const fetchNewsByDistricts = async () => {
    try {
        const response = await fetch(endpoints.news.byDistricts);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return Array.isArray(data) ? data : (data.content || []);
    } catch (error) {
        console.error('Error fetching district news:', error);
        throw error;
    }
};

export const fetchNewsVideos = async () => {
    try {
        const response = await fetch(endpoints.news.videos);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const newsData = Array.isArray(data) ? data : (data.content || []);
        return newsData.filter(item => item && item.videoUrl && item.videoUrl.trim() !== '')
            .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
    } catch (error) {
        console.error('Error fetching video news:', error);
        throw error;
    }
};
