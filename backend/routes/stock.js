const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all stock-in entries
router.get('/stockin', (req, res) => {
  db.query(`
    SELECT st.*, inv.item_name, cl.client_name FROM stock_transactions st
    JOIN inventory inv ON st.inventory_id = inv.id
    JOIN clients cl ON st.client_id = cl.id
    WHERE st.transaction_type = 'in'
    ORDER BY st.id DESC
  `, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add new stock-in
router.post('/stockin', (req, res) => {
  const { date, inventory_id, client_id, barcode, invoice_no, qty, remark } = req.body;

  const insertSql = `INSERT INTO stockin (date, inventory_id, client_id, barcode, invoice_no, qty, remark)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(insertSql, [date, inventory_id, client_id, barcode, invoice_no, qty, remark], (err) => {
    if (err) return res.sendStatus(500);

    const updateInventory = `UPDATE inventory SET qty = qty + ? WHERE id = ?`;
    db.query(updateInventory, [qty, inventory_id]);

    const updateClient = `UPDATE clients SET qty = qty + ? WHERE id = ?`;
    db.query(updateClient, [qty, client_id]);

    res.json({ message: 'Stock In recorded and balances updated' });
  });
});

router.delete('/stockin/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM stockin WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ message: 'Deleted' });
  });
});
// Get all stock-out entries
router.get('/outward', (req, res) => {
  db.query(`
    SELECT st.*, inv.item_name, cl.client_name FROM stock_transactions st
    JOIN inventory inv ON st.inventory_id = inv.id
    JOIN clients cl ON st.client_id = cl.id
    WHERE st.transaction_type = 'out'
    ORDER BY st.id DESC
  `, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add new stock-out
router.post('/stockout', (req, res) => {
  const { user_id, date, inventory_id, client_id, barcode, invoice_no, qty, remark } = req.body;

  const insertSql = `INSERT INTO stockout (date, inventory_id, client_id, barcode, invoice_no, qty, remark, user_id)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(insertSql, [date, inventory_id, client_id, barcode, invoice_no, qty, remark, user_id], (err) => {
    if (err) return res.sendStatus(500);

    const updateInventory = `UPDATE inventory SET qty = qty - ? WHERE id = ?`;
    db.query(updateInventory, [qty, inventory_id]);

    const updateClient = `UPDATE clients SET qty = qty - ? WHERE id = ?`;
    db.query(updateClient, [qty, client_id]);

    const updateUsage = `INSERT INTO user_usage (user_id, client_id, inventory_id, qty)
                         VALUES (?, ?, ?, ?)
                         ON DUPLICATE KEY UPDATE qty = qty + VALUES(qty)`;

    db.query(updateUsage, [user_id, client_id, inventory_id, qty]);

    res.json({ message: 'Stock Out recorded and balances updated' });
  });
});

router.delete('/outward/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM outward WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ message: 'Deleted' });
  });
});

module.exports = router;
