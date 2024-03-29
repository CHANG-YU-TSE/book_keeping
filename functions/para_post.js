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

  // 從 POST 資料中獲取引數 abc
  const sqlValue = JSON.parse(event.body).sql || 'No value provided for sql';

  // 回傳引數 abc 的值給呼叫者
  return {
    statusCode: 200,
    body: `${sqlValue}`,
  };
};
