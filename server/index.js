require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const grainRoutes = require('./routes/grainRoutes');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// basic test route
app.get('/', (req, res) => res.send('API is running'));

app.use('/api/auth', authRoutes);
app.use('/api/grains', grainRoutes);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));