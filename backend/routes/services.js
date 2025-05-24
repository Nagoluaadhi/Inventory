const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/services', (req, res) => {
  db.query(`
    SELECT s.*, c.client_name FROM services s
    JOIN clients c ON s.client_id = c.id
    ORDER BY s.id DESC
  `, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

router.post('/services', (req, res) => {
  const { client_id, vehicle_no, service_remark, charges, status, barcode, warranty_status, date_time } = req.body;
  db.query(`
    INSERT INTO services (client_id, vehicle_no, service_remark, charges, status, barcode, warranty_status, date_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [client_id, vehicle_no, service_remark, charges, status, barcode, warranty_status, date_time],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});

router.delete('/services/:id', (req, res) => {
  db.query('DELETE FROM services WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

module.exports = router;
