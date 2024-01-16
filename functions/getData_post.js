const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

exports.handler = async (event, context) => {
  // 確認請求方法為 POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Not POST Method',
    };
  }

  // 從 POST 資料中獲取引數 
    const sqlStatement = JSON.parse(event.body).sql || 'No value provided for sql';

    const host_p = JSON.parse(event.body).host ||'mysql.sqlpub.com';
    const user_p = JSON.parse(event.body).user ||'herb_db_user';
    const password_p = JSON.parse(event.body).password || 'nk45Mte4Zhb5hw9K';
    const database_p = JSON.parse(event.body).database ||'herb_db';
    const port_p = JSON.parse(event.body).port || 3306;


      const dbConfig = {
          host: host_p ,
          user: user_p,
          password: password_p,
          database: database_p ,
          port: port_p 
     };

  
  // 開始連  DB  
    const pool = mysql.createPool(dbConfig);

const pool = mysql.createPool(dbConfig);
  pool.getConnection((err, connection) => {
      if (err) {


        
      }

      connection.query(sqlStatement, (queryError, results) => {
        connection.release();

        if (queryError) {
          

          
        }

        const jsonResult = JSON.stringify(results);
        resolve({
          

          
            jsonResult
        });
      });
    });
  };
