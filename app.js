require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const routes = require('./routes')

// Middlewares
app.use(cors())
app.use(express.urlencoded({ extended: false }))

// Connect to db
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log('Connected to MongoDb Successfully'))
  .catch(console.error)

// Routes

app.use('/api', routes)

module.exports = app
