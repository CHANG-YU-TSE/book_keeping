const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

exports.handler = async (event, context) => {
  // 確認請求方法為 POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  // 從 POST 資料中獲取引數 sql
  const sqlValue = JSON.parse(event.body).sql || 'No value provided for sql';

  // 連結數據庫
  const dbConfig = {
    host: 'mysql.sqlpub.com',
    user: 'herb_db_user',
    password: 'nk45Mte4Zhb5hw9K',
    database: 'herb_db',
    port: 3306
  };

  const connection = mysql.createConnection(dbConfig);

  try {
    // 建立數據庫連接
    await connection.connect();

    // 執行 SQL 查詢
    const [results] = await connection.execute(sqlValue);

    // 將結果轉換為 JSON 格式
    const jsonResult = JSON.stringify(results);

    // 回傳結果給呼叫者
    return {
      statusCode: 200,
      body: jsonResult,
    };
  } catch (error) {
    console.error('Error executing SQL query:', error);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  } finally {
    // 關閉數據庫連接
    await connection.end();
  };
};
