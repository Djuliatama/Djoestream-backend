const express = require('express');
const path = require('path');
const { router } = require('./route/api');
// const bodyParser = require('body-parser')

const port = process.env.APP_PORT || 3000;
const appName = process.env.APP_NAME || 'Djoestream';

require('dotenv').config();

const app = express();
// app.use(
//   bodyParser.urlencoded({
//       extended: true,
//   })
// );

// app.use(bodyParser.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`${appName} running on port ${port}`)
})