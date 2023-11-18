const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

// MongoDB settings
var config = require("./config");

var mongoDBUrl = 'mongodb://' + config.mongodb.hostname + ':' + config.mongodb.port;
const dbName = config.mongodb.dbName;
const collectionName = config.mongodb.collection;


// Set up a route to retrieve and display data
app.get('/data', (req, res) => {
  MongoClient.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      return res.status(500).send('Internal Server Error');
    }

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    collection.find({}).toArray((err, data) => {
      if (err) {
        console.error('Error fetching data from MongoDB:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(data);
      }

      client.close();
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
