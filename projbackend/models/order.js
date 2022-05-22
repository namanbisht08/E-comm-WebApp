const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "product",
  },
  name: String,
  count: Number,
  price: Number,
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = new mongoose.Schema(
  {
    products: [ProductCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status: {
      type: String,
      default: "Recived",
      enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Received"],
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, ProductCart }; //if we had defined more then one schema in a single file then to export that schemas we need to export them like this...

// Vid 4.3

// In mongoose, a schema represents the structure of a particular document, either completely or just a portion of the document.
// It's a way to express expected properties and values as well as constraints and indexes. A model defines a programming interface for interacting
// with the database (read, insert, update, etc). So a schema answers "what will the data in this collection look like?" and a model provides functionality
// like "Are there any records matching this query?" or "Add a new document to the collection".
