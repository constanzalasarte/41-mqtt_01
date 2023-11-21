const express = require('express');
const cors = require('cors');
var config = require("./config");
var { productSchema, transactionSchema } = require("./schema");
const mongoose = require('mongoose');
const app = express();
const moment = require('moment');

app.use(express.json());

var mongoUri = "mongodb://admin:admin@" + config.mongodb.hostname + "/" + config.mongodb.database;

mongoose.connect(mongoUri)

const Product = mongoose.model("Product", productSchema);
const Transaction = mongoose.model("Transaction", transactionSchema);

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200
}));

// Endpoint to get the three most sold products
app.get('/api/most-sold-products', async (req, res) => {
    try {
        const mostSoldProducts = await Transaction.aggregate([
            {
                $group: {
                    _id: '$productId',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 3 }
        ]);

        const mostSoldProductsDetails = await Promise.all(
            mostSoldProducts.map(async (product) => {
                const array = await Product.find().byId(product._id);
                const productDetails = array[array.length-1];
                return { name: productDetails.name, count: product.count };
            })
        );

        res.json(mostSoldProductsDetails);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Endpoint to get the latest transactions
app.get('/api/latest-transactions', async (req, res) => {
    try {
        const transactions = await Transaction.find({})
            .sort({ date: -1 })
            .limit(10);

        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/day-revenue', async (req, res) => {
    try {
        // Get today's date
        const today = moment().startOf('day').toDate();

        // Get transactions for today's date
        const transactionsForToday = await Transaction.find({
            date: { $gte: today }
        });

        // Calculate total revenue from the transactions
        let totalRevenue = 0;
        for (const transaction of transactionsForToday) {
            // Assuming each transaction has productId and quantitySold fields
            const array = await Product.find().byId(transaction.productId)
            const product = array[array.length-1]
            if (product) {
                totalRevenue += product.price ;
            }
        }
        if (totalRevenue === null) {
            totalRevenue = 0
        }
        res.json({ totalRevenue });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/products', async (req, res) => {
    try {
      const products = await Product.find({});
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.post('/api/restock',async(req,res)=>{
    const { productId, quantity } = req.body;

    try {
        const array = await Product.find().byId(productId)
        const product = array[array.length-1]
        if (!product) {
          return res.status(404).json({ error: 'Producto no encontrado' });
        }
        const stockLimit = 6;
        const newQuantity = product.stock + quantity;
        if (newQuantity > stockLimit) {
        return res.status(400).json({ error: 'La cantidad a reponer supera el límite permitido' });
        }
        product.stock = newQuantity;
        await product.save();
        res.status(200).json({ mensaje: 'Stock actualizado exitosamente' });
    } 
    catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

const PORT = 8080;
app.listen(PORT, () => console.log(`Backend running in port ${PORT}`));
