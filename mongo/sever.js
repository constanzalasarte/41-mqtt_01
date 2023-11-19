const mqtt = require("mqtt");
var config = require("./config");
var { productSchema } = require("./schema");
var { ConnectOptions } = require('mongoose')

var mqttUri  = 'mqtt://' + config.mqtt.hostname + ':' + config.mqtt.port;
const client = mqtt.connect(mqttUri);

// import { MongoClient } from "mongodb";
const mongoose = require('mongoose');
const Product = mongoose.model("Product", productSchema);

// Replace the uri string with your MongoDB deployment's connection string.
var mongoUri = "mongodb://admin:admin@" + config.mongodb.hostname + "/" + config.mongodb.database;

mongoose.connect(mongoUri)

client.on("connect", () => {
  client.subscribe(config.mqtt.namespace, async (err) => {
    if (!err) {
     console.log("Client connected");
     await new Product({productId: 1, name: 'Producto 1', price: 2, stock: 2}).save()

	   const product2 = new Product({productId: 2, name: 'Producto 2', price: 2, stock: 1})
     await product2.save().then(() => console.log("product 2 created"));

	   const product3 = new Product({productId: 3, name: 'Producto 3', price: 2, stock: 0})
     await product3.save().then(() => console.log("product 3 created"));

	   const product4 = new Product({productId: 4, name: 'Producto 4', price: 2, stock: 0})
     await product4.save().then(() => console.log("product 4 created"));

	   const product5 = new Product({productId: 5, name: 'Producto 5', price: 2, stock: 0})
     await product5.save().then(() => console.log("product 5 created"));

     const product6 = new Product({productId: 6, name: 'Producto 6', price: 2, stock: 0})
     await product6.save().then(() => console.log("product 6 created"));
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
  console.log(parseInt(productId) + 1)

  const array = await Product.find().byId(parseInt(productId))
  const product = array[array.length-1]

  console.log(product)

  if (!product || product.stock <= 0 || product.stock === undefined) {
    if (!product) {
      console.log("Product not found");
    } else {
      console.log("Stock in " + product.name + " is 0 or undefined");
    }
  } else {
    const updatedProduct = await Product.findOneAndUpdate(
      { productId: product.productId },
      { $inc: { stock: product.stock-1 } },
      { new: true }
    );

    const stock = updatedProduct.stock !== undefined ? updatedProduct.stock.toString() : 'Stock undefined';
    console.log("Now there are " + stock + " products of the product " + updatedProduct.name);

  }
  });
