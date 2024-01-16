const express = require('express');
const bodyParser = require('body-parser');

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

  // 從 POST 資料中獲取引數 abc
  const abcValue = JSON.parse(event.body).abc || 'No value provided for abc';

  // 回傳引數 abc 的值給呼叫者
  return {
    statusCode: 200,
    body: `Value of abc: ${abcValue}`,
  };
};
