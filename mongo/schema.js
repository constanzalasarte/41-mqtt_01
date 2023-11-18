import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
    stock: Number,
    price: Number
});

const transactionSchema = new Schema({
    productId: Number,
    date: Date
});

const Product = mongoose.model("Product", productSchema);
const Transaction = mongoose.model("Transaction", transactionSchema);

export { Product, Transaction };
