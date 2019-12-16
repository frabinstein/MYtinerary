const express = require('express')
const router = express.Router()
const cityModel = require('../model/cityModel')
const itineraryModel = require('../model/itineraryModel')

require('es6-promise').polyfill();
require('isomorphic-fetch');

//Capitalizes first letter of each word in city name
const capitalizeName = (name) => {
  return name
    .toLowerCase()
    .split(" ")
    .map(word => 
      word.charAt(0).toUpperCase() 
      + word.slice(1))
    .join(" ");
}

//Get test cities
router.get('/test', 
  (req, res) => 
    res.send({ msg: 'Cities test route.' })
)

//Get list of all cities
router.get('/all',
  (req, res) => {
    cityModel.find( {} )
      .then(cities => res.send(cities))
      .catch(err => console.log(err));
  }
)

//Get city matching name provided
router.get('/:name',
  (req, res) => {
    cityModel.findOne( { name: capitalizeName(req.params.name) } )
      .then(city => res.send(city))
      .catch(err => console.log(err));
  }
)

//Get list of all itineraries
router.get('/itineraries/all',
  (req, res) => {
    itineraryModel.find( {} )
      .then(itineraries => res.send(itineraries))
      .catch(err => console.log(err));
  }
)

/*
//Get all itineraries for specific city (by city name)
  //(excluding activities)
router.get('/:name/itineraries',
  (req, res) => {
    cityModel.findOne( { name: capitalizeName(req.params.name) } )
      .then(city => {
        itineraryModel.find( { city_id: city._id }, '-activities' )
          .then(itineraries => res.send(itineraries))
      })
    .catch(err => console.log(err));
  }
)
*/

//Get all itineraries for specific city
  //(excluding activities)
  router.get('/itineraries/:city_id',
  (req, res) => {
    itineraryModel.find( { city_id: req.params.city_id }, '-activities'  )
      .then(itineraries => res.send(itineraries))
      .catch(err => console.log(err));
  }
)

//Get activities for specific itinerary
  router.get('/itinerary/:itinerary_id/activities',
  (req, res) => {
    itineraryModel.find( { _id: req.params.itinerary_id }, 'activities -_id'  )
      .then(activities => res.send(activities))
      .catch(err => console.log(err));
  }
)

//Post new city
router.post('/', 
  (req, res) => {
    const newCity = new cityModel({
      name: capitalizeName(req.body.name),
      country: req.body.country
    })

    /*Checking if city already exists*/
    fetch("http://localhost:5000/cities/" + newCity.name)
      .then(response => response.json())
      .then(data => {
        if(data.length == 0) {
          newCity.save()
            .then(city => res.send(city))
            .catch(err => res.status(500).send("Server error"))
        }
        else {
          res.send({ msg: newCity.name + " already exists in the database" });
//          throw new Error(newCity.name + " already exists in the database");
        }
      })
      .catch(e => console.log(e));
  }
)

module.exports = router
