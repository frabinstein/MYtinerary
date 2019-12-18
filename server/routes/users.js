const express = require('express')
const router = express.Router()
const userModel = require('../model/userModel')
const axios = require('axios');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

require('es6-promise').polyfill();
require('isomorphic-fetch');

//Get list of all users
router.get('/all',
  (req, res) => {
    userModel.find( {} )
      .then(users => res.send(users))
      .catch(e => console.log(e));
  }
)

//Get user matching username provided
router.get('/:username',
  (req, res) => {
    userModel.findOne( { username: req.params.username } )
      .then(user => res.send(user))
      .catch(e => console.log(e));
  }
)

//Post new user
router.post('/', 
  //Data format validation
  [
    check('email').isEmail(),
    check('password').isLength({ min: 3 })
  ], 
  (req, res) => {
    //Looking for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      country: req.body.country,
      userPic: req.body.userPic
    })

    //Checking if user already exists
    axios.get("http://localhost:5000/users/" + newUser.username)
      .then(response => {
        //If user already exists
        if(response.headers["content-length"] != 0) {
          let msg = newUser.username + " already exists in the database";
          res.send({error: msg});
          throw new Error(msg);
        }
        else {
          bcrypt.hash(newUser.password, 8, (err, hash) => {
            newUser.password = hash;
            newUser.save()
            .then(user => res.send(user))
            .catch(e => {
              res.send(e);
              console.log(e);
            });
          });
        }
      })
      .catch(e => console.log(e));
  }
)

module.exports = router
