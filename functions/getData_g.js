const express = require('express');
const mysql = require('mysql');

const app = express();

const dbConfig = {
  host: 'mysql.sqlpub.com',
  user: 'herb_db_user',
  password: 'nk45Mte4Zhb5hw9K',
  database: 'herb_db',
  port: 3306
};

app.post('/.netlify/functions/getData_post', (req, res) => {
  const sqlStatement = req.body.sql || 'SELECT * FROM test_table';

  const pool = mysql.createPool(dbConfig);

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    connection.query(sqlStatement, (queryError, results) => {
      connection.release();

      if (queryError) {
        console.error('Error executing query:', queryError);
        res.status(500).send('Internal Server Error');
        return;
      }

      const jsonResult = JSON.stringify(results);
      res.send(jsonResult);
    });
  });
});

module.exports = { handler: app };
