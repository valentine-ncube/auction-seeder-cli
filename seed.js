require('dotenv').config()
const mongoose = require('mongoose')
const auctionData = require('./auctionData')

const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')

//Define auction schema
const auctionSchema = new mongoose.Schema({
  title: String,
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

//Seed or delete data
async function runSeeder(deleteFlag, title) {
  await connectDB()

  if (deleteFlag) {
    if (title) {
      //DEBUG: Log current title in DB
      const items = await AuctionItem.find({})
      console.log(
        'Current items in DB:',
        items.map((i) => i.title)
      )

      //Deletes one item (case-insensitive)
      const result = await AuctionItem.deleteOne({
        title: new RegExp(`^${title}$`, 'i'),
      })
      console.log(
        result.deletedCount
          ? `Deleted item with title: ${title}`
          : `No item found with title: ${title}`
      )
    } else {
      //Deletes all items
      await AuctionItem.deleteMany({})
      console.log('All auction items deleted')
    }
  } else {
    if (title) {
      //Seed one item
      const item = auctionData.find((item) => item.title === title)
      if (item) {
        await AuctionItem.create(item)
        console.log(`Seeded item: ${title}`)
      } else {
        console.log(`No item found with title: ${title}`)
      }
    } else {
      //Seed all
      await AuctionItem.insertMany(auctionData)
      console.log('All auction items seeded')
    }
  }
  mongoose.connection.close()
}

//CLI handler
const argv = yargs(hideBin(process.argv))
  .option('delete', {
    alias: 'd',
    description: 'Delete data instead of seeding',
    type: 'boolean',
  })
  .option('title', {
    alias: 't',
    description: 'Specify title of the auction item',
    type: 'string',
  })
  .help() // Show help message
  .alias('help', 'h').argv // Parse command line arguments

runSeeder(argv.delete, argv.title)
