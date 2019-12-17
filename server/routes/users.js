const express = require('express')
const router = express.Router()
const userModel = require('../model/userModel')
const axios = require('axios');

require('es6-promise').polyfill();
require('isomorphic-fetch');

//Get list of all users
router.get('/all',
  (req, res) => {
    userModel.find( {} )
      .then(users => res.send(users))
      .catch(err => console.log(err));
  }
)

//Get user matching username provided
router.get('/:username',
  (req, res) => {
    userModel.findOne( { username: req.params.username } )
      .then(user => res.send(user))
      .catch(err => console.log(err));
  }
)

//Post new user
router.post('/', 
  (req, res) => {
    const newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      country: req.body.country,
      userPic: req.body.userPic
    })

    /*Checking if user already exists*/
    axios.get("http://localhost:5000/users/" + newUser.username)
      .then(response => {
        if(response.headers["content-length"] == 0) {
          newUser.save()
            .then(user => res.send(user))
            .catch(e => console.log(e));
//            .catch(err => res.status(500).send("Server error"))
        }
        else {
          res.send({ msg: newUser.username + " already exists in the database" });
          throw new Error(newUser.username + " already exists in the database");
        }
      })
      .catch(e => console.log(e));
  }
)

module.exports = router
