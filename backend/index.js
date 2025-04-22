const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morganMiddleware = require('./middlewares/logger');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const userRoutes = require('./routes/userRoutes');

const port = 3002;

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.options('*', (req, res) => {
  res.sendStatus(200); // i was getting a cors error
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(morganMiddleware);
app.get('/health', (req, res) => res.send({ message: 'ok' }));

app.use('/users', userRoutes);

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Datatys App running on port ${port}.`);
});

module.exports = server;
