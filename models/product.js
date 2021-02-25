var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },charity:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Charity"
    },
    quantity: Number,
    isOnMarketPlace: Boolean,
    imageUrl: String,
    createdBy: String,
    updatedBy: String,
    deletedBy: String,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
});


module.exports = mongoose.model("Product", productSchema);