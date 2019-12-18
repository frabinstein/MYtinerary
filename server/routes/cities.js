const express = require('express')
const router = express.Router()
const cityModel = require('../model/cityModel')
const axios = require('axios');

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
    res.send({ msg: 'Cities test route' })
)

//Get list of all cities
router.get('/all',
  (req, res) => {
    cityModel.find( {} )
      .then(cities => res.send(cities))
      .catch(e => console.log(e));
  }
)

//Get city matching name provided
router.get('/:name',
  (req, res) => {
    cityModel.findOne( { name: capitalizeName(req.params.name) } )
      .then(city => res.send(city))
      .catch(e => console.log(e));
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
          .then(itineraries => res.send(itineraries)
          .catch(e => console.log(e)))
      })
      .catch(e => console.log(e));
  }
)
*/

//Post new city
router.post('/', 
  (req, res) => {
    const newCity = new cityModel({
      name: capitalizeName(req.body.name),
      country: req.body.country
    })

    //Checking if city already exists
    axios.get("http://localhost:5000/cities/" + newCity.name)
      .then(response => {
        if(response.headers["content-length"] == 0) {
          newCity.save()
            .then(city => res.send(city))
            .catch(e => {
              res.send(e);
              console.log(e);
            });
        }
        else {
          let msg = newCity.name + " already exists in the database";
          res.send({error: msg});
          throw new Error(msg);
        }
      })
      .catch(e => console.log(e));
      }
)

module.exports = router
