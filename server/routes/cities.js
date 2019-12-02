const express = require('express')
const router = express.Router()
const cityModel = require('../model/cityModel')

require('es6-promise').polyfill();
require('isomorphic-fetch');

/*Capitalizes first letter of each word in city name*/
const capitalizeName = (name) => {
  return name
    .toLowerCase()
    .split(" ")
    .map(word => 
      word.charAt(0).toUpperCase() 
      + word.slice(1))
    .join(" ");
}

router.get('/test', 
  (req, res) => 
    res.send({ msg: 'Cities test route.' })
)

/*get all cities*/
router.get('/all',
  (req, res) => {
    cityModel.find( {} )
      .then(files => res.send(files))
      .catch(err => console.log(err));
  }
)

/*get cities matching name provided*/
router.get('/city/:name',
  (req, res) => {
    cityModel.find( { name: capitalizeName(req.params.name) } )
      .then(files => res.send(files))
      .catch(err => console.log(err));
  }
)

router.post('/', 
  (req, res) => {
    const newCity = new cityModel({
      name: capitalizeName(req.body.name),
      country: req.body.country
    })

    /*Checking if city already exists*/
    fetch("http://localhost:5000/cities/city/" + newCity.name)
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
