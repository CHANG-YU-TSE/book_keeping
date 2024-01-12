  const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json()); // 解析 POST 請求的 JSON body

const handler = async (event, context) => {
  return new Promise((resolve, reject) => {
    // 從 POST 請求的 JSON body 中獲取 SQL statement 和其他參數
    const sqlStatement = event.body && event.body.sql
      ? event.body.sql
      : 'SELECT * FROM test_table';

    const dbConfig = {
      host: event.body && event.body.host ? event.body.host : 'mysql.sqlpub.com',
      user: event.body && event.body.user ? event.body.user : 'herb_db_user',
      password: event.body && event.body.password ? event.body.password : 'nk45Mte4Zhb5hw9K',
      database: event.body && event.body.database ? event.body.database : 'herb_db',
      port: event.body && event.body.port ? parseInt(event.body.port, 10) : 3306
    };

    const pool = mysql.createPool(dbConfig);

    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to database:', err);
        resolve({
          statusCode: 500,
          body: 'Internal Server Error'
        });
        return;
      }

      connection.query(sqlStatement, (queryError, results) => {
        connection.release();

        if (queryError) {
          console.error('Error executing query:', queryError);
          resolve({
            statusCode: 500,
            body: 'Internal Server Error'
          });
          return;
        }

        const jsonResult = JSON.stringify(results);
        resolve({
          statusCode: 200,
          body: jsonResult
        });
      });
    });
  });
};

module.exports = { handler };
