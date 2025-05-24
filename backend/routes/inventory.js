const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/inventory', (req, res) => {
  db.query('SELECT * FROM inventory', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

router.post('/inventory', (req, res) => {
  const { item_name, model_no, remark } = req.body;
  db.query('INSERT INTO inventory (item_name, model_no, remark) VALUES (?, ?, ?)', 
    [item_name, model_no, remark], 
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});

module.exports = router;
