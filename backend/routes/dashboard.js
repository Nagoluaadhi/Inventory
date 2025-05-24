const express = require('express');
const router = express.Router();
const db = require('../db');

// Inventory balance by ID
router.get('/inventory/:id', (req, res) => {
  db.query('SELECT qty FROM inventory WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error fetching inventory' });
    res.json(result[0]);
  });
});

// Client balance by ID
router.get('/clients/:id', (req, res) => {
  db.query('SELECT qty FROM clients WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error fetching client' });
    res.json(result[0]);
  });
});

// User usage balance
router.get('/usage', (req, res) => {
  const { user_id, client_id, inventory_id } = req.query;
  db.query(
    'SELECT qty FROM user_usage WHERE user_id = ? AND client_id = ? AND inventory_id = ?',
    [user_id, client_id, inventory_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Error fetching usage' });
      res.json(result[0] || { qty: 0 });
    }
  );
});

module.exports = router;
