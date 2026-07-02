const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));
app.use(express.json());

// Routes
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// MongoDB connection with cache (serverless ke liye zaroori)
let cachedConnection = null;

async function connectDB() {
  if (cachedConnection) return cachedConnection;
  cachedConnection = await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ MongoDB Connected!');
  return cachedConnection;
}

connectDB();

app.listen(5000, () => console.log('🚀 Server running on port 5000'));

module.exports = app;