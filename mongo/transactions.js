const mqtt = require("mqtt");
var config = require("./config");
var { transactionSchema } = require("./schema");

var mqttUri  = 'mqtt://' + config.mqtt.hostname + ':' + config.mqtt.port;
const client = mqtt.connect(mqttUri);

// import { MongoClient } from "mongodb";
const mongoose = require('mongoose');

// Replace the uri string with your MongoDB deployment's connection string.
var mongoUri = "mongodb://user:user@" + config.mongodb.hostname + "/" + config.mongodb.transactionsDB;

mongoose.connect(mongoUri);

const Transaction = mongoose.model("Transaction", transactionSchema);

client.on("connect", () => {
  client.subscribe(config.mqtt.namespace, (err) => {
    if (!err) {
     console.log("Client connected");
    }
  });
});

client.on("message", async (topic, message) => {
  console.log(message.toString());
  const doc = {
      topic: topic,
      content: message.toString(),
  }	
  const productId = topic.at(topic.length-1)
  const transaction = new Transaction({productId: productId, date: Date.now()})
  await transaction.save()

  try {
    const allTransactions = await Transaction.find();
    
    // Or loop through transactions and log specific details
    allTransactions.forEach((transaction) => {
      console.log(`Transaction ID: ${transaction._id}, Product ID: ${transaction.productId}, Date: ${transaction.date}`);
      // You can access other properties of the transaction here
    });
    
    // Handle the retrieved transactions as needed
  } catch (error) {
    console.error("Error fetching transactions:", error);
    // Handle error if fetching transactions fails
  }
});