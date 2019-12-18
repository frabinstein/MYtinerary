const express = require('express')
const router = express.Router()
const itineraryModel = require('../model/itineraryModel')
const axios = require('axios');

require('es6-promise').polyfill();
require('isomorphic-fetch');

//Get list of all itineraries
router.get('/all',
  (req, res) => {
    itineraryModel.find( {} )
      .then(itineraries => res.send(itineraries))
      .catch(e => console.log(e));
  }
)

//Get all itineraries for specific city
  //(excluding activities)
  router.get('/city/:city_id',
  (req, res) => {
    itineraryModel.find( { city_id: req.params.city_id }, '-activities'  )
      .then(itineraries => res.send(itineraries))
      .catch(e => console.log(e));
  }
)

//Get activities for specific itinerary
  router.get('/:itinerary_id/activities',
  (req, res) => {
    itineraryModel.find( { _id: req.params.itinerary_id }, 'activities -_id'  )
      .then(activities => res.send(activities))
      .catch(e => console.log(e));
  }
)

//Post new itinerary
router.post('/', 
  (req, res) => {
    const newitinerary = new itineraryModel({
      name: req.body.name,
      country: req.body.country
    })

    //Checking if itinerary already exists
    axios.get("http://localhost:5000/itineraries/" + newitinerary.name)
      .then(response => {
        if(response.headers["content-length"] == 0) {
          newitinerary.save()
            .then(itinerary => res.send(itinerary))
            .catch(e => {
              res.send(e);
              console.log(e);
            });
        }
        else {
          let msg = newitinerary.name + " already exists in the database";
          res.send({error: msg});
          throw new Error(msg);
        }
      })
      .catch(e => console.log(e));
  }
)

module.exports = router
