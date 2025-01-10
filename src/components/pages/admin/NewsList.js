import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/config';

const NewsList = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedNewsId, setSelectedNewsId] = useState(null);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/news`);
      console.log('Fetched news:', response.data);
      setNews(response.data);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/news/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/news/${selectedNewsId}`);
      setDeleteDialogOpen(false);
      fetchNews(); // Refresh the list
    } catch (error) {
      console.error('Failed to delete news:', error);
    }
  };

  const openDeleteDialog = (id) => {
    setSelectedNewsId(id);
    setDeleteDialogOpen(true);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">News Articles</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/admin/news/create')}
        >
          Create News
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>District</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {news.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <Chip 
                    label={item.category?.name || 'No Category'} 
                    color="primary" 
                    variant="outlined" 
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={item.district?.name || 'No District'} 
                    color="secondary" 
                    variant="outlined" 
                    size="small"
                  />
                </TableCell>
                <TableCell>{item.author}</TableCell>
                <TableCell>
                  <Chip 
                    label={item.type} 
                    color={item.type === 'VIDEO' ? 'success' : 'default'} 
                    variant="outlined" 
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(item.id)} color="primary" size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => openDeleteDialog(item.id)} color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this news article?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default NewsList;
