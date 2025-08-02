// routes/agentRoutes.js

const express = require('express');
const router = express.Router();

let agents = [
  { _id: "1", name: "Alice", role: "Admin", status: "Active" },
  { _id: "2", name: "Bob", role: "Support", status: "Active" }
];

// GET all agents
router.get('/', (req, res) => {
  res.json(agents);
});

module.exports = router;