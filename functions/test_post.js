const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/get_post_parameters.js', (req, res) => {
  // 從 POST 資料中獲取引數 abc
  const abcValue = req.body && req.body.abc ? req.body.abc : 'No value provided for abc';

  // 回傳引數 abc 的值給呼叫者
  res.send(`Value of abc: ${abcValue}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
