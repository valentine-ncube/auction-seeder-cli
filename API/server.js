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

//Routes
app.get('/api/search', async (req, res) => {
  const query = req.query.query
  if (!query)
    return res.status(400).json({ error: 'Query parameter is required' })

  try {
    const results = await AuctionItem.find({
      $or: [
        { title: new RegExp(query, 'i') },
        { description: new RegExp(query, 'i') },
      ],
    })
    res.json(results)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

//Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
