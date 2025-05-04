// client/src/pages/AdminDashboard.js
import React, { useState, useEffect, useContext } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, InputAdornment
} from '@mui/material';
import { LanguageContext } from '../contexts/LanguageContext';
import axios from 'axios';

const apiUrl = 'https://arihanttradingco.onrender.com/api';

export default function AdminDashboard() {
  const { lang } = useContext(LanguageContext);
  const [grains, setGrains] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [current, setCurrent] = useState({});   // grain being edited
  const [openAdd, setOpenAdd]   = useState(false);
  const [newGrain, setNewGrain] = useState({ name_en:'', name_mr:'', price:0, unit:'per kg', imageUrl:'' });

  useEffect(() => {
    fetchGrains();
  }, []);

  async function fetchGrains() {
    const res = await axios.get(`${apiUrl}/grains`);
    setGrains(res.data);
  }

  function handleEdit(grain) {
    setCurrent(grain);
    setOpenEdit(true);
  }

  async function saveEdit() {
    const token = localStorage.getItem('token');  // Get token from localStorage
    if (!token) {
      console.log("No token found, please login first.");
      return;
    }
  
    try {
      const response = await axios.put(`${apiUrl}/grains/${current._id}`, {
        price: current.price,
        unit: current.unit,
        imageUrl: current.imageUrl
      }, {
        headers: {
          Authorization: `Bearer ${token}`  // Send token in the header
        }
      });
      setOpenEdit(false);
      fetchGrains();  // Reload grains after edit
    } catch (error) {
      console.error('Error saving edit', error);
    }
  }

// Frontend: AdminDashboard.js
async function deleteGrain(id) {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log("No token found, please login first.");
    return;
  }

  try {
    const response = await axios.delete(`${apiUrl}/grains/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    fetchGrains(); // Reload grains after deletion
  } catch (error) {
    console.error('Error deleting grain', error);
  }
}

  function handleAddChange(e) {
    setNewGrain(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function saveNew() {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    if (!token) {
      // Handle the case where no token is available
      console.log("No token found, please login first.");
      return;
    }
  
    try {
      const response = await axios.post(
        `${apiUrl}/grains`, 
        {
          name: { en: newGrain.name_en, mr: newGrain.name_mr },
          price: newGrain.price,
          unit: newGrain.unit
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // Pass the token in the request headers
          }
        }
      );
      setOpenAdd(false);
      setNewGrain({ name_en: '', name_mr: '', price: 0, unit: 'per kg' });
      fetchGrains();
    } catch (error) {
      console.error('Error creating new grain', error);
    }
  }

  return (
    <>
      <Box sx={{ p:4 }}>
        <Typography variant="h4" gutterBottom>
          {lang === 'en' ? 'Admin Dashboard' : 'प्रशासक डॅशबोर्ड'}
        </Typography>
        <Button variant="contained" color="primary" onClick={()=>setOpenAdd(true)} sx={{ mb:2 }}>
          {lang === 'en' ? 'Add Grain' : 'धान्य जोडा'}
        </Button>

        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', py: 1.5, px: 2, textAlign: 'left' }}>{lang === 'en' ? 'Name (EN)' : 'नाव (EN)'}</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', py: 1.5, px: 2, textAlign: 'left' }}>{lang === 'en' ? 'Name (MR)' : 'नाव (MR)'}</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', py: 1.5, px: 2, textAlign: 'right' }}>{lang === 'en' ? 'Price' : 'किंमत'}</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', py: 1.5, px: 2, textAlign: 'left' }}>{lang === 'en' ? 'Unit' : 'एकक'}</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', py: 1.5, px: 2, textAlign: 'center' }}>{lang === 'en' ? 'Actions' : 'क्रिया'}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {grains.map(g => (
                <TableRow key={g._id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' }, cursor: 'pointer' }}>
                  <TableCell sx={{ py: 1.5, px: 2, textAlign: 'left' }}>{g.name.en}</TableCell>
                  <TableCell sx={{ py: 1.5, px: 2, textAlign: 'left' }}>{g.name.mr}</TableCell>
                  <TableCell sx={{ py: 1.5, px: 2, textAlign: 'right' }}>₹ {g.price}</TableCell>
                  <TableCell sx={{ py: 1.5, px: 2, textAlign: 'left' }}>{g.unit}</TableCell>
                  <TableCell sx={{ py: 1.5, px: 2, textAlign: 'center' }}>
                    <Button size="small" variant="outlined" onClick={()=>handleEdit(g)} sx={{ mr: 1 }}>
                      Edit
                    </Button>
                    <Button size="small" color="error" variant="contained" onClick={()=>deleteGrain(g._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>{lang === 'en' ? 'Edit Grain' : 'धान्य संपादित करा'}</DialogTitle>
        <DialogContent sx={{ display: 'grid', gap: 2, width: 350 }}>
          <TextField
            label={lang === 'en' ? 'Price' : 'किंमत'}
            type="number"
            name="price"
            value={current.price || 0}
            onChange={e => setCurrent({ ...current, price: +e.target.value })}
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
          />
          <TextField
            label={lang === 'en' ? 'Unit' : 'एकक'}
            name="unit"
            value={current.unit || ''}
            onChange={e => setCurrent({ ...current, unit: e.target.value })}
            fullWidth
          />
          <TextField
            label={lang === 'en' ? 'Image URL' : 'इमेज URL'}
            name="imageUrl"
            value={current.imageUrl || ''}
            onChange={e => setCurrent({ ...current, imageUrl: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>{lang === 'en' ? 'Cancel' : 'रद्द करा'}</Button>
          <Button onClick={saveEdit} variant="contained" color="primary">{lang === 'en' ? 'Save' : 'जतन करा'}</Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>{lang === 'en' ? 'Add New Grain' : 'नवीन धान्य जोडा'}</DialogTitle>
        <DialogContent sx={{ display: 'grid', gap: 2, width: 350 }}>
          <TextField
            label="Name (EN)"
            name="name_en"
            value={newGrain.name_en}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            label="Name (MR)"
            name="name_mr"
            value={newGrain.name_mr}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            label={lang === 'en' ? 'Price' : 'किंमत'}
            type="number"
            name="price"
            value={newGrain.price}
            onChange={handleAddChange}
            fullWidth
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
          />
          <TextField
            label={lang === 'en' ? 'Unit' : 'एकक'}
            name="unit"
            value={newGrain.unit}
            onChange={handleAddChange}
            fullWidth
          />
          <TextField
            label={lang === 'en' ? 'Image URL' : 'इमेज URL'}
            name="imageUrl"
            value={newGrain.imageUrl}
            onChange={handleAddChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>{lang === 'en' ? 'Cancel' : 'रद्द करा'}</Button>
          <Button onClick={saveNew} variant="contained" color="primary">{lang === 'en' ? 'Add' : 'जोडा'}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}