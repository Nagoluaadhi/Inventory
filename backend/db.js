const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Aadhi@01',
  database: 'inventory_system'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ MySQL connected (from db.js)');
});

module.exports = db;
