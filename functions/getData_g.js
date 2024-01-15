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

const handler = async (event, context) => {
  return new Promise((resolve, reject) => {
    // 從 query 參數中獲取 SQL statement，若未提供預設為 select * from test_table
    const sqlStatement = event.queryStringParameters && event.queryStringParameters.sql
      ? event.queryStringParameters.sql
      : 'SELECT * FROM test_table';

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
