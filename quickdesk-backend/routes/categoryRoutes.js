// routes/categoryRoutes.js

const express = require('express');
const router = express.Router();

let categories = [
  { name: "Login Issues", description: "Problems logging in" },
  { name: "Network", description: "Connectivity problems" }
];

// GET all categories
router.get('/', (req, res) => {
  res.json(categories);
});

module.exports = router;