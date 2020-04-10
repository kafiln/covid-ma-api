require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');
const app = express();
const routes = require('./routes');
const job = require('./cron');

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Connect to db
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log('Connected to MongoDb Successfully'))
  .catch(console.error);

// Routes

app.use('/api', routes);

// Cron

cron.schedule(process.env.CRON_FREQUENCY, async () => {
  await job();
});

module.exports = app;
