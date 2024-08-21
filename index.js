const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose'); // Add this line to import mongoose
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));