const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const dbConfig = {
  host: 'mysql.sqlpub.com',
  user: 'herb_db_user',
  password: 'nk45Mte4Zhb5hw9K',
  database: 'herb_db',
  port: 3306
};

const pool = mysql.createPool(dbConfig);


'==========================================================

exports.handler = async (event, context) => {
  // 確認請求方法為 POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  // 從 POST 資料中獲取引數 sql
  const sqlValue = JSON.parse(event.body).sql || ''SELECT * FROM test_table'';

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


module.exports = { handler };



  

'  // 回傳引數 abc 的值給呼叫者
'  return {
'    statusCode: 200,
'    body: `${sqlValue}`,
'  };
'};
