const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const stockRoutes = require('./routes/stock');
const inventoryRoutes = require('./routes/inventory');
const clientRoutes = require('./routes/clients');
const dashboardRoutes = require('./routes/dashboard');
const servicesRoutes = require('./routes/services');
const reportRoutes = require('./routes/report');
const userRoutes = require('./routes/users');

app.use(cors());
app.use(bodyParser.json());
app.use(userRoutes);
app.use(reportRoutes);
app.use(servicesRoutes);
app.use(dashboardRoutes);
app.use(stockRoutes);
app.use(inventoryRoutes);
app.use(clientRoutes);


app.post('/login', (req, res) => {
  const { username, password, role } = req.body;
  db.query(
    'SELECT * FROM users WHERE username = ? AND password = ? AND role = ?',
    [username, password, role],
    (err, results) => {
      if (err) return res.sendStatus(500);
      if (results.length === 0) return res.status(401).send('Invalid login');
      res.json(results[0]);
    }
  );
});

app.listen(3001, () => {
  console.log('🚀 Server is running on port 3001');
});