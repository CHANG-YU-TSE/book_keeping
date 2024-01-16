const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const dbConfig = {
  host: 'mysql.sqlpub.com',
  user: 'herb_db_user',
  password: 'nk45Mte4Zhb5hw9K',
  database: 'herb_db',
  port: 3306
};

// 設定路由處理 HTTP POST 請求
app.post('/api/get-data', (req, res) => {
  // 從 POST 資料中獲取引數 sql
  const sqlStatement = req.body.sql || 'SELECT * FROM test_table';

  // 創建數據庫連接
  const connection = mysql.createConnection(dbConfig);

  // 連接到數據庫
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // 執行 SQL 查詢
    connection.query(sqlStatement, (queryError, results) => {
      // 關閉數據庫連接
      connection.end();

      if (queryError) {
        console.error('Error executing query:', queryError);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      // 將結果轉換為 JSON 格式
      const jsonResult = JSON.stringify(results);

      // 返回 JSON 格式的結果
      res.status(200).json({ result: jsonResult });
    });
  });
});

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
