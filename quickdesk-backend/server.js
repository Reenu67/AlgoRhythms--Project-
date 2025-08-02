// server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const ticketRoutes = require('./routes/ticketRoutes');
app.use('/api/tickets', ticketRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('✅ QuickDesk Backend is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});