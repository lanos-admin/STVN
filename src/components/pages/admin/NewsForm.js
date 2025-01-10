import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Box,
  Typography,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/config';
import ImageUpload from '../../common/ImageUpload';

const NewsForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openDistrictDialog, setOpenDistrictDialog] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newDistrictName, setNewDistrictName] = useState('');
  const [newDistrictState, setNewDistrictState] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    fullContent: '',
    imageUrl: '',
    videoUrl: '',
    type: 'NEWS',
    categoryId: '',
    districtId: '',
    author: '',
    breaking: false,
    trending: false,
    publishedDate: new Date().toISOString(),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, districtsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/categories`),
          axios.get(`${API_BASE_URL}/districts`)
        ]);
        setCategories(categoriesRes.data);
        setDistricts(districtsRes.data);

        if (id) {
          const newsRes = await axios.get(`${API_BASE_URL}/news/${id}`);
          setFormData({
            ...newsRes.data,
            categoryId: newsRes.data.category.id,
            districtId: newsRes.data.district.id,
          });
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setSnackbar({
          open: true,
          message: 'Failed to load data. Please try again.',
          severity: 'error'
        });
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: e.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Get the selected category and district names
      const selectedCategory = categories.find(cat => cat.id === formData.categoryId)?.name || '';
      const selectedDistrict = districts.find(dist => dist.id === formData.districtId)?.name || '';

      const payload = {
        title: formData.title,
        content: formData.content,
        fullContent: formData.fullContent,
        imageUrl: formData.imageUrl,
        videoUrl: formData.videoUrl || '',
        type: formData.type,
        category: selectedCategory,     // Send the category name instead of ID
        district: selectedDistrict,     // Send the district name instead of ID
        author: formData.author,
        isBreaking: formData.breaking,
        isTrending: formData.trending,
        publishedDate: new Date().toISOString()
      };

      // Debug logs
      console.log('Form Data:', formData);
      console.log('Selected Category:', selectedCategory);
      console.log('Selected District:', selectedDistrict);
      console.log('Final Payload:', payload);

      let response;
      try {
        if (id) {
          response = await axios.put(`${API_BASE_URL}/news/${id}`, payload);
        } else {
          response = await axios.post(`${API_BASE_URL}/news`, payload);
        }
        console.log('Success Response:', response.data);
        
        setSnackbar({
          open: true,
          message: id ? 'News article updated successfully!' : 'News article created successfully!',
          severity: 'success'
        });

        // Wait for a short time to show the success message
        setTimeout(() => {
          navigate('/admin/news');
        }, 1500);
      } catch (error) {
        console.error('API Error Details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            data: JSON.parse(error.config?.data || '{}')
          }
        });

        let errorMessage = 'Failed to save news article. ';
        if (error.response?.data?.message) {
          errorMessage += error.response.data.message;
        } else if (error.response?.data?.error) {
          errorMessage += error.response.data.error;
        } else {
          errorMessage += 'Please check the console for more details.';
        }

        setSnackbar({
          open: true,
          message: errorMessage,
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('General Error:', error);
      setSnackbar({
        open: true,
        message: 'An unexpected error occurred. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/categories`, { name: newCategory });
      setCategories([...categories, response.data]);
      setFormData({ ...formData, categoryId: response.data.id });
      setNewCategory('');
      setOpenCategoryDialog(false);
      setSnackbar({
        open: true,
        message: 'Category added successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Failed to add category:', error);
      setSnackbar({
        open: true,
        message: 'Failed to add category. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleAddDistrict = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/districts`, {
        name: newDistrictName,
        state: newDistrictState
      });
      setDistricts([...districts, response.data]);
      setFormData({ ...formData, districtId: response.data.id });
      setNewDistrictName('');
      setNewDistrictState('');
      setOpenDistrictDialog(false);
      setSnackbar({
        open: true,
        message: 'District added successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Failed to add district:', error);
      setSnackbar({
        open: true,
        message: 'Failed to add district. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'Edit News Article' : 'Create News Article'}
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Grid>
          
          <Grid item xs={12}>
            <ImageUpload
              onImageUpload={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
              initialImage={formData.imageUrl}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Short Content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Content"
              name="fullContent"
              value={formData.fullContent}
              onChange={handleChange}
              multiline
              rows={6}
              required
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Video URL"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <MenuItem value="NEWS">News</MenuItem>
                <MenuItem value="VIDEO">Video</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                >
                  {categories.map(category => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenCategoryDialog(true)}
                sx={{ minWidth: 'auto', px: 2 }}
              >
                <AddIcon />
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <FormControl fullWidth>
                <InputLabel>District</InputLabel>
                <Select
                  name="districtId"
                  value={formData.districtId}
                  onChange={handleChange}
                  required
                >
                  {districts.map(district => (
                    <MenuItem key={district.id} value={district.id}>
                      {district.name} - {district.state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenDistrictDialog(true)}
                sx={{ minWidth: 'auto', px: 2 }}
              >
                <AddIcon />
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.breaking}
                  onChange={handleChange}
                  name="breaking"
                />
              }
              label="Breaking News"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.trending}
                  onChange={handleChange}
                  name="trending"
                />
              }
              label="Trending"
            />
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : (id ? 'Update' : 'Create')}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/admin/news')}
            disabled={loading}
          >
            Cancel
          </Button>
        </Box>
      </Box>

      {/* Add Category Dialog */}
      <Dialog open={openCategoryDialog} onClose={() => setOpenCategoryDialog(false)}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCategoryDialog(false)}>Cancel</Button>
          <Button onClick={handleAddCategory} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add District Dialog */}
      <Dialog open={openDistrictDialog} onClose={() => setOpenDistrictDialog(false)}>
        <DialogTitle>Add New District</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                label="District Name"
                type="text"
                fullWidth
                variant="outlined"
                value={newDistrictName}
                onChange={(e) => setNewDistrictName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="State"
                type="text"
                fullWidth
                variant="outlined"
                value={newDistrictState}
                onChange={(e) => setNewDistrictState(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDistrictDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleAddDistrict} 
            variant="contained" 
            color="primary"
            disabled={!newDistrictName || !newDistrictState}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default NewsForm;
