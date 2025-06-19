require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const AuctionItem = require('./models/AuctionItem')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err))

//Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
