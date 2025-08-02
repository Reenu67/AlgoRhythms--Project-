const express = require('express');
const router = express.Router();

// In-memory store
let tickets = [];

// Create ticket
router.post('/create', (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description required' });
  }

  const newTicket = {
    id: Date.now().toString(),
    title,
    description,
    status: 'open',
    createdAt: new Date()
  };

  tickets.push(newTicket);
  res.status(201).json({ message: 'Ticket created', ticket: newTicket });
});

// Get all tickets
router.get('/all', (req, res) => {
  res.status(200).json(tickets);
});

module.exports = router;