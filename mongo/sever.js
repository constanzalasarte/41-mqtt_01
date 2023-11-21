const mqtt = require("mqtt");
var config = require("./config");
var { productSchema, transactionSchema } = require("./schema");

var mqttUri  = 'mqtt://' + config.mqtt.hostname + ':' + config.mqtt.port;
const client = mqtt.connect(mqttUri);

// import { MongoClient } from "mongodb";
const mongoose = require('mongoose');

// Replace the uri string with your MongoDB deployment's connection string.
var mongoUri = "mongodb://admin:admin@" + config.mongodb.hostname + "/" + config.mongodb.database;

mongoose.connect(mongoUri)

const Product = mongoose.model("Product", productSchema);
const Transaction = mongoose.model("Transaction", transactionSchema);

client.on("connect", () => {
  client.subscribe(config.mqtt.namespace, async (err) => {
    if (!err) {
     console.log("Client connected");
     await Promise.all([
        Product.deleteMany({}),
        Transaction.deleteMany({}),
     ]);

     await new Product({productId: 1, name: 'Curitas', price: 5, stock: 6}).save();
     await new Product({productId: 2, name: 'Ibuprofeno', price: 5, stock: 6}).save();
     await new Product({productId: 3, name: 'Alcohol en gel', price: 5, stock: 6}).save();
     await new Product({productId: 4, name: 'Gasas', price: 5, stock: 6}).save();
     await new Product({productId: 5, name: 'Cinta porosa', price: 5, stock: 6}).save();
     await new Product({productId: 6, name: 'Algodón', price: 5, stock: 6}).save();

    }
    else{
      console.log("Client not connected");
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

  const array = await Product.find().byId(parseInt(productId))
  const product = array[array.length-1]

  if (!product || product.stock <= 0 || product.stock === undefined) {
    if (!product) {
      console.log("Product not found");
    } else {
      console.log("Stock in " + product.name + " is 0 or undefined");
    }
  } else {
    const updatedProduct = await Product.findOneAndUpdate(
      { productId: product.productId },
      { $inc: { stock: -1 } }, 
      { new: true }
    );

    const stock = updatedProduct.stock !== undefined ? updatedProduct.stock.toString() : 'Stock undefined';
    console.log("Now there are " + stock + " products of " + updatedProduct.name);

    const transaction = new Transaction({productId: product.productId, productName: product.name, date: Date.now()})
    await transaction.save()

    try {
      const allTransactions = await Transaction.find();
      
      allTransactions.forEach((transaction) => {
        console.log(`Transaction ID: ${transaction._id}, Product ID: ${transaction.productId}, Date: ${transaction.date}`);
      });
      
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }

  }
  });
