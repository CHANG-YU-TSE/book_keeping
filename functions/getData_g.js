const express = require('express');
const mysql = require('mysql');
const app = express();

// 使用 express.json() 中間件來解析 POST 資料
app.use(express.json());

const dbConfig = {
  host: 'mysql.sqlpub.com',
  user: 'herb_db_user',
  password: 'nk45Mte4Zhb5hw9K',
  database: 'herb_db',
  port: 3306
};

const pool = mysql.createPool(dbConfig);

const handler = async (req, res) => {
  // 從 POST 資料中獲取 SQL statement，若未提供預設為 select * from test_table
  const sqlStatement = req.body && req.body.sql
    ? req.body.sql
    : 'SELECT * FROM test_table';

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    connection.query(sqlStatement, (queryError, results) => {
      connection.release();

      if (queryError) {
        console.error('Error executing query:', queryError);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      const jsonResult = JSON.stringify(results);
      res.status(200).json({ data: jsonResult });
    });
  });
};

app.post('/your-api-endpoint', handler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
