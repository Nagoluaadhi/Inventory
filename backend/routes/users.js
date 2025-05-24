const express = require('express');
const router = express.Router();
const db = require('../db'); // or use your existing db connection if shared

// Create user
router.post('/users', (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const checkUserSql = 'SELECT * FROM users WHERE username = ?';
  db.query(checkUserSql, [username], (err, results) => {
    if (err) return res.sendStatus(500);
    if (results.length > 0) return res.status(409).json({ error: 'Username already exists' });

    const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.query(sql, [username, password, role], (err, result) => {
      if (err) return res.sendStatus(500);
      res.status(201).json({ message: 'User created' });
    });
  });
});

// List users
router.get('/users', (req, res) => {
  db.query('SELECT id, username, role FROM users', (err, results) => {
    if (err) return res.sendStatus(500);
    res.json(results);
  });
});

// Delete user
router.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  });
});


module.exports = router;
