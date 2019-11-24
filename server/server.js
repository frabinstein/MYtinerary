const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const bodyParser = require("body-parser");
const cors = require("cors");

const db = require('./keys').mongoURI;
const mongoose = require("mongoose");

mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('Connection to Mongo DB established'))
    .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use('/cities', require('./routes/cities'));
app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});

/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://RandWUser:zPD7zn5rfKFGXic9@mytinerary-pbh3q.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('Connection to Mongo DB established');
  // perform actions on the collection object
  client.close();
});
*/
