const mqtt = require("mqtt");
var config = require("./config");

var mqttUri  = 'mqtt://' + config.mqtt.hostname + ':' + config.mqtt.port;
const client = mqtt.connect(mqttUri);

// import { MongoClient } from "mongodb";
const mongoose = require('mongoose');

// Replace the uri string with your MongoDB deployment's connection string.
var mongoUri = "mongodb://admin:admin@" + config.mongodb.hostname + "/" + config.mongodb.database;

mongoose.connect(mongoUri);
const Product = mongoose.model('Product', { id: Number , name: String, price: Number, quantity: Number });
const Transaction = mongoose.model('Transaction', { transactionId: Number, productId: Number, date: Date });

const counter = 1;
client.on("connect", () => {
  client.subscribe(config.mqtt.namespace, (err) => {
    if (!err) {
      console.log("Client connected");
      const product1 = new Product({productId: 1, name: 'Producto 1', price: 2, quantity: 1})
      const product2 = new Product({productId: 2, name: 'Producto 2', price: 2, quantity: 0})
      const product3 = new Product({productId: 3, name: 'Producto 3', price: 2, quantity: 0})
      const product4 = new Product({productId: 4, name: 'Producto 4', price: 2, quantity: 0})
      const product5 = new Product({productId: 5, name: 'Producto 5', price: 2, quantity: 0})
    }
  });

});

client.on("message", async (topic, message) => {
  // message is Buffer
  console.log(message.toString());
  const doc = {
//      title: "Record of a Shriveled Datum",
      topic: topic,
      content: message.toString(),
   }	
   const productId = topic.at(topic.length-1)
  const transaction = new Transaction({transactionId: counter, productId: productId, date: Date.now()})
  counter += 1
  transaction.save().then(() => console.log('transacción guardada'));

  const product = await Product.find({productId: productId})
   if(product.quantity <= 0){
      console.log("quantity in " + product.name + " is equals 0")
   }
   else{
    const res = await Person.updateOne({ productId: productId }, { quantity: product.quantity-1 });
   }
 });
