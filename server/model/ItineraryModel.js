const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  city_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "city",
    required: true
  },
  mainPic: {
    type: String,
  },
  rating: {
    type: Number,
  },
  duration: {
    type: Number,
  },
  cost: {
    type: Number,
  },
  tags: [
    {
      type: String,
    }
  ],
  activities: [
    {
      name: {
        type: String,
      },
      pic: {
        type: String,
      }
    }
  ]
})

//name of module is the singular version (itinerary) of the database name (itineraries)
module.exports = mongoose.model('itinerary', itinerarySchema)
