const mqtt = require("mqtt");
var config = require("./config");

var mqttUri  = 'mqtt://' + config.mqtt.hostname + ':' + config.mqtt.port;
const client = mqtt.connect(mqttUri);

// import { MongoClient } from "mongodb";
const { MongoClient } = require('mongodb')
// Replace the uri string with your MongoDB deployment's connection string.
var mongoUri = 'mongodb://' + config.mongodb.hostname + ':' + config.mongodb.port;
var date_time = new Date();
// Create a new client and connect to MongoDB
const dbclient = new MongoClient(mongoUri);

const database = dbclient.db(config.mongodb.database);
const haiku = database.collection(config.mongodb.collection);

client.on("connect", () => {
  client.subscribe("+", (err) => {
    if (!err) {
     console.log("Client connected");
    }
  });
});

client.on("message", (topic, message) => {
  // message is Buffer
  console.log(message.toString());
const doc = {
//      title: "Record of a Shriveled Datum",
      topic: topic,
      content: message.toString(),
   }	
  const result = haiku.insertOne(doc);

 });
