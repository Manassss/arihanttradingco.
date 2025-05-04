require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const grainRoutes = require('./routes/grainRoutes');

const app = express();

// Set up CORS to allow requests from your frontend
app.use(cors({
  origin: 'https://arihanttradingco.vercel.app' // or '*' for all domains
}));

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Basic test route to verify server is running
app.get('/', (req, res) => res.send('API is running'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/grains', grainRoutes);

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));