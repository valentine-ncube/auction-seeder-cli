require('dotenv').config()
const mongoose = require('mongoose')
const yargs = require('yargs')
const auctionData = require('./auction-data.json')

//Define auction schema
const auctionSchema = new mongoose.Schema({
  tittle: String,
  description: String,
  start_price: Number,
  reserve_price: Number,
})

const AuctionItem = mongoose.model('AuctionItem', auctionSchema)

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ Connected to MongoDB')
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message)
    process.exit(1) // Exit the process with failure
  }
}
