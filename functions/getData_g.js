const express = require('express');
const mysql = require('mysql');

const app = express();

const handler = async (req, res) => {
  // 從 URL query 中獲取 SQL statement 和其他參數
  const sqlStatement = req.query.sql ? req.query.sql : 'SELECT * FROM test_table';

  const dbConfig = {
    host: req.query.host ? req.query.host : 'mysql.sqlpub.com',
    user: req.query.user ? req.query.user : 'herb_db_user',
    password: req.query.password ? req.query.password : 'nk45Mte4Zhb5hw9K',
    database: req.query.database ? req.query.database : 'herb_db',
    port: req.query.port ? parseInt(req.query.port, 10) : 3306
  };

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
      res.status(200).send(jsonResult);
    });
  });
};

app.get('/.netlify/functions/getData', handler);

module.exports = app;
