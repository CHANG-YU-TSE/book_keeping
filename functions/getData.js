
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

const pool = mysql.createPool(dbConfig);

app.get('/.netlify/functions/getData', (req, res) => {
  const sqlStatement = 'SELECT * FROM test_table';

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

exports.handler = async (event, context) =>
