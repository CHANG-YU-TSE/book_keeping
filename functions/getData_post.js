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

           if (event.httpMethod !== 'POST') {
            return {
                 //  statusCode: 405,
                  body: 'Not POST Method',
            };
          }



      return new Promise((resolve, reject) => {
   

     // 從 POST 資料中獲取引數 
     const sqlStatement = JSON.parse(event.body).sql || 'select * from test_table';



    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to database:', err);
        resolve({
         // statusCode: 500,
          body: 'Internal Server Error'
        });
        return;
      }

      connection.query(sqlStatement, (queryError, results) => {
        connection.release();

        if (queryError) {
          console.error('Error executing query:', queryError);
          resolve({
           // statusCode: 500,
            body: 'Internal Server Error'
          });
          return;
        }

        const jsonResult = JSON.stringify(results);
        resolve({
         // statusCode: 200,
          body: jsonResult
        });
      });
    });
  });
};

module.exports = { handler };
