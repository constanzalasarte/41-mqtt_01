const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    productId: Number,
    name: String,
    stock: Number,
    price: Number
}, {
    query: {
        byId(id) {
            return this.where({ productId: id });
        }
    }
});

const transactionSchema = new Schema({
    productId: Number,
    date: Date
});

const Product = mongoose.model("Product", productSchema);
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = { Product, Transaction };

