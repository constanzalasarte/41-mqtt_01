import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    id: Number,
    name: String,
    stock: Number,
    price: Number
})

const transactionSchema = new Schema({
    id:Number,
    productId: Number,
    date: Date
})
module.exports = mongoose.model("Product",productSchema)
module.exports = mongoose.model("Transaction",transactionSchema)