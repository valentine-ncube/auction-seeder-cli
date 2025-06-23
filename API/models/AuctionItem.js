const mongoose = require('mongoose')

const auctionSchema = new mongoose.Schema({
  title: String,
  description: String,
  start_price: Number,
  reserve_price: Number,
})

module.exports = mongoose.model('AuctionItem', auctionSchema)
