const express = require('express');
const bodyParser = require('body-parser');

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
    const sql = JSON.parse(event.body).sql || 'No value provided for sql';

    const host = JSON.parse(event.body).host ||'mysql.sqlpub.com',
    const user = JSON.parse(event.body).user ||'herb_db_user',
    const password = JSON.parse(event.body).password || 'nk45Mte4Zhb5hw9K',
    const database = JSON.parse(event.body).database ||'herb_db',
    const port = JSON.parse(event.body).port || 3306
    

  
  

  // 回傳引數 abc 的值給呼叫者
  return {
    statusCode: 200,
    body: `${host}`,
  };
};
