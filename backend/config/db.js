  // config/db.js
  const mysql = require('mysql2');
  require('dotenv').config();

  const urlDB = 'mysql://${{procces.env.MYSQLUSER}}:${{process.env.MYSQL_ROOT_PASSWORD}}@${{process.env.RAILWAY_TCP_PROXY_DOMAIN}}:${{process.env.RAILWAY_TCP_PROXY_PORT}}/${{process.env.MYSQL_DATABASE}}'
  const db = mysql.createConnection({
    urlDB
  });

  db.connect((err) => {
    if (err) {
      console.error('Database connection error:', err);
    } else {
      console.log('Connected to MySQL database');
    }
  });

  module.exports = db;
