const express = require('express');
const cors = require('cors');
var config = require("./config");
var { productSchema, transactionSchema } = require("./schema");
const mongoose = require('mongoose');
const app = express();
const moment = require('moment');

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
                const productDetails = await Product.find().byId(product._id);
                return { ...productDetails.toObject(), count: product.count };
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
            const product = await Product.find().byId(transaction.productId);
            if (product) {
                totalRevenue += product.price * transaction.quantitySold;
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


const PORT = 8080;
app.listen(PORT, () => console.log(`Backend running in port ${PORT}`));
