const  mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;          //destructured the mongoose.Schema object and pulled out ObjectId out of it.

const productSchema = new mongoose.Schema({
    name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
    },
    description:{
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
    },
    category:{
        type: ObjectId,    
        ref: "Category",     //refering to the Category.js 
        required: true
    },
    stock:{
        type: Number
    },
    sold:{
        type: Number,
        default: 0
    },
    photo:{
        data: Buffer,
        contentType: String
    }
 },
   { timeStamp: true }
);

module.exports = mongoose.model("Product", productSchema);

// vid 4.2