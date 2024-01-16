const express = require('express');
const mysql = require('mysql2');

const app = express();

const dbConfig = {
  host: 'mysql.sqlpub.com',
  user: 'herb_db_user',
  password: 'nk45Mte4Zhb5hw9K',
  database: 'herb_db',
  port: 3306
};

// 使用 middleware 解析 JSON 資料
app.use(express.json());

// 設定路由處理 HTTP POST 請求
app.post('getData_post', (req, res) => {
  // 從 POST 資料中獲取引數 sql
  const sqlValue = req.body.sql || 'No value provided for sql';

  // 建立數據庫連接池
  const pool = mysql.createPool(dbConfig);

  // 執行 SQL 查詢
  pool.query(sqlValue, (queryError, results) => {
    // 釋放數據庫連接
    pool.end();

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

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
