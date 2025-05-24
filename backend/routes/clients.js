const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/clients', (req, res) => {
  db.query('SELECT * FROM clients', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});
router.post('/clients', (req, res) => {
  const { client_name, address } = req.body;
  db.query('INSERT INTO clients (client_name, address) VALUES (?, ?)', 
    [client_name, address], 
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});

module.exports = router;
